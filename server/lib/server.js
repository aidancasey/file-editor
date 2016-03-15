var express = require('express')
var bodyParser = require('body-parser')
var fileUploadController = require('./controllers/fileUploadController')
var healthController = require('./controllers/healthController')
var imageProcessingController = require('./controllers/imageProcessingController')

var path = require('path')

module.exports = function() {

    var app = express()
    var port = process.env.PORT || 8080
    app.use(bodyParser.json())


// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');


    app.use(function(req, res, next){
        console.log(req.method, req.originalUrl);
        next();
    });


// index.js page
    app.get('/', function(req, res){
        res.render('index');
    });

//jobs
    app.get('/jobs', function(req, res,next) {


        return imageProcessingController().getJobs()
            .then(function (data) {
            console.log('all done matey');
            res.status(200).json(data);
        }).done();
    });

    //heathcheck
    app.get('/health', function(req, res,next){
        healthController.get()
            .then(function(ok){
                res.status(200).json(ok);
            })
            .catch(ex)
        {
            console.log(ex);
        }
    });

    //upload the file
    app.post('/', fileUploadController.addFile(), function(req,res) {

        var imageMetadata = {"name": req.file.filename,
            "path": req.file.path,
            "mimetype": req.file.mimetype};

        var job = {"image_name": req.file.filename,
                    "job" : "convert_black_white"};

        return imageProcessingController().addImage(imageMetadata)
            .then(function (data) {
                  imageProcessingController().addJob(job)
            })
            .then(function(moreData){
                console.log('now the job is created');
                res.status(200).json({'all' : 'done'});
            })
            .fail(function (error) {
                console.log(error);
                res.send(error);
            })
            .done();
            ;
    });

    app.use(function(err, req, res, next){
        console.log(err.stack);
        res.status(err.statusCode || 500).send(err);
    })

    app.listen(port, function(){
        console.log('up and running on port ', port)
    })
}



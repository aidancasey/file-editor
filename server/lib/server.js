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


        return imageProcessingController().getJobs(function (err, data) {
            console.log('all done matey');
           // console.log(data);
            res.send(data).end();
        })
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
    app.post('/', fileUploadController.addFile(), function(req,res){

        var imageMetadata = {"name" :req.file.filename,
                             "path" :req.file.path,
                             "mimetype" : req.file.mimetype

        }

        //then store the image path

        return imageProcessingController().addImage(imageMetadata, function(err,data)
        {
            //then store the job to process the image

            console.log('all done matey');

            var job = {"foo":"hoo"};
            imageProcessingController().addJob(job,function(err,data){

                console.log('think ive saved job as well');
                res.status(204).end();
            })

         //   res.status(204).end();
        })


    });
    app.use(function(err, req, res, next){
        console.log(err.stack);
        res.status(err.statusCode || 500).send(err);
    })

    app.listen(port, function(){
        console.log('up and running on port ', port)
    })
}






/*app.get('/pilotusers/:serial_number', function(req, res, next){
 var sn = req.params.serial_number
 controller.get(sn)
 .then(function(ok){
 res.status(200).json(ok)
 })
 .catch(next)
 })

 app.post('/pilotusers/:serial_number', function(req, res, next){
 var sn = req.params.serial_number
 controller.add(sn)
 .then(function(ok){
 res.status(201).send(ok)
 })
 .catch(next)
 })

 app.get('/pilotusers', function(req, res, next){
 controller.getList()
 .then(function(ok){
 res.status(200).json(ok)
 })
 .catch(next)
 })

 app.post('/pilotusers', function(req, res, next){
 if(!req.is('application/json')) {
 return res.status(400).send('Invalid content type, expected application/json');
 }
 controller.create(req)
 .then(function(ok){
 res.status(201).send(ok)
 })
 .catch(next)
 })

 app.get('/loadData', function(req, res, next){
 controller.loadData()
 .then(function(ok){
 res.send(ok)
 })
 .catch(next)
 })*/


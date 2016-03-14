'use strict';


var repository = require('../image-store/image-repository')("../image-data-store.json");

module.exports = function() {
    var addImage = function(imageData, next) {

            return repository.addImage(imageData)
                .then(function (results){
                next(null,'ok');
        })};

    var addJob = function(jobData, next) {

        return repository.addJob(jobData)
            .then(function (results){
                next(null,'ok');
            })};


    var getJobs = function (next) {
console.log('get jobs');
        return repository.getJobs()
            .then(function (results){
                console.log(results);
                next(null,results);
            })};

    return {
        addImage: addImage,
        getJobs : getJobs
    };
};
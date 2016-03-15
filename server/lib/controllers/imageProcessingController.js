/*jslint node: true */
"use strict";


var repository = require('../image-store/image-repository')("../image-data-store.json");
var Q = require('q');


module.exports = function() {

    var addImage = function(image) {

        var deferred = Q.defer();
        return repository.addImage(image, function(err, data) {
            if (err) {
                console.log('Error occurred in addImage: ' + err);
                deferred.reject(err);
            }else {
                console.log('add image succeeded');
                deferred.resolve(data);
            }
    });
        return deferred.promise;
    }

    var addJob = function(job) {

        var deferred = Q.defer();
        return repository.addJobToQueue(job, function(err, data) {
            if (err) {
                console.log('Error occurred in addImage: ' + err);
                deferred.reject(err);
            }else {
                console.log('add image succeeded');
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }


    var getJobs = function() {
        var deferred = Q.defer();
        return repository.getJobs(function(err, data) {
            if (err) {
                deferred.reject(err);
            }else {
                deferred.resolve(data);
            }
        });
        return deferred.promise;
    }

    return {
        addImage: addImage,
        addJob :  addJob,
        getJobs : getJobs
    };
};
/*jslint node: true */
"use strict";

var Q = require('q');
var flatfile = require('flatfile');


module.exports = function(filePath) {

    var db;

    var load = function() {
        return Q.Promise(function(resolve, reject) {
            flatfile.db(filePath, function(err, localDB) {
                if (err) {
                    console.log('Error occurred instantiating flatfile database: ' + err);
                    reject(err);
                }else {
                    db = localDB;
                    resolve('ok')
                }
            }
        );
    })};


    var getAllImages = function() {
        return Q.Promise(function(resolve, reject) {
            flatfile.db(filePath, function(err, localDB) {
                    if (err) {
                        console.log('Error occurred instantiating flatfile database: ' + err);
                        reject(err);
                    }else {
                        resolve(localDB.images);
                    }
                }
            );
        })};

    var getJobs = function() {
        return Q.Promise(function(resolve, reject) {
            flatfile.db(filePath, function(err, localDB) {
                    if (err) {
                        console.log('Error occurred instantiating flatfile database: ' + err);
                        reject(err);
                    }else {
                        resolve(localDB.jobs);
                    }
                }
            );
        })};


    var addImage = function(data) {
        return Q.Promise(function(resolve, reject) {
            flatfile.db(filePath, function(err, localDB) {
                    if (err) {
                        console.log('Error occurred instantiating flatfile database: ' + err);
                        reject(err);
                    }else {
                        localDB.images.push(data);
                        localDB.save(function(err){
                            if (err){
                                reject(err)
                            }else{
                                console.log('its ok baby');
                                resolve('ok')
                            }
                        })
                    }
                }
            );
        })};

    var addJobToQueue = function(data) {
        return Q.Promise(function(resolve, reject) {
            flatfile.db(filePath, function(err, localDB) {
                    if (err) {
                        console.log('Error occurred instantiating flatfile database: ' + err);
                        reject(err);
                    }else {
                        localDB.jobs.push(data);
                        localDB.save(function(err){
                            if (err){
                                reject(err)
                            }else{
                                resolve('ok')
                            }
                        })
                    }
                }
            );
        })};

    return {
        load: load,
        addImage: addImage,
        getJobs: getJobs,
        getAllImages: getAllImages,
        addJobToQueue : addJobToQueue

    };
};
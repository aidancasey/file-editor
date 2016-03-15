/*jslint node: true */
"use strict";

var assert = require('assert')

describe('image-repository', function(){
  var repository = require('./image-store/image-repository')
  
  describe('load', function(){
    it('should not give an error on database load ', function(done){

        repository('../server/tests/image-store/test.json').load().then(function(result){
            assert.equal(result,'ok');
            done();
        })
      })
    })

    describe('getAllImages', function(){
        it('should return 2 images in the list', function(done){
            var repo = repository('../server/tests/image-store/test.json');
               return repo.getAllImages().then(function (results){
                   assert.equal(results.length,2);
                   done();
               })
            })
    })


    describe('getJobs', function(){
        it('should return an empty list', function(done){
            var repo = repository('../server/tests/image-store/test.json');
            return repo.getJobs().then(function (results){
                assert.equal(results.length,0);
                done();
            })
        })
    })

    describe('addImage', function(){
        it('should add new image to the image collection', function(done){
            var repo = repository('../server/tests/image-store/test-add.json');
            var newImage = {"id":"333.bmp"};

            return repo.addImage(newImage).then(function (results){
                assert.equal(results,'ok');
                done();
            })
        })
    })
})
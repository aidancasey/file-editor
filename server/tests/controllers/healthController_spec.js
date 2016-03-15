/*jslint node: true */
"use strict";

var assert = require('assert')

describe('healthController', function(){
  var controller = require('../../lib/controllers/healthController')
  
  describe('get', function(){
    it('should return ok when called', function(done){
      controller.get().then(function(result){
          assert.equal('ok', result.status);
          done()
        })
      })
    })

})
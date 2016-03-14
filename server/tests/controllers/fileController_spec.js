/*
var assert = require('assert')

describe('fileController', function(){
  var controller = require('../../lib/controllers/fileController')
  
  describe('get', function(){
    it('should return ok with isPilot true', function(done){
      controller.add('12').then(function(addRes){
        controller.get('12').then(function(res){
          assert.equal('12', res.sn)
          assert.equal(true, res.isPilot)
          done()
        })
      })
    })
    
    it('should return ok with isPilot false', function(done){
      controller.get('11').then(function(res){
        assert.equal('11', res.sn)
        assert.equal(false, res.isPilot)
        done()
      })
    })
    
  })
  
  describe('add', function(){
    it('should add sn into the list', function(done){
      controller.add('123').then(function(res){
        assert.equal('added \n123', res)
        controller.get('123').then(function(getRes){
          assert.equal(true, getRes.isPilot)
          done()
        })
      })
    })
    
    it('should reject when add empty sn', function(done){
      controller.add('').catch(function(err){
        assert.equal('invalid sn!', err)
        done()
      })
    })
  })
  
  describe('create', function(){
    it('should amend the list', function(done){
      req = {body: {pilotUsers:['31','32']}}
      controller.create(req).then(function(res){
        assert.equal('data file loaded.', res)
        done()
      })
    })
    
    it('should reject when post invalid payload', function(done){
      req = {body: {}}
      controller.create(req).catch(function(err){
        assert.equal('invalid payload', err)
        done()
      })
    })
  })
  
  describe('getList', function(){
    it('should return the pilot user list', function(done){
      controller.getList().then(function(res){
        assert.equal(true, res.pilotUsers.length > 0)
        done()
      })
    })
  })
  
  describe('loadData', function(){
    it('should load txt file into the list', function(done){
      controller.loadData('sn.txt').then(function(res){
        assert.equal('data file loaded.', res)
        done()
      })
    })
    
    it('should catch the error when read file failed', function(done){
      controller.loadData('dummy.txt').catch(function(error){
        assert.ok(error.toString().includes('error') > -1)
        done()
      })
    })
  })
  
})*/

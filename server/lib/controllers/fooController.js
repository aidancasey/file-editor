var fs  = require("fs");
var multer = require('multer')

  
function fileController(){
  var list = []
  loadDataSync()
  



    function uploadFile()
    {

    }







    function loadDataSync(){
    list = fs.readFileSync("sn.txt").toString().split('\n')
    console.log('data file loaded.')
    list = list.filter(Boolean)
  }
  
  function loadData(filename){
    filename = filename || 'sn.txt'
    return new Promise(function(res, rej){
      fs.readFile(filename, function(err, data) {
        if(err){
          console.error('read file error: ', err)
          return rej(err)
        }
        list = data.toString().split("\n");
        list = list.filter(Boolean)
        res('data file loaded.')
      })
    })
  }
  
  function appendData(data, filename){
    filename = filename || 'sn.txt'
    return new Promise(function(res, rej){
      if(data.constructor === Array){
        data = data.join('\n')
      }
      data = '\n' + data
      
      fs.appendFile(filename, data, encoding='utf8', function(err){
        if(err){
          console.error('write file error: ', err)
          return rej(err)
        }
        res('added ' + data)
      })
    })
  }
  
  function get(sn) {
    return new Promise(function(res, rej) {
      var isPilot = list.indexOf(sn) > -1
      res({
        sn: sn,
        isPilot: isPilot
      })
    })
  }
  
  function add(sn){
    return new Promise(function(res, rej){
      if(!sn){
        console.error('sn is blank')
        return rej('invalid sn!')
      }
      list.push(sn)
      appendData(sn).then(res).catch(rej)
    })
  }
  
  function create(req){
    return new Promise(function(res, rej){
      data = req.body.pilotUsers
      if(data){
        appendData(data).then(loadData().then(res).catch(rej)).catch(rej)
      }
      else{
        console.log('invalid payload')
        rej('invalid payload')
      }
    })
  }
  
  function getList(){
    return new Promise(function(res, rej){
      res({pilotUsers:list})
    })
  }

  return {
    get: get,
    add: add,
    create: create,
    getList: getList,
    loadData: loadData,
    uploadFile : uploadFile
  }
}

module.exports = PilotUserController()


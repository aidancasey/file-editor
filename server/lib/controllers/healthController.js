function healthController(){

    function get() {
        return new Promise(function(res, rej) {
            res({status:'ok'})
        })
    }
    return {
        get: get
    }
}
module.exports = healthController()
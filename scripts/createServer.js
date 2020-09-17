var http = require('http')
var server = http.createServer(function (req, res) {
    res.write('hello world') //发给浏览器的http内容
    res.end() //结束了
})
server.listen(9000)
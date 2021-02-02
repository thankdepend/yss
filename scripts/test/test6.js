var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster) {
    console.log(os.cpus());
    //   for (var i = 0, n = os.cpus().length; i < n; i += 1){
    //     cluster.fork();
    // }
}
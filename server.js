// var connect = require('connect'),
//     http = require('http'),
//     fs = require('fs'),
//     app;

// // 建 server
// app = connect()

// // 指定供應 static file 的路徑
// // request 進來，先去 static 目錄找，沒有符合的才進入下一個 middleware 
// .use( connect.static('build') )
// .use( connect.static('dist') )

// .use( function(req, res, next ){
// 	fs.readFile('./dist/game.html', function(err, data){
// 		res.write(data);
// 		res.end();
// 	})
// })

// .use( function(req, res, next ){
// 	fs.readFile('./dist/card.html', function(err, data){
// 		res.write(data);
// 		res.end();
// 	})
// })

// // 啟動 server 在 8000
// http.createServer(app).listen(8000, function() {
//     console.log('Running on http://0.0.0.0:8000');
// });


var express = require('express');
var app = express();
var fs = require('fs');

app.get('/valentine_game.html', function (req, res) {
	fs.readFile('./dist/game.html', function(err, data){
		res.write(data);
		res.end();
	})
});

app.get('/valentine_card.html', function (req, res) {
	fs.readFile('./dist/card.html', function(err, data){
		res.write(data);
		res.end();
	})
});

// 靜態檔案
// http://localhost:8000/static/css/app.css
app.use('/valentine_static', express.static(__dirname + '/dist/static'));

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
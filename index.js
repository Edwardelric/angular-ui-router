var express = require('express');
var app = express();
var http = require('http');


// app.disabled('trust proxy');
// console.log(app.get('trust proxy'));

app.set('views',__dirname + '/views');

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/',function(req,res){
	res.render('index.ejs',{});
})s
 
app.listen(3000,function(){
  console.log('Example app listening on port 3000!');
});
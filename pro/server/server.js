var http = require("http");
var fs = require("fs");
var express = require("express");

var app = express()
app.use(express.static('../client'));
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
var cookie = require('cookie-parser');
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
//cookies为全局对象

var login = require('./routers/login.js')
app.use(login).listen(8888)

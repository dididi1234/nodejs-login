const express = require('express');
const router=express.Router();
var app = express();
var cookie = require('cookie-parser');
var mysql = require('mysql');
//连接数据库
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'12345678',
	database : 'userpass'
}); 
connection.connect(function(err,result){
	if(err){
		console.log(err);
		return
	}
	console.log('连接成功')
});
router.post("/login",function(req,res,next){
	var status={
		state:'',
		dec:'',
		id:''
	}
	var islogin=12314
	var losql="select*from login where user=?";
	var addlosql=[req.body.name];
	//登录
	connection.query(losql,addlosql,function(err,result){
		if(err){
			console.log(err)
			return
		}
		console.log(result)
		if(result.length==0){
			status.state=1000;
			status.dec="用户名不存在"
		}else{
		if(req.body.password==result[0].password){
		status.state=200;
		status.dec='登录成功';
		status.id="2233"
		res.cookie('sckey',status.id);
		}else{
		status.state=400;
		status.dec='密码或用户名错误'
		}
		}
		res.send(status)
	})
	
	
	
});
//注册
router.post("/register",function(req,res){
	var term = req.body.username.length>0&&req.body.password.length>8
	var resta={}
	if(term){
	var selsql="select*from login where user=?";
	var addselsql=[req.body.username]
	connection.query(selsql,addselsql,function(err,results){
		if(err){
			console.log(err)
			return
		}
		if(results.length==0){
		var addsql = "insert into login(user,password) values(?,?)";
		var addsqlparams = [req.body.username,req.body.password]; 
		connection.query(addsql,addsqlparams,function(err,result){
			if(err){
				console.log(err)
				resta.state=400;
				resta.dec="注册失败";
				res.send(resta)
				return
			}
			resta.state=200;
			resta.dec="注册成功";
			res.send(resta)
			
		})
		}else{
			resta.state=700;
			resta.dec="用户名重复";
			res.send(resta)
		}
	})
	
		
	}else{
		resta.state=600;
		resta.dec="格式错误";
		console.log(1111111111111111111)
		res.send(resta)
	}
})
//router.get('/', function (req, res, next) {
//
//  //设置cookie
//  res.cookie('username','zhangsan1');
//  res.send("bb")
// 
//});
module.exports = router
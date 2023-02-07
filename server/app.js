
var fs = require('fs');
const mysql = require('mysql');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var resultobj = { status : "Fail", message :"" };
var connection;


function handleDisconnect() {
	
	connection = mysql.createConnection({
		host:'db.simpsonhoon.shop',
		port:3306,
		user:'simpsonhoon',
		password:'',
		database:'dbsimpsonhoon'
	});

	connection.connect(function(err) {
	
		if (err) {
			
			console.log('error on connection to db:'  , err );
			setTimeout(handleDisconnect, 2000 );  // after 2 second, try to connect again
			
		}
		
	});	
	connection.on('error',function(err) {
		//console.log('db error', err );
		if (err.code == 'PROTOCOL_CONNECTION_LOST') {  // occured when the mysql server closed the connection.
			handleDisconnect();
		} else {
			throw err;
		}	
	});
}

handleDisconnect();
	
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/jsonjoin', function(req, res){
	
    var id = req.body.id;
    console.log(id);	
    if(!id){

		resultobj.message='Please enter ID';
		res.send(JSON.stringify(resultobj));	
        return;
		
    } 
    var sql = "select id from  account  where id = ? ";
    var params = id;
	
   	connection.query(sql, params, function(err, rows, fields){
	
		if(err) {
			throw err;
			console.log(err);
			resultobj.message="Error occured!";
			res.send(JSON.stringify(resultobj));
			return;
		}
		else {
			console.log(rows.length);
			
			if (!rows.length ) {
				
				sql = "insert into account (id) values ( ? ) ";
				connection.query(sql, params, function(a,b,c,){});
				resultobj.message="Id "  + 	params + " was registered successfully :D";
				
			} else {
				resultobj.message="Somebody is using "  + 	params + "  :(  Try different ID ";
			}
			
			resultobj.status = "OK";
			res.send(JSON.stringify(resultobj));
			
		}
	});
	
});
	
//const hostname = 'test.simpsonhoon.shop';
const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});





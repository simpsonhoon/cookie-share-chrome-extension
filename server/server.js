const   http = require('http').Server();
const   io = require("socket.io")(http);
const   mysql = require('sync-mysql');

var dbconnection = new mysql ({
	
    host:'db.simpsonhoon.shop',
    port:3306,
    user:'simpsonhoon',
    password:'********',
    database:'dbsimpsonhoon'
	
});

function updateUser(userid,socketid) {
	
	var sql = "update account set socketid= ? where id= ? ";
	let result=dbconnection.query(sql,[socketid,userid]);
	
	return result.changedRows;
	
	
}

function readSocketid(userid) {

	var sql = " select  socketid from account where id ='"  + userid +"'";
	
	let result = dbconnection.query(sql)
	
	return result[0].socketid;	
		
}

io.on("connection", (socket) => {
	
	console.log("connected!!!", socket.id);
	
	socket.on('updateid', function(userid,socketid) {
			
			console.log('update from ', userid , ' socket id =', socketid );
			updateUser(userid,socketid);	
			
	});	

	socket.on('cookie', function(object) {
			
			var context = JSON.parse(object);
			console.log(context);
			console.log('cookies from ', context.sender , 'to ', context.receiver  );
			let socketid = readSocketid(context.receiver);
			socket.to(socketid).emit('cookie', object);
			
	});		
});	


http.listen(3001, function () {
		
		console.log('listening on *:3001');
		
});
   



var ioClient;
var Socketid="abcdefg";
ioClient = io.connect('http://test.simpsonhoon.shop:3001', {reconnect: true});


 // initTab, selectSendTab, seletRecvTab, selectIdTab :탭 선택에 따른 화면 UI 처리



function initTab() {
	
	var i;
	var x = document.getElementsByClassName("tabdiv");
	var b = document.getElementsByClassName("tabbtn");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";  	
	}
	for (i = 0; i < b.length; i++) {
		b[i].className = b[i].className.replace(" w3-blue", "");	
	}

}	

function selectSendTab() {
	initTab();	
	document.getElementById("SendCookie").style.display = "block"; 
	document.getElementById("SendTab").className +=" w3-blue";
}	

function selectRecvTab() {
	
	initTab();	
	document.getElementById("RecvCookie").style.display = "block"; 
	document.getElementById("RecvTab").className +=" w3-blue";
}	


function selectIdTab() {
	
	initTab();	
	document.getElementById("UserId").style.display = "block"; 
	document.getElementById("IdTab").className +=" w3-blue";
}	



/*======================================================================================================

   소켓 IO를 이용하여 쿠키값과 소켓 ID 값을 처리하는 함수
   
   1. updateUserId :  사용자 아이디와 사용자가 연결된 사용자의 소켓 ID 값을 mysql 의 account 테이블에 저장한다.

   2. handlerReadCookie : 상대방이 IO 소켓 서버를 통해 보내온 쿠키값을 처리하고 새 창 열기
   3. doSendBtn: 사용자가 수신인 입력후 상대방에게 쿠키값을 전송
   4. doRecvBtn() : 사용자 아이디와 소켓 아이디를 데이터 베이스에 update

   5. doRegisterBtn :  사용자 아이디를 생성하고 서버 및 로컬 스토리지에 저장하는 역활을 한다.
   
=======================================================================================================*/
function updateUserId(userid) {
	
    console.log("upateUserId", userid, Socketid);
	ioClient.emit("updateid", userid, Socketid );
	
}	

function handlerReadCookie(object) {
	
	var contexts = JSON.parse(object);
	
	let page_url = loadCookies(contexts.cookie_data);
	chrome.tabs.create( { url :  page_url });
	alert("Enjoy Cookie!");	
	
}	

function doSendBtn() {  

    var userid = document.getElementById("userid").value;
	if (userid=="")  {
		
			alert("Please register the ID");
			return;
		
	}	
	var receiver=document.getElementById("receiver").value;
	
	if ( receiver=="") {
		
			alert("Please enter the receiver`s ID");
			return;			
	}	

	chrome.tabs.query({active:true, currentWindow:true }, function(tabs) {
		
		getAllCookies(tabs[0].url, function(cookie_data) {   
	
			let object = { sender : userid, receiver : receiver, cookie_data : cookie_data };	
			console.log(object);
			ioClient.emit("cookie",JSON.stringify(object));

		});
	});		
}

function doRecvBtn() { 
   
	var userid = document.getElementById("userid").value;
	updateUserId(userid);
	
}

function doRegisterBtn() { 

	var userid = document.getElementById("registerid").value;
	if (userid=="") {
		
		alert("Enter the ID ");
		return;
				
	}	
	console.log("userid");
	$.ajax({  
				type: "POST" 
				,url: "http://test.simpsonhoon.shop:3000/jsonjoin"
				,data: {
					id: userid
					}
				,success:function(data){
					
					let results = JSON.parse(data);
					if (results.status == "OK") {
					   
						let node=document.getElementById("userid");
						node.value = userid;
						chrome.storage.local.set({"userid" : userid });
						updateUserId(userid);
						selectSendTab();
						document.getElementById("IdTab").style.display = "none"; 
						
						
					} 
					alert(results.message);	
					
				}
				,error:function(data){
					
					
				}
	});

}





ioClient.on('connect', function () {  // io 소켓에 접속하는 부분으로 접속이 되면 아이디와 접속된 소켓 아이디로 서버에 테이블을 갱신한다.
	Socketid = ioClient.id;
	console.log('socket connected', Socketid);	
	let userid = document.getElementById("userid").value;
	if (userid!="") updateUserId(userid);
});

ioClient.on('cookie', handlerReadCookie );   //서버에서 쿠키값을 보내올때 처리하는 함수를 불러온다.


document.addEventListener('DOMContentLoaded', function () {   // 확장 프로그램에서는 모든 eventhandler는 아래와 같이 직접 버튼에 세팅.

	
	var x;	
	x=document.getElementById("SendTab");
	x.addEventListener('click',selectSendTab);
	
	x=document.getElementById("RecvTab");
	x.addEventListener('click',selectRecvTab);
	
	x=document.getElementById("IdTab");
	x.addEventListener('click',selectIdTab);
		
	x=document.getElementById("SendBtn");
	x.addEventListener('click',doSendBtn);
	
	x=document.getElementById("RecvBtn");
	x.addEventListener('click',doRecvBtn);
	
	x=document.getElementById("RegisterBtn");
	x.addEventListener('click',doRegisterBtn);
	
	
});

chrome.storage.local.get("userid",function(result) {  // 로컬 스토리지에서 사용자 아이디를 읽고 만일 사용자 아이디가 있으면 해당 값을 이용하고 없으면 사용자 아이디를 등록하는 탭을 선택한다.

	
	let userid = (chrome.runtime.lastError !="") ? result["userid"] : "" ;
	document.getElementById("userid").value=userid;
	console.log(userid);		
	document.getElementById("IdTab").style.display = (userid=="" || typeof userid==="undefined") ? "block" : "none";
	if (userid=="" || typeof userid==="undefined" ) selectIdTab(); 
    
	
});	





var userid;


chrome.storage.local.get("userid",function(result) {
	
	userid = (chrome.runtime.lastError !="") ? result["userid"] : "" ;
	console.log(userid);
	
});	


chrome.runtime.onInstalled.addListener(function(object) {   // 크롬 확장 프로그램 설치될때 불려지는 루틴임.

});







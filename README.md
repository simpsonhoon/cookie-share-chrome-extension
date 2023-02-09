# Cookie-share-chrome-extension


### Introduce
-  왓챠, 넷플릭스, 웨이브 등 온라인 동영상 서비스(OTT)가 늘어나면서 계정을 공유하는 경우도 증가하고 있다. 네이버나 구글 등 개인 계정 아이디를 상대방에게 빌려주거나 알려줘야 하는 경우도 있다. 그때마다 자신의 고유 비밀번호를 알려주기는 껄끄럽고 비밀번호를 바꾸고 알려주는 일을 귀찮다. 이것을 해결하기 위해 비밀번호가 아닌 쿠키를 통한 계정 공유 프로그램을 개발해보았다.


### Algorithm

1. 처음 회원가입을 통해 서버에 ID를 저장한다.

<img src="https://user-images.githubusercontent.com/65848709/217831577-12b29090-bb75-4a64-8290-539c941c72ea.png" width="200" height="150"/>   <img src="https://user-images.githubusercontent.com/65848709/217832444-7f1f1b2d-de8e-412b-a739-71d3c54c46fa.png" width="250" height="150"/> 

2. 현재 페이지의 쿠키 정보와 Url을 data에 담는다.

3. 보내고자 하는 상대방의 ID 를 서버의 데이터베이스에서 검색 후 전송한다. 

<img src="https://user-images.githubusercontent.com/65848709/217832879-da6d3091-8edb-4e8d-b230-640c81c8b442.png" width="200" height="150"/>  <img src="https://user-images.githubusercontent.com/65848709/217833011-3b650049-962b-4509-8b7f-3b06c5eeb711.png" width="200" height="150"/>

4. 수신자가 Receive button을 누르게 되면 쿠키정보를 받게되며 자동으로 송신자가 보낸 페이지의 송신자 ID로 로그인된다.

5. 전송 로그 출력

 <img src="https://user-images.githubusercontent.com/65848709/217834005-8fb63a92-adee-4faf-823c-1419f3471926.png" width="400" height="250"/>



### Develpment Tools
- Javascript / node.js / MySQL / Chrome Extension 


### Video
- https://www.youtube.com/watch?v=pdFSiiYvmv8&ab_channel=%EC%94%B8%EC%93%B4

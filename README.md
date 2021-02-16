## ✍ 프로젝트 소개
### Link
[ETON 바로가기](https://eton-project.ga)

### 1. LOGO
<img src= "https://user-images.githubusercontent.com/37296369/106476732-b4994300-64ea-11eb-8f3a-99163a7988d6.png" width=200px>

### 2. About
_답답한 원격 회의, 칸반 보드를 통해 작업을 시각화해보세요._  
_노트(NOTE) 작성의 혁명 ETON 입니다._ 

### 3. 기술 스택 소개
![ETON - 기획 초안 - 기술 스택 (fix) (2)](https://user-images.githubusercontent.com/37296369/107871060-9e738580-6ee1-11eb-8cf4-ebcd0fa2e5d3.jpg)


## ✍ 팀원 소개 및 역할 분배
### 김선미 Front-end, 팀장
* Board Page (Drag & Drop 기능 구현), 전체적인 CSS 통일 작업, 업무 분배 및 스케줄 조정 
* [github 바로가기](https://github.com/ddubbu)  
* [회고록 포스팅](https://kr-ddubbu.tistory.com/79)  
### 임재현 Full
메인페이지, 회원가입, 서버 
### 이창섭 Back-end
API 작성, 배포

## ✍ 기획
### I. 핵심 기능
#### 1-1. Drag & Drop
![DnD](https://user-images.githubusercontent.com/37296369/107847496-82afa700-6e2f-11eb-9f10-ad95b259683a.gif)

#### 1-2. 알고리즘
![Drag   Drop](https://user-images.githubusercontent.com/37296369/107852512-670ac780-6e54-11eb-9793-46347b8c0831.png)
![Drag   Drop (2)](https://user-images.githubusercontent.com/37296369/107852733-c0272b00-6e55-11eb-9858-ec8039705689.png)




### II. Flow Chart
![ETON - 최종본 - Intro Page](https://user-images.githubusercontent.com/37296369/107845225-5428d080-6e1d-11eb-8080-1580764e5d40.jpg)
![ETON - 최종본 - Main Page](https://user-images.githubusercontent.com/37296369/107845226-568b2a80-6e1d-11eb-8b49-e051a4eed17c.jpg)
![ETON - 최종본 - Board Page](https://user-images.githubusercontent.com/37296369/107845237-6571dd00-6e1d-11eb-9a8b-00ddb221d307.jpg)

### III. Wireframe
![ETON-WireFrame 001](https://user-images.githubusercontent.com/42367317/107853200-01203f00-6e58-11eb-9f51-fa7e7204e846.jpeg)
![ETON-WireFrame 002](https://user-images.githubusercontent.com/42367317/107853204-03829900-6e58-11eb-88ec-e36e9fcd0b4b.jpeg)
![ETON-WireFrame 003](https://user-images.githubusercontent.com/42367317/107853205-041b2f80-6e58-11eb-9ce5-38937c5a928b.jpeg)
![ETON-WireFrame 004](https://user-images.githubusercontent.com/42367317/107853206-054c5c80-6e58-11eb-8721-003372bdc151.jpeg)
![ETON-WireFrame 005](https://user-images.githubusercontent.com/42367317/107853207-054c5c80-6e58-11eb-8e9c-57784a988d60.jpeg)

### IV. DB Schema
![db-eton](https://user-images.githubusercontent.com/37296369/107845729-3c534b80-6e21-11eb-8837-354115a568fc.png)

### V. API 문서 요약 리스트
+ method, Restful API 고민 흔적
### Restful API를 만들기 위한 회의기록
 #### 1차
 페이지별로 나눠서 분기하자!
```
 GET /board/:board_id
 GET /board/progress/:board_id/member/:progress_id
 GET /board/task/:board_id/:progress_id/:task_id
 GET /board/member/:board_id
```

 #### 2차
 1차에서의 문제점 
  - 1 : 보드페이지에 많은 기능이 있기 때문에 거의 모든 api의 엔드포인트가 /board로 시작해 분별이 어려움.
  - 2 : 다른 페이지에서도 보드 페이지에서 쓰이는 api들을 쓸 경우가 있음. (ex.메인 페이지에서도 보드 목록과 태스크 목록을 요청한다.)
  - 3 : `/board/progress/:board_id/member/:progress_id` 처럼 엔드포인트 중간에 board_id등으로 Path Variable를 넣어 분기해줄 경우, 분별하기가 어렵고, 분기도 잘 되지 않는다.

 해결책 
  - 1 : 페이지 별로 분기하는 것이 아니라 기능별로 분기 
  - 2 : Path Variable을 제일 마지막으로 
```
  GET /boards/:board_id
  POST /boards/:board_id
  GET /progress/:board_id 
  POST /progress/:board_id
```
 #### 3차(최종)
  2차에서의 문제점 
  - 1 : 여러가지 변수들을 POST Method가 아닌 다른 방식으로 보낼 수 없다. (ex.`Delete Task` 의 경우 여러가지 `board_id` , `progress_id` 등 여러 변수가 필요하지만 `Delete Method` 의 경우 `Request Body` 에 변수를 담아 보낼 수 없다)
  - 2 : 각 분기별 router 는 method (get, post, patch, delete)로 대부분 분리가되지만 분기가 더 필요한 경우가 있다. (ex.patch 의 경우 한번더 분기가 필요)

 해결책
  - 1 : Query Parameter를 활용하여 여러가지 변수를 담아 보내준다. (ex.`https://geteton.ga/taskboard_id=BOARD_ID&progress_id=PROGRESS_ID&task_id=TASK_ID&task_priority=TASK_PRIORITY`)
  - 2 : 필요한 경우 중간에서 한번 더 분기해준다. 
(ex. 보드 하나의 정보를 가져오는 엔드포인트와 유저의 모든 정보를 가져오는 엔드포인트 
`GET https://geteton.ga/boards/one?board_id=BOARD_ID`, `https://geteton.ga/boards/all?user_id=USER_ID`)

```
GET /progress/order/boardId?=BOARD_ID
GET /progress/title/boardId=?BOARD_ID&progressId=PROGRESS_ID
DELETE /task?board_id=BOARD_ID&progress_id=PROGRESS_ID&task_id=TASK_ID&task_priority=TASK_PRIORITY
```
+ 회의 기록 https://github.com/codestates/ETON-server/issues/54#issuecomment-776398118
더 자세한 내용은 [API 문서 PDF](https://github.com/codestates/ETON-client/files/5975515/ETON_API.3.pdf)
![요약본1](https://user-images.githubusercontent.com/37296369/107848346-0a001900-6e36-11eb-9fe0-ad113fe694a1.jpg)
![요약본2](https://user-images.githubusercontent.com/37296369/107848344-08365580-6e36-11eb-930b-f0c54edf1ae0.jpg)



### VI. Deploy

#### AWS EC2
<img src="https://media.vlpt.us/images/bbodela/post/f49cffb0-6bc5-4f89-b550-650995c9bea3/89c7a60.png" width=400px>

- Ubuntu Server 18.04 LTS (HVM), SSD Volume Type
- 루트 디바이스 유형: ebs
- 가상화 유형: hvm
- ENA 활성화

#### AWS Load Balancer
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRprCDpOftb_obNYdFUhQW1YTKvqSyPlPvrkw&usqp=CAU" width=400px>

**Application Load Balancer**

- HTTP 및 HTTPS 트래픽을 사용하는 웹 애플리케이션을 위한 기능 제공
- 애플리케이션 아키텍처를 대상으로 하는 고급 라우팅 및 표시 기능 제공

#### AWS RDS
<img src="https://media.vlpt.us/images/bbodela/post/6f246629-6079-497b-8a0f-fe6ba0a8a902/af925f8.png" width=400px>


- 엔진 옵션: MySQL (v8.0.20)
- DB 인스턴스 크기: db.t2.micro (1 vCPUs, 1 GiB RAM, Not EBS Optimized
- 스토리지: 범용(SSD), 20GiB

#### Amazon S3 + CloudFront
<img src="https://d2908q01vomqb2.cloudfront.net/5b384ce32d8cdef02bc3a139d4cac0a22bb029e8/2018/06/27/4-v-2.png" width=400px>

- HTTPS 배포
- S3 직접 공유에 비해 비용 절감

#### Route 53
<img src="https://gawoori.net/wp-content/uploads/2019/02/route-53%EC%97%90-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0.png" width=400px>

**도메인**
- S3: eton-project.ga
- EC2: geteton.ga


## ✍ Final App view
### 1. Intro page
![intro](https://user-images.githubusercontent.com/37296369/107847508-8b07e200-6e2f-11eb-9e56-1235ea32b2f3.gif)

### 2. SignUp
![signup](https://user-images.githubusercontent.com/37296369/107847516-92c78680-6e2f-11eb-9c8f-9755f3f3903f.gif)

### 3. SignIn
![signin](https://user-images.githubusercontent.com/37296369/107847511-8fcc9600-6e2f-11eb-98ec-c5923356e474.gif)

### 4. Main Page
#### 정보 수정
![유저인포 수정](https://user-images.githubusercontent.com/37296369/107847666-c951d100-6e30-11eb-8b01-3090a3047838.gif)
#### 새 보드 추가
![새보드추가](https://user-images.githubusercontent.com/37296369/107847486-71669a80-6e2f-11eb-8e8b-1892022003e3.gif)

### 5. Board Page
#### Drag & Drop
![DnD](https://user-images.githubusercontent.com/37296369/107847496-82afa700-6e2f-11eb-9f10-ad95b259683a.gif)
#### 추가
![추가](https://user-images.githubusercontent.com/37296369/107847494-7fb4b680-6e2f-11eb-9ab4-e44a4e10c14e.gif)
#### Task 수정
![Task 수정](https://user-images.githubusercontent.com/37296369/107847522-9a872b00-6e2f-11eb-92fd-4fa534bd0441.gif)
#### Board / Progress 이름 변경
![이름바꾸기](https://user-images.githubusercontent.com/37296369/107847491-775c7b80-6e2f-11eb-9669-b043145b07e8.gif)
#### 삭제
![삭제](https://user-images.githubusercontent.com/37296369/107847481-6ad82300-6e2f-11eb-94f9-7207c8a9d5c0.gif)



## 회고록 및 시행착오
* 김선미 회고록
[포스팅](https://kr-ddubbu.tistory.com/79)  

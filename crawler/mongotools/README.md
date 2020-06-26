## MongoDB

### 1. 설치

#### 1-1. Mac(Dev, brew 대신 .tgz Archive 설치)

1. 다운로드 MongoDB Community Server(.tgz Archive)

2. 적당한 위치에 .tgz 제거

3. MongoDB startup plist 작성 및 사용한 설정

   - ~/Library/LaunchAgents/com.mongodb.mongod.plist 생성

   - 다음 내용 작성

     ```XML
     <?xml version="1.0" encoding="UTF-8"?>
     <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
     <plist version="1.0">
       <dict>
         <key>Label</key>
         <string>org.mongo.mongod</string>
         <key>RunAtLoad</key>
         <true/>
         <key>ProgramArguments</key>
         <array>
             <string>/Users/kickscar/Applications/mongodb-macos-x86_64-4.2.8/bin/mongod</string>
             <string>--dbpath</string>
             <string>/Users/kickscar/mongodb/db</string>
             <string>--logpath</string>
             <string>/Users/kickscar/mongodb/log/mongodb.log</string>
         </array>
       </dict>
     </plist>
     ```

   - db및 로그 디렉토리 생성

     ```bash
     $ mkdir -p ~/mongodb/db
     $ mkdir -p ~/mongodb/log
     ```

   - 서비스 등록

     ```bash
     $ launchctl load ~/Library/LaunchAgents/com.mongodb.mongod.plist
     ```

   - 서비스 제거

     ```bash
     $ launchctl unload ~/Library/LaunchAgents/com.mongodb.mongod.plist
     ```

   - 서비스 실행

     ```bash
     $ launchctl start org.mongo.mongod
     ```

   - 서비스 종료

     ```bash
     $ launchctl stop org.mongo.mongod
     ```

     

#### 1-2. Linux(Operations, Source Compile Installation)

==============================

### 2. Basics

​	MongoDB 데이터의 기본 단위는 Document이다. RDBMS의 Table의 row와 유사하다. Document의 모음을 Collection이라 하며 RDBMS의 Table로 생각할 수 있다. MongoDB의 실행 즉, 하나의 인스탄스로 여러 데이터베이스를 운용할 수 있다.

1. Document

2. Collection

3. Database(instance)

#### 2-1. Shell과 기본 CRUD 연습

​	MongoDB는 MongoDB 인스탄스와 인스탄스의 여러 데이터베이스에 대한 관리와 조작에 유용한 강력한 JavaScript Shell를 제공한다.

1. Shell 실행하기

   ```bash
   $ mongo
   ```

   ​	기본적으로 연결하면 test database에 연결된다. 사실, test database는 이 시점에 생성되지 않는다. 첫 번째 document가 insert될 때, collection과 database가 생성된다. MongoDB는 데이터에 대해 동적 접근 방식을 택하고 있으며 이는 docuemnt의 shceme가 미리 정의될 필요가 없으며 개별 collection과 database 역시 미리 생성될 필요가 없다는 뜻이다.  

2. 새 database mydb 연결

   ```JavaScript
   > use mydb
   switched to db mydb
   ```

   ​	 JavaScript Shell 이기 때문에  JavaScript 코드로 설명하면, database mydb 연결을 db라는 전역변수에 할당(assignment) 한 것이다. db 전역 변수를 출력해 보자.

   ```JavaScript
   > db
   mydb
   ```

   ​	shell이기 때문에 변수 db의 값이 출력된다.

   

3. document 생성

   간단한 document(json 형식) {name:'둘리', email:'dooly@kickscar.me'} 를 mydb의 user collection에 insert 해보자.

   ```JavaScript
   > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
   WriteResult({ "nInserted" : 1 })
   ```

   조회를 위해 하나 더 추가 해보자.

   ```JavaScript
   > db.user.insert({name:'마이콜', email:'michol@kickscar.me'})
   WriteResult({ "nInserted" : 1 })
   ```

   

4. document 조회

   count() 함수를 사용해서 user collection의 document 수를 세어 보자.

   ```javascript
   > db.user.count()
   2
   ```

   user collection의 모든 document 보기 위해서 find() 함수를 사용한다.

   ```javascript
   > db.user.find()
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me" }
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@kickscar.me" }
   ```

    query selector를 사용해서 특정 document 찾아보자.

   ```javascript
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me" }
   ```

5. document 업데이트

   마이콜의 email을 'michol@gmail.com' 으로 업데이트 해보자.

   ```javascript
   > db.user.update({name:'마이콜'}, {$set:{email:'michol@gmail.com'}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com" }
   ```

   ​	update() 함수는 두 개의 파라미터가 필요하다. 첫 번째는 업데이트 대상 document를 찾기 위한 query selector이며 두 번째는 찾은 문서에 대한   수정 내용을 담고 있는 json이 된다.  

   ```JavaScript
   db.user.update({name:'둘리'}, {$set: {hobby:['Coding', 'Swimming']}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me", "hobby" : [ "Coding", "Swimming" ] }
   ```

   ​	다음 예제를 위해 마이콜에도 취미들을 추가해 보자.

   ```javascript
   > db.user.update({name:'마이콜'}, {$set: {hobby:['Reading', 'Cooking']}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

   ​	앞의 문서의 수정 예제는 기존 내용의 변경이다. 배열 같은 경우에는 변경 보다는 추가라고 볼 수 있다. 배열에 대한 수정으로 $push와 $addToSet 연산자도 제공한다.  '기타연주' 를  둘리의 취미에 추가를 위해 $push 연산자를 사용해 보자.

   ```javascript
   > db.user.update({name:'둘리'}, {$push: {hobby:'Playing a guitar'}}, false, true)
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me", "hobby" : [ "Coding", "Swimming", "Playing a guitar" ] }
   ```

   ​	쿼리를 보면 이해하는 데 크게 어렵지 않지만 세 번째, 네 번째 파라미터가 추가된 것을 볼 수 있다. 세번째 파라미터는....  네번째 파라미터는 다중 업데이트를 할 것인지에 대한 것이다. 기본은 조건의 첫 번째 document만 업데이트하기 때문에 해당 조건의 document를 모두 업데이트하기 위해서는 true로 설정해야 한다. 

   ​	$addToSet은 연산자는 배열에 해당 값이 존재하면 추가하지 않는다.  다음 예제로 확인해 보자.

   ```javascript
   > db.user.update({name:'마이콜'}, {$addToSet:{hobby:'Cooking'}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef041d2a2dce6bf54348bee"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

   

6. document 삭제

   ​	document의 삭제를 위해서는 remove() 함수를 사용한다. 취미 중에 'Swimming'이 취미인 사용자를 삭제해보자.

   ```javascript
   > db.user.remove({'hobby': 'Swimming'})
   WriteResult({ "nRemoved" : 1 })
   > db.user.find()
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

   ​	remove() 연산은 collection을 삭제하지 않는다. collection을 삭제하기 위해서는 drop() 함수를 사용해야 한다.

   ```javascript
   > db.user.drop()
   true
   > db.runCommand( { listCollections: 1.0, nameOnly: true } )
   {
   	"cursor" : {
   		"id" : NumberLong(0),
   		"ns" : "mydb.$cmd.listCollections",
   		"firstBatch" : [ ]
   	},
   	"ok" : 1
   }
   ```

   ​	collection list를 출력하기 위해서는 runCommand(...) 함수를 사용해야 한다. 결과는 firstBatch이름의 배열에 collection 정보가 들어 있다. collection이 하나도 없음을 알 수 있다.

#### 2-2. Data Type

==============================



#### 2-3. Management

1. MongoDB 시작과 중지

2. Monitoring

3. Security & Authentification

   - admin 계정 추가

     ```javascript
     > use admin
     > db.createUser({user:"root", pwd:"password", roles:["root"]})
     Successfully added user: { "user" : "root", "roles" : [ "root" ] }
     ```

   - --auth 옵션으로 mongod 실행하기

     Mac에서는 ~/Library/LaunchAgents/com.mongodb.mongod.plist 내용을 다음과 같이 수정하고 재실행한다.

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
     <plist version="1.0">
       <dict>
         <key>Label</key>
         <string>org.mongo.mongod</string>
         <key>RunAtLoad</key>
         <true/>
         <key>ProgramArguments</key>
         <array>
             <string>/Users/kickscar/Applications/mongodb-macos-x86_64-4.2.8/bin/mongod</string>
             <string>--dbpath</string>
             <string>/Users/kickscar/mongodb/db</string>
             <string>--logpath</string>
             <string>/Users/kickscar/mongodb/log/mongodb.log</string>
             <string>--auth</string>
         </array>
       </dict>
     </plist>
     ```

   - admin db 접속

     ```bash
     > use admin
     switched to db admin
     > db.auth('root', 'password')
     1
     ```

   - mydb database에 사용자 추가하기

     ```javascript
     > use admin
     switched to db admin
     > db.auth('root', 'password')
     1
     > use mydb
     switched to db mydb
     > db.createUser( {user:"mydb", pwd:"mydb", roles:["readWrite"]} )
     Successfully added user: { "user" : "mydb", "roles" : [ "readWrite" ] }
     ```

   - mydb 사용자로 mydb database 접속하기

     ```bash
     $ mongo
     MongoDB shell version v4.2.8
     connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
     Implicit session: session { "id" : UUID("d9609c18-6273-4043-bae9-0332bbe72695") }
     MongoDB server version: 4.2.8
     > use mydb
     switched to db mydb
     > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
     WriteCommandError({
     	"ok" : 0,
     	"errmsg" : "command insert requires authentication",
     	"code" : 13,
     	"codeName" : "Unauthorized"
     })
     > 
     ```

     ​	인증 없이 document insert 작업 시 오류가 발생한다.

     ```javascript
     > use mydb
     switched to db mydb
     > db.auth('mydb', 'mydb')
     1
     > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
     WriteResult({ "nInserted" : 1 })
     > db.user.find()
     { "_id" : ObjectId("5ef06036275e8e21067f6937"), "name" : "둘리", "email" : "dooly@kickscar.me" }
     ```

     ​	인증 후, document insert 작업은 성공한다.

### 3. Query & Aggregation

==============================



### 4. MongoDB Programming

#### 4-1. Understanding Driver

1. 객체 ID
2. BSON
3. Network

#### 4-2. Python

1. PyMongo
   - 설치
2. dwqdwq

#### 4-3. Node
#### 4-4. Java



### 5. Advanced Subjects

#### 5-1. Indexing & Optimization
#### 5-2. Replication
#### 5-3. Sharding
#### 5-4. Design Pattern


### 6. MongoDB Internals
#### 6-1. BSON
#### 6-2. GridFS
#### 6-3. Wire Protocol
#### 6-4. Data File
#### 6-5. Memory Mapped Storage Engine













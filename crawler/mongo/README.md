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

   - 서비스 실행

     ```bash
     $ launchctl start org.mongo.mongod
     ```

   - 서비스 종료

     ```bash
     $ launchctl stop org.mongo.mongod
     ```

     

#### 1-2. Linux(Operations, Source Compile Installation)




### 2. Basics
#### 2-1. Shell
#### 2-2. Data Type
#### 2-3. CRUD
#### 2-4. Management



### 3. Query & Aggregation



### 4. Programming

#### 4-1. Understanding Driver
#### 4-1. Python
#### 4-2. Node
#### 4-3. Java



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













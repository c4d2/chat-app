## 启动前端界面

```
cd chat-app

npm i

npm start
```

chat-app\src\constants中的constants.js可以修改各种api接口地址，改成自己的即可

## 启动服务端

```
cd server

npm i

npm start
```

在 /server/.env中修改自己mongodb的端口号和地址

```
PORT=5000
MONGO_URL="mongodb://127.0.0.1:27017/chat"
# chat是mongodb的数据库名称（自己建一个就行）
```

mongodb可以用navicat管理
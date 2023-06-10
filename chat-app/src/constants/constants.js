const IMAGE =
    [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F12%2F20200612155112_djhht.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684908055&t=181aa5f621e8476118480c2f9a2a058f',
        'https://p4.itc.cn/images01/20220310/f996f1de8d6f48039a33ff9a489265a6.jpeg',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202010%2F18%2F20201018180702_5e1ce.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684908343&t=9a486f9f01656cd90c0171bf213f5a4b',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202111%2F02%2F20211102082000_9eeec.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1684908343&t=8681db73f3c66979c5c3fdc41ab25a0d'
    ];//头像数据

const SOCKET_URL = 'http://localhost:5000'; // Socket.IO 服务器地址

const MESSAGE_URL = 'http://localhost:5000/api/messages'; //用户发送消息的地址

const CHATMESSAGE_URL = 'http://localhost:5000/api/chatmessages'; //用户发送消息的地址

const USER_URL = 'http://localhost:5000/api/auth' //用户发送本来自身用户的请求

const SEARCH_URL = 'http://localhost:3000/api1'

export { IMAGE, SOCKET_URL, MESSAGE_URL, USER_URL, CHATMESSAGE_URL, SEARCH_URL };
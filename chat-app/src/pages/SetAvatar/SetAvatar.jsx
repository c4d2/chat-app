import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
//引入常量
import { IMAGE } from '../../constants/constants';

//内存数据
import memoryUtils from '../../utils/memoryUtils';

//请求接口
import { reqSetAvatar } from '../../api/users';

//样式文件
import './setAvatar.less';
import storageUtils from '../../utils/storageUtils';
import io from 'socket.io-client';
//引入外部url数据
import { SOCKET_URL } from '../../constants/constants';
const socket = io(SOCKET_URL); // 创建 Socket.IO 客户端实例

export default function SetAvatar() {
    const navigate = useNavigate()

    const [imageIndex, setImageIndex] = useState(null)
    useEffect(() => {
        // console.log(storageUtils.getUser())
        const user = storageUtils.getUser();
        // console.log(user)
        //一上来先判断memory中是否有属性
        if (JSON.stringify(user) === "{}" && JSON.stringify(memoryUtils.user) === "{}") {
            //两个里面都没有就跳转登录界面
            console.log(1)
            navigate('/loginre')
        } else if (JSON.stringify(user) !== "{}" && user.isAvatarImageSet) {
            //storage里面有说明已经登录过
            //监听登录信息，如果已经设置了头像则
            // 把信息给后端socket证明用户已经登录
            socket.emit('add-message', {
                user
            });
            //则直接跳转主页面
            navigate('/')
        }
    }, [navigate]);

    //获取到元素并且设置box-shadow属性
    const handleshaow = (index) => {
        const image = document.getElementsByClassName(`image`);
        if (image) {
            let n = 4;
            while (n--) {
                if (n !== index) {
                    image[n].style.boxShadow = 'none';
                } else {
                    image[index].style.boxShadow = '2px 2px 10px 3px #9991e2';
                }
            }
        }
        setImageIndex(index);
    }

    //提交设置头像
    const handlesetavatar = () => {
        //memory中获取user数据
        const user = storageUtils.getUser();
        if (JSON.stringify(user._id) === "{}") {
            //请先登录
            navigate('/loginre')
        }
        if (imageIndex === null) {
            message.warning('请选择一个头像~')
        } else {
            console.log(user._id)
            const setavater = reqSetAvatar(user._id, IMAGE[imageIndex]);
            setavater.then(response => {
                console.log(response)
                //返回数据成功
                if (response.statusText === 'OK') {
                    // 修改本地内存中的数据
                    user.isAvatarImageSet = true;
                    user.avatarImage = IMAGE[imageIndex];
                    storageUtils.saveUser(user);
                    message.success('你获得了一个可爱的头像~~开始聊天吧！')
                    //则进行跳转界面
                    navigate('/');
                }
                else {
                    message.error('上传头像失败！')
                }
            }).catch(e => {
                message.error(e)
            })
        }

    }

    return (
        <div className='setavatar'>
            <h1>
                请选择一个头像作为您的头像！
            </h1>
            <div className='imagelist'>
                {
                    IMAGE.map((image, index) => {
                        return <img
                            src={image}
                            className={`image`}
                            alt="avatar"
                            key={index}
                            onClick={() => handleshaow(index)}
                        />
                    })
                }
            </div>
            <Button type="primary" className='image_button' onClick={handlesetavatar}>设为头像</Button>
        </div>
    )
}

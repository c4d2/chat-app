import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

//引入外部less
import './index.less'

//引入接口
import { reqLogin, reqRegister } from '../../api/users';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default function LoginAndRegister() {
    // 滑动的状态
    const [flag, setFlag] = useState(true);
    // 设置移动盒子
    const [prebox, setPrebox] = useState({});
    const [img, setImg] = useState(require('./img/waoku.jpg'));
    //路由
    const navigate = useNavigate();

    //登录输入数据
    const [formLogin, setFormLogin] = useState({ username: '', password: '' });
    const [formRegister, setFormRegister] = useState({ username: '', email: '', password: '', confirmpwd: '' });

    //移动盒子切换登录注册页面
    const mySwitch = () => {
        if (flag) {
            // 获取到滑动盒子的dom元素并修改它移动的位置
            setPrebox({
                transform: 'translateX(100%)',
                backgroundColor: '#A7ABFE',
            })
            setImg(require('./img/wuwu.jpeg'))
        }
        else {
            setPrebox({
                transform: 'translateX(0%)',
                backgroundColor: '#cbb8ff',
            })
            setImg(require('./img/waoku.jpg'))
        }
        setFlag(!flag);
    };

    //创造背景气泡
    const bubleCreate = () => {
        // 获取body元素
        const body = document.getElementById("login_and_register")
        // 创建泡泡元素
        const buble = document.createElement('span')
        // 设置泡泡半径
        let r = Math.random() * 5 + 25 //半径大小为25~30
        // 设置泡泡的宽高
        buble.style.width = r + 'px'
        buble.style.height = r + 'px'
        // 设置泡泡的随机起点
        buble.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
        // console.log(buble.style.left)
        // 为body添加buble元素
        body.appendChild(buble)
        // 4s清除一次泡泡
        setTimeout(() => {
            buble.remove()
        }, 4000)
    };

    //使定时器仅运行一次
    useEffect(() => {
        // console.log(storageUtils.getUser())
        //一上来先判断memory中是否有属性
        if (JSON.stringify(storageUtils.getUser()) !== "{}") {
            //storage里面有说明已经登录过则直接跳转主页面
            navigate('/')
        }

        // 每200ms生成一个泡泡
        const buble = setInterval(() => {
            bubleCreate()
        }, 200);

        //清除定时器
        return () => clearInterval(buble);
    }, [navigate]);

    //获取登录页表单数据
    const handleInputchangeLogin = event => {
        const { name, value } = event.target;
        // console.log(name, value)
        setFormLogin({ ...formLogin, [name]: value })
    }

    //获取注册页表单数据
    const handleInputchangeRegister = event => {
        const { name, value } = event.target;
        // console.log(name, value)
        setFormRegister({ ...formRegister, [name]: value })
    }

    //提交登录数据
    const handleSubmitLogin = () => {
        // console.log(formLogin);
        //发送axios登录请求
        const login = reqLogin(formLogin.username, formLogin.password);
        //请求发送之后返回结果
        login.then((response) => {
            const result = response.data;
            if (result.status === true) {
                console.log(result.user);
                //登录成功消息显示
                message.success('登录成功！')
                console.log(result.user)
                //密码正确则跳转到设置头像界面
                //登录成功之后存储用户数据到memory和local中
                memoryUtils.user = result.user;
                storageUtils.saveUser(result.user);
                navigate('/setavatar');
            } else {
                //返回的错误结果
                message.warning(result.msg)
            }
        }).catch((e) => {
            console.error(e)
        })
        // console.log(login)
    }

    //提交注册数据
    const handleSubmitRegister = () => {
        console.log(formRegister)
        if (!formRegister.username) {
            message.warning('请输入用户名！');
        } else if (!formRegister.email) {
            message.warning('请输入邮箱号！');
        } else if (!formRegister.password) {
            message.warning('请输入密码！');
        }//如果数据不相等
        else if (formRegister.confirmpwd !== formRegister.password) {
            message.warning("请确认两次输入密码是否相等")
        } else {
            // 给后台提交数据
            const register = reqRegister(formRegister.username, formRegister.email, formRegister.password);
            register.then((response) => {
                console.log(response)
                const result = response.data;
                //正确返回数据
                if (result.status === true) {
                    message.success('注册用户成功！请登录~~');
                    // 刷新表单
                    setFormRegister({ username: '', email: '', password: '', confirmpwd: '' })
                    //切换到登录用户界面
                    mySwitch();

                } else {
                    message.error(result.msg);
                }
            }).catch(e => {
                message.error(e);
            })
        }
    }

    return (
        //   < !--最外层的大盒子 -- >
        <div id='login_and_register'>
            <div className="box">
                {/* <!-- 滑动盒子 --> */}
                <div className="pre-box" style={prebox}>
                    <h1>WELCOME</h1>
                    <p>JOIN US!</p>
                    <div className="img-box">
                        <img src={img} alt="" />
                    </div>
                </div>
                {/* <!-- 注册盒子 --> */}
                <div className="register-form">
                    {/* <!-- 标题盒子 --> */}
                    <div className="title-box">
                        <h1>注册</h1>
                    </div>
                    {/* <!-- 输入框盒子 --> */}
                    <div className="input-box">
                        <input type="text" name='username' value={formRegister.username} placeholder="用户名" onChange={handleInputchangeRegister} />
                        <input type="email" name='email' value={formRegister.email} placeholder="邮箱" onChange={handleInputchangeRegister} />
                        <input type="password" name='password' value={formRegister.password} placeholder="密码" onChange={handleInputchangeRegister} />
                        <input type="password" name='confirmpwd' value={formRegister.confirmpwd} placeholder="确认密码" onChange={handleInputchangeRegister} />
                    </div>
                    {/* <!-- 按钮盒子 --> */}
                    <div className="btn-box">
                        <button onClick={handleSubmitRegister}>注册</button>
                        {/* <!-- 绑定点击事件 --> */}
                        <p onClick={mySwitch}>已有账号?去登录</p>
                    </div>
                </div>
                {/* <!-- 登录盒子 --> */}
                <div className="login-form">
                    {/* <!-- 标题盒子 --> */}
                    <div className="title-box">
                        <h1>登录</h1>
                    </div>
                    {/* <!-- 输入框盒子 --> */}
                    <div className="input-box">
                        <input type="text" name='username' value={formLogin.username} placeholder="用户名" onChange={handleInputchangeLogin} />
                        <input type="password" name='password' value={formLogin.password} placeholder="密码" onChange={handleInputchangeLogin} />
                    </div>
                    {/* <!-- 按钮盒子 --> */}
                    <div className="btn-box">
                        <button onClick={handleSubmitLogin}>登录</button>
                        {/* <!-- 绑定点击事件 --> */}
                        <p onClick={mySwitch}>没有账号?去注册</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

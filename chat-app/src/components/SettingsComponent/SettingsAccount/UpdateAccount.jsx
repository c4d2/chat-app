import React, { useEffect, useState } from 'react';

import { Form, Input, Button, message } from 'antd';
import './updateaccount.less'
import storageUtils from '../../../utils/storageUtils';

//接口
import { reqUpdateUser } from '../../../api/users';

const { Item } = Form;
const { TextArea } = Input;

export default function UpdateAccount() {

    const [form] = Form.useForm();

    //获取当前用户的昵称邮箱
    const userinfo = storageUtils.getUser();

    const initialValues = {
        username: userinfo.username,
        email: userinfo.email,
        brief: userinfo.brief
    }

    useEffect(() => {
        // console.log(userinfo.brief)
    }, [])

    const onFinish = (values) => {
        // console.log(values)
        const updateuser = reqUpdateUser(userinfo._id, values.email, values.brief);
        updateuser.then((response) => {
            // console.log(response)
            if (response.statusText === 'OK') {
                console.log(response.data)
                storageUtils.saveUser(response.data)
                message.success('修改成功');
                // console.log(response.data)
                form.setFieldsValue({
                    email: values.email,
                    brief: values.brief
                });
            }
        }).catch(e => {
            console.error(e);
        })
    };


    return (
        <div className='UpdateAccount'>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Item label="昵称" name="username">
                    <Input disabled />
                </Item>

                <Item label="邮箱" name="email" >
                    <Input value="31" />
                </Item>

                <Item label="简介" name="brief">
                    <TextArea rows={4} />
                </Item>
                <Item wrapperCol={{
                    offset: 8, span: 16,
                }}>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                </Item>
            </Form>
        </div>
    )
}

import React from 'react';

import LetsChat from '../../../asset/images/letschat.gif'
import './welcome.less';


export default function Welcome() {
    return (
        <div className='Welcome'>
            <img src={LetsChat} alt="" />
        </div>
    )
}

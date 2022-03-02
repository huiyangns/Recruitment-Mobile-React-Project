import React from 'react';
import {Image, AutoCenter} from 'antd-mobile'
import logo from './logo.png'

export default function Logo() {
  return <div className='logo-container'>
    <AutoCenter>
      <Image src={logo} width={240} height={240} fit='contain' />
    </AutoCenter>
  </div>;
}

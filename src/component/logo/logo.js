import React from 'react'

import logoImg from './job.png'
import './logo.css'

class Logo extends React.Component{

  render(){
    return (
      <div className="logo-container">
        <img src={logoImg} alt="暂无图片" />
      </div>
    )
  }
}

export default Logo


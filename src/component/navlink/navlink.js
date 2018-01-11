import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
  state=>state.chat
)
class NavLinkBar extends React.Component{
  static propTypes = {
    data: PropTypes.array
  }
  render() {
    // 过滤影藏的组件
    const navList = this.props.data.filter( v => !v.hide)
    const {pathname} = this.props.location

    // console.log(navList)
    return (
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item
            badge={v.path==='/msg'?this.props.unread:0}
            key={v.icon}
            title={v.text}
            icon={{uri:require(`./img/${v.icon}.png`)}}
            selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
            selected={pathname===v.path}
            onPress={()=>{
              this.props.history.push(v.path)
            }}
          >
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar

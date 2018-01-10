import React from 'react'
import {Grid,List,Button} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func
  }

  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    const avatarList = '0,1,2,3,4,5,6,7,8,9'
      .split(',')
      .map( (v) =>({
        icon: require(`../img/${v}.jpg`),
        text: v
      }))
    const gridHeader = this.state.icon
      ? (<div>
          <span>已选择头像</span>
          <img style={{width:20}} src={this.state.icon} alt="" />
        </div>)
      : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList}
                columnNum="5"
                onClick={(elm) => {
                  this.setState(elm)
                  console.log('elm',elm)
                  this.props.selectAvatar(elm.text)
                }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector


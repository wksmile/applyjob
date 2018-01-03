import React from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import App from './App'
import {logout} from './Auth.redux'

function Erying() {
  return <h2>二英</h2>
}

function Qibinglian() {
  return <h2>骑兵连</h2>
}

@connect(
  state=>state.auth,
  {logout}
)
class Dashboard extends React.Component{
  render(){
    console.log('dashboard',this.props)
    const match = this.props.match.url
    const redirectToLogin = <Redirect to="/login"></Redirect>
    const Single = (
      <div>
        <h1>独立团</h1>
        {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
        <ul>
          <li>
            <Link to={`${match}`}>一营</Link>
          </li>
          <li>
            <Link to={`${match}/erying`}>二营</Link>
          </li>
          <li>
            <Link to={`${match}/qibinglian`}>骑兵连</Link>
          </li>
        </ul>
        <Route path={`${match}`} exact component={App}></Route>
        <Route path={`${match}/erying`} component={Erying}></Route>
        <Route path={`${match}/qibinglian`} component={Qibinglian}></Route>
      </div>
    )
    return this.props.isAuth ? Single : redirectToLogin
  }
}

export default Dashboard

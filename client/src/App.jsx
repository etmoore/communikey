import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Redirect
} from 'react-router-dom'
import axios from 'axios'
import Header from './components/Header'
import AskIndex from './components/AskIndex'
import AskForm from './components/AskForm'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: [],
      isAuthenticated: false
    }
    this.getAllAsks = this.getAllAsks.bind(this)
    this.createAsk = this.createAsk.bind(this)
    this.updateAsk = this.updateAsk.bind(this)
    this.deleteAsk = this.deleteAsk.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }
  componentWillMount () {
    this.getAllAsks()
    this.setState({
      isAuthenticated: !!window.localStorage.getItem('authToken')
    })
  }
  getAllAsks () {
    return axios.get('/api/v1/asks')
      .then((res) => {
        this.setState({
          asks: res.data
        })
      })
      .catch(err => console.error(err))
  }
  createAsk (askData) {
    return axios.post('/api/v1/asks', askData)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  updateAsk (askData, askID) {
    return axios.put(`/api/v1/asks/${askID}`, askData)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  deleteAsk (askID) {
    return axios.delete(`/api/v1/asks/${askID}`)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  registerUser (userData) {
    return axios.post('/api/v1/auth/register', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        this.setState({ isAuthenticated: true })
      })
      .catch(err => console.error(err))
  }
  loginUser (userData) {
    return axios.post('/api/v1/auth/login', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        this.setState({ isAuthenticated: true })
      })
      .catch(err => console.error(err))
  }
  logoutUser () {
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
    this.props.history.push('/')
  }
  render () {
    const {asks, isAuthenticated} = this.state
    return (
      <div className='App container'>
        <Header
          logoutUser={this.logoutUser}
          isAuthenticated={isAuthenticated} />
        <Route exact path='/' render={() => (
          <AskIndex
            asks={asks}
            deleteAsk={this.deleteAsk} />
          )} />
        <Route path='/new' render={() => (
          isAuthenticated
          ? <AskForm askID={null} saveAsk={this.createAsk} />
          : <Redirect to='/login' />
        )} />
        <Route path='/edit/:id' render={({match}) => (
          isAuthenticated
          ? <AskForm askID={match.params.id} saveAsk={this.updateAsk} />
          : <Redirect to='/login' />
        )} />
        <Route path='/register' render={() => (
          <RegistrationForm registerUser={this.registerUser} />
        )} />
        <Route path='/login' render={({history}) => (
          <LoginForm loginUser={this.loginUser} history={history} />
        )} />
      </div>
    )
  }
}

export default App

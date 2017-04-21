import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
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
    return axios.get('http://localhost:3000/api/v1/asks')
      .then((res) => {
        this.setState({
          asks: res.data
        })
      })
      .catch(err => console.error(err))
  }
  createAsk (askData) {
    return axios.post('http://localhost:3000/api/v1/asks', askData)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  updateAsk (askData, askID) {
    return axios.put(`http://localhost:3000/api/v1/asks/${askID}`, askData)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  deleteAsk (askID) {
    return axios.delete(`http://localhost:3000/api/v1/asks/${askID}`)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  registerUser (userData) {
    return axios.post('http://localhost:3000/api/v1/auth/register', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        this.setState({ isAuthenticated: true })
      })
      .catch(err => console.error(err))
  }
  loginUser (userData) {
    return axios.post('http://localhost:3000/api/v1/auth/login', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        this.setState({ isAuthenticated: true })
      })
      .catch(err => console.error(err))
  }
  logoutUser () {
    console.log('logout firing')
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
  }
  render () {
    const {asks, isAuthenticated} = this.state
    return (
      <Router>
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
            <AskForm
              askID={match.params.id}
              saveAsk={this.updateAsk} />
          )} />
          <Route path='/register' render={() => (
            <RegistrationForm registerUser={this.registerUser} />
          )} />
          <Route path='/login' render={() => (
            <LoginForm loginUser={this.loginUser} />
          )} />
        </div>
      </Router>
    )
  }
}

export default App

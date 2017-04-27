import React, {Component} from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Header from './components/Header'
import AskIndex from './components/AskIndex'
import AskForm from './components/AskForm'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import FlashMessages from './components/FlashMessages'
import AskView from './components/AskView'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: [],
      flashMessages: [],
      isAuthenticated: false
    }
    this.getAllAsks = this.getAllAsks.bind(this)
    this.createAsk = this.createAsk.bind(this)
    this.updateAsk = this.updateAsk.bind(this)
    this.deleteAsk = this.deleteAsk.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.deleteFlashMessage = this.deleteFlashMessage.bind(this)
    this.createFlashMessage = this.createFlashMessage.bind(this)
  }
  componentWillMount () {
    this.getAllAsks()
    this.setState({
      isAuthenticated: !!window.localStorage.getItem('authToken')
    })
  }
  createFlashMessage (text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }
  deleteFlashMessage (index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        flashMessages: [...this.state.flashMessages.slice(index + 1)]
      })
    }
  }
  getAllAsks () {
    return axios.get('/api/v1/asks')
      .then((res) => {
        this.setState({
          asks: res.data
        })
      })
      .catch(error => console.error(error))
  }
  createAsk (askData) {
    askData.user_id = window.localStorage.getItem('user')
    return axios.post('/api/v1/asks', askData)
      .then(() => this.getAllAsks())
      .catch(error => console.error(error))
  }
  updateAsk (askData, askID) {
    return axios.put(`/api/v1/asks/${askID}`, askData)
      .then(() => this.getAllAsks())
      .catch(error => console.error(error))
  }
  deleteAsk (askID) {
    return axios.delete(`/api/v1/asks/${askID}`)
      .then(() => {
        this.createFlashMessage('Successfully deleted Ask')
        this.getAllAsks()
      })
      .catch(error => console.error(error))
  }
  registerUser (userData, callback) {
    console.log(callback)
    return axios.post('/api/v1/auth/register', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        window.localStorage.setItem('user', res.data.user)
        this.setState({ isAuthenticated: true })
        this.createFlashMessage('You successfully registered! Welcome!')
        this.props.history.push('/')
      })
      .catch((error) => {
        const errorMessage = error.response.data.error
        callback(errorMessage)
      })
  }
  loginUser (userData, callback) {
    return axios.post('/api/v1/auth/login', userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token)
        window.localStorage.setItem('user', res.data.id)
        this.setState({ isAuthenticated: true })
        callback(null, true)
      })
      .catch(error => callback('invalid credentials'))
  }
  logoutUser () {
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
    this.props.history.push('/')
    this.createFlashMessage('You are now logged out.')
  }
  render () {
    const {asks, isAuthenticated, flashMessages} = this.state
    return (
      <div className='App container'>
        <Header
          logoutUser={this.logoutUser}
          isAuthenticated={isAuthenticated} />
        <FlashMessages
          deleteFlashMessage={this.deleteFlashMessage}
          messages={flashMessages} />
        <Route exact path='/' render={() => (
          <AskIndex
            asks={asks}
            deleteAsk={this.deleteAsk}
            isAuthenticated={isAuthenticated}
            />
          )} />
        <Route path='/new' render={({location}) => {
          return isAuthenticated
            ? <AskForm askID={null} saveAsk={this.createAsk} />
            : <Redirect to={{
              pathname: '/login',
              state: {from: location}
            }} />
        }} />
        <Route path='/view/:id' render={({match}) => (
          isAuthenticated
          ? <AskView askID={match.params.id} />
          : <Redirect to='/login' />
        )} />
        <Route path='/edit/:id' render={({match}) => (
          isAuthenticated
          ? <AskForm askID={match.params.id} saveAsk={this.updateAsk} />
          : <Redirect to='/login' />
        )} />
        <Route path='/register' render={() => (
          isAuthenticated
          ? <Redirect to='/' />
          : <RegistrationForm
            createFlashMessage={this.createFlashMessage}
            registerUser={this.registerUser} />
        )} />
        <Route path='/login' render={({history}) => (
          isAuthenticated
          ? <Redirect to='/' />
          : <LoginForm
            createFlashMessage={this.createFlashMessage}
            loginUser={this.loginUser}
            history={history} />
        )} />
      </div>
    )
  }
}

export default App

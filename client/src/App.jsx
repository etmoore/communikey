import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import AskIndex from './AskIndex'
import AskForm from './AskForm'
import RegistrationForm from './RegistrationForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: []
    }
    this.getAllAsks = this.getAllAsks.bind(this)
    this.createAsk = this.createAsk.bind(this)
    this.updateAsk = this.updateAsk.bind(this)
    this.deleteAsk = this.deleteAsk.bind(this)
    this.registerUser = this.registerUser.bind(this)
  }
  componentWillMount () {
    this.getAllAsks()
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
      })
      .catch(err => console.error(err))
  }
  render () {
    const {asks} = this.state
    return (
      <Router>
        <div className='App container'>
          <Route exact path='/' render={() => (
            <AskIndex
              asks={asks}
              deleteAsk={this.deleteAsk} />
          )} />
          <Route path='/new' render={() => (
            <AskForm
              askID={null}
              saveAsk={this.createAsk} />
          )} />
          <Route path='/edit/:id' render={({match}) => (
            <AskForm
              askID={match.params.id}
              saveAsk={this.updateAsk} />
          )} />
          <Route path='/register' render={() => (
            <RegistrationForm registerUser={this.registerUser} />
          )} />
        </div>
      </Router>
    )
  }
}

export default App

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import AskList from './AskList'
import AskForm from './AskForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: []
    }
    this.getAllAsks = this.getAllAsks.bind(this)
    this.createAsk = this.createAsk.bind(this)
    this.deleteAsk = this.deleteAsk.bind(this)
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
  deleteAsk (askID) {
    return axios.delete(`http://localhost:3000/api/v1/asks/${askID}`)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  render () {
    const {asks} = this.state
    return (
      <Router>
        <div className='App container'>
          <Route exact path='/' render={() => (
            <AskList
              asks={asks}
              deleteAsk={this.deleteAsk}
              toggleShowForm={this.toggleShowForm} />
          )} />
          <Route path='/new' render={() => (
            <AskForm createAsk={this.createAsk} />
          )} />
        </div>
      </Router>
    )
  }
}

export default App

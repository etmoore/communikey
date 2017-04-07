import React, { Component } from 'react'
import axios from 'axios'
import AskList from './AskList'
import AskForm from './AskForm'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: [],
      showForm: false
    }
    this.toggleShowForm = this.toggleShowForm.bind(this)
    this.getAllAsks = this.getAllAsks.bind(this)
    this.createAsk = this.createAsk.bind(this)
    this.deleteAsk = this.deleteAsk.bind(this)
  }
  componentWillMount () {
    this.getAllAsks()
  }
  getAllAsks () {
    axios.get('http://localhost:3000/api/v1/asks')
      .then((res) => {
        this.setState({
          asks: res.data
        })
      })
      .catch(err => console.error(err))
  }
  createAsk (askData) {
    axios.post('http://localhost:3000/api/v1/asks', askData)
      .then(() => this.toggleShowForm())
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  deleteAsk (askID) {
    axios.delete(`http://localhost:3000/api/v1/asks/${askID}`)
      .then(() => this.getAllAsks())
      .catch(err => console.error(err))
  }
  toggleShowForm () {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  render () {
    const {asks, showForm} = this.state
    return (
      <div className='App container'>
        {
          showForm
            ? <AskForm createAsk={this.createAsk} />
            : <AskList
                asks={asks}
                deleteAsk={this.deleteAsk}
                toggleShowForm={this.toggleShowForm} />
        }
      </div>
    )
  }
}

export default App

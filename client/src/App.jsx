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
  }
  componentWillMount () {
    axios.get('http://localhost:3000/api/v1/asks')
      .then((res) => {
        this.setState({
          asks: res.data
        })
      })
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
            ? <AskForm />
            : <AskList asks={asks} toggleShowForm={this.toggleShowForm}/>
        }
      </div>
    )
  }
}

export default App

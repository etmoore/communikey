import React, { Component } from 'react'
import axios from 'axios'
import AskList from './AskList'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      asks: []
    }
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
  render () {
    const {asks} = this.state
    return (
      <div className='App'>
        <AskList asks={asks} />
      </div>
    )
  }
}

export default App

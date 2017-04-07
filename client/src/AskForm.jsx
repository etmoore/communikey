import React, { Component } from 'react'

class AskForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      start: '',
      end: '',
      location: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  render () {
    const {title, description, start, end, location} = this.state
    return (
      <div>
        <h1>Ask Form</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              className='form-control'
              id='title'
              value={title}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              name='description'
              rows='3' id='description'
              value={description}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='start'>Start</label>
            <input
              type='datetime-local'
              name='start'
              className='form-control'
              id='start'
              value={start}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='end'>End</label>
            <input
              type='datetime-local'
              name='end'
              className='form-control'
              id='end'
              value={end}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='location'
              name='location'
              className='form-control'
              id='location'
              value={location}
              onChange={this.handleInputChange} />
          </div>
        </form>
      </div>

    )
  }
}

export default AskForm

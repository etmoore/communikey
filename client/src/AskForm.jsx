import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

class AskForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'new title',
      description: 'new description',
      start: moment().format('YYYY-MM-DDTHH:mm'),
      end: moment().add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
      location: 'location, pl'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.saveAsk = this.saveAsk.bind(this)
  }
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
  saveAsk (event) {
    const askData = this.state
    this.props.createAsk(askData)
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
              id='title'
              className='form-control'
              defaultValue={title}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              rows='3'
              defaultValue={description}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='start'>Start</label>
            <input
              type='datetime-local'
              name='start'
              id='start'
              className='form-control'
              defaultValue={start}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='end'>End</label>
            <input
              type='datetime-local'
              name='end'
              id='end'
              className='form-control'
              defaultValue={end}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='location'
              name='location'
              id='location'
              className='form-control'
              defaultValue={location}
              onChange={this.handleInputChange} />
          </div>
          <Link
            to='/'
            className='btn btn-success'
            onClick={this.saveAsk}>
            Save Ask
          </Link>
        </form>
      </div>

    )
  }
}

export default AskForm

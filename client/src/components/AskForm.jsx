import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

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
    this.getAsk = this.getAsk.bind(this)
  }
  componentWillMount () {
    if (this.props.askID) {
      this.getAsk(this.props.askID)
    }
  }
  getAsk (askID) {
    axios.get(`http://localhost:3000/api/v1/asks/${askID}`)
      .then((res) => {
        const {title, description, start, end, location} = res.data
        this.setState({
          title,
          description,
          start: moment(start).format('YYYY-MM-DDTHH:mm'),
          end: moment(end).format('YYYY-MM-DDTHH:mm'),
          location
        })
      })
      .catch(err => console.log(err))
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
    const {saveAsk, askID} = this.props
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
              value={title}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              className='form-control'
              rows='3'
              value={description}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='start'>Start</label>
            <input
              type='datetime-local'
              name='start'
              className='form-control'
              value={start}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='end'>End</label>
            <input
              type='datetime-local'
              name='end'
              className='form-control'
              value={end}
              onChange={this.handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='location'
              name='location'
              className='form-control'
              value={location}
              onChange={this.handleInputChange} />
          </div>
          <Link
            to='/'
            className='btn btn-success'
            onClick={() => saveAsk(this.state, askID)}>
            Save Ask
          </Link>
        </form>
      </div>
    )
  }
}

export default AskForm

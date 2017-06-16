import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

class AskView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      title: null,
      description: null,
      start: null,
      end: null,
      location: null
    }
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
        const {id, title, description, start, end, location, user_id} = res.data
        this.setState({
          id,
          title,
          description,
          start: moment(start).format('YYYY-MM-DDTHH:mm'),
          end: moment(end).format('YYYY-MM-DDTHH:mm'),
          location,
          user_id
        })
      })
      .catch(err => console.log(err))
  }
  render () {
    const {id, title, description, start, end, location, user_id} = this.state
    const {deleteAsk, isAuthenticated, getCurrentUser} = this.props
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p><span>{start}</span><span>{end}</span></p>
        <p>{location}</p>
        <p><span>Created by </span>{user_id}</p>
        { isAuthenticated &&
          parseInt(getCurrentUser(), 10) === parseInt(user_id, 10) &&
          <button
            className='btn btn-danger'
            onClick={() => deleteAsk(id)}>
            Delete
          </button>
        }
        { isAuthenticated &&
          parseInt(getCurrentUser(), 10) === parseInt(user_id, 10) &&
          <Link
            to={`/edit/${id}`}
            className='btn btn-primary'>
            Edit
          </Link>
        }
      </div>
    )
  }
}

export default AskView

import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'

class UserProfile extends Component {
  constructor (props) {
    super(props)
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
        const {title, description, start, end, location, user_id} = res.data
        this.setState({
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
    const {title, description, start, end, location, user_id} = this.state
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p><span>{start}</span><span>{end}</span></p>
        <p>{location}</p>
        <p><span>Created by </span>{user_id}</p>
      </div>
    )
  }
}

export default UserProfile

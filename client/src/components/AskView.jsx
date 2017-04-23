import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'

class AskView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'new title',
      description: 'new description',
      start: moment().format('YYYY-MM-DDTHH:mm'),
      end: moment().add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
      location: 'location, pl'
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
  render () {
    const {title, description, start, end, location} = this.state
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p><span>{start}</span><span>{end}</span></p>
        <p>{location}</p>
      </div>
    )
  }
}

export default AskView

import React, {Component} from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'

class AskIndex extends Component {
  formatDate (date) {
    return moment(date).format('dddd, MMMM D, h:mm a')
  }
  render () {
    const {asks, deleteAsk, isAuthenticated, getCurrentUser} = this.props
    return (
      <div className='AskIndex'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {
              asks.map((ask, index) => (
                <tr key={ask.id}>
                  <td>{ask.id}</td>
                  <td>
                    { <Link to={`/view/${ask.id}`}>
                      {ask.title}
                    </Link> }
                  </td>
                  <td>{ask.description}</td>
                  <td>{this.formatDate(ask.start)}</td>
                  <td>{this.formatDate(ask.end)}</td>
                  <td>{ask.location}</td>
                  <td>
                    { isAuthenticated &&
                      parseInt(getCurrentUser(), 10) === parseInt(ask.user_id, 10) &&
                      <button
                        className='btn btn-danger'
                        onClick={() => deleteAsk(ask.id)}>
                        Delete
                      </button>
                    }
                  </td>
                  <td>
                    { isAuthenticated &&
                      parseInt(getCurrentUser(), 10) === parseInt(ask.user_id, 10) &&
                      <Link
                        to={`/edit/${ask.id}`}
                        className='btn btn-primary'>
                        Edit
                      </Link>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AskIndex

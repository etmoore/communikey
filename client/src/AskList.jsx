import React, { Component } from 'react'

class AskList extends Component {
  render () {
    const {asks} = this.props
    return (
      <div className='AskList'>
        <h1>Ask List</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {
              asks.map((ask, index) => (
                <tr key={index}>
                  <td>{ask.id}</td>
                  <td>{ask.title}</td>
                  <td>{ask.description}</td>
                  <td>{ask.start.toString()}</td>
                  <td>{ask.end.toString()}</td>
                  <td>{ask.location}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AskList

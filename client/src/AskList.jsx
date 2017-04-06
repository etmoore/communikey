import React, { Component } from 'react'

const asks = [
  {
    title: 'Moving Furniture',
    description: 'We need help moving furniture.',
    start: new Date('Sat Apr 08 2017 10:00:00 MDT'),
    end: new Date('Sat Apr 08 2017 16:00:00 MDT'),
    location: 'Loveland, CO'
  },
  {
    title: 'Charity Raffle',
    description: 'Seeking 3 volunteers to help sell tickets',
    start: new Date('Sat Apr 05 2017 17:00:00 MDT'),
    end: new Date('Sat Apr 08 2017 19:00:00 MDT'),
    location: 'Fort Collins, CO'
  },
  {
    title: 'Router Installation',
    description: 'Purchased a new router and need help setting it up',
    start: new Date('Sat Apr 15 2017 13:00:00 MDT'),
    end: new Date('Sat Apr 15 2017 18:00:00 MDT'),
    location: 'Denver, CO'
  }
]

class AskList extends Component {
  render () {
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
                  <td>id</td>
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

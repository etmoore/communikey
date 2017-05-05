import React from 'react'

function UserProfile () {
  const {firstName, lastName, email} = window.localStorage
  return (
    <div className='user-profile'>
      <p><b>First Name: </b>{firstName}</p>
      <p><b>Last Name: </b>{lastName}</p>
      <p><b>Email: </b>{email}</p>
    </div>
  )
}

export default UserProfile

import React from 'react'

const Alert = ({message, deleteFlashMessage}) => {
  return (
    <div className='alert alert-info' role='alert'>
      <button
        className='close'
        onClick={deleteFlashMessage}
        data-dismiss='alert'> &times; </button>
      {message}
    </div>
  )
}

const FlashMessages = ({messages, deleteFlashMessage}) => {
  const Alerts = messages.map((message, index) => {
    return (
      <Alert
        key={index}
        deleteFlashMessage={() => deleteFlashMessage(index)}
        message={message} />
    )
  })

  return (
    <div>
      {Alerts}
    </div>
  )
}

export default FlashMessages

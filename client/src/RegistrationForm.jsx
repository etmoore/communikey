import React from 'react'

const RegistrationForm = (props) => {
  return (
    <div>
      <h1>Register</h1>
      <form className='form-horizontal'>
        <div className='form-group'>
          <label for='firstName' className='col-sm-2 control-label'>First Name</label>
          <div className='col-sm-10'>
            <input type='text' className='form-control' id='firstName' placeholder='First Name' />
          </div>
        </div>
        <div className='form-group'>
          <label for='lastName' className='col-sm-2 control-label'>Last Name</label>
          <div className='col-sm-10'>
            <input type='text' className='form-control' id='lastName' placeholder='Last Name' />
          </div>
        </div>
        <div className='form-group'>
          <label for='email' className='col-sm-2 control-label'>Email</label>
          <div className='col-sm-10'>
            <input type='email' className='form-control' id='email' placeholder='Email' />
          </div>
        </div>
        <div className='form-group'>
          <label for='password' className='col-sm-2 control-label'>Password</label>
          <div className='col-sm-10'>
            <input type='password' className='form-control' id='password' placeholder='Password' />
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <button type='submit' className='btn btn-default'>Sign up</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm

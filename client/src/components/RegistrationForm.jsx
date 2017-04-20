import React, {Component} from 'react'

class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: 'Sharla',
      lastName: 'Castro',
      email: 'sharla@example.com',
      password: 'challenger'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
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
    const {firstName, lastName, email, password} = this.state
    const {registerUser} = this.props
    return (
      <div>
        <h1>Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            registerUser(this.state)
          }}
          className='form-horizontal'>
          <div className='form-group'>
            <label
              htmlFor='firstName'
              className='col-sm-2 control-label'>
              First Name
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='firstName'
                value={firstName}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <label
              htmlFor='lastName'
              className='col-sm-2 control-label'>
              Last Name
            </label>
            <div className='col-sm-10'>
              <input
                type='text'
                className='form-control'
                id='lastName'
                value={lastName}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <label
              htmlFor='email'
              className='col-sm-2 control-label'>
              Email
            </label>
            <div className='col-sm-10'>
              <input
                type='email'
                className='form-control'
                id='email'
                value={email}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <label
              htmlFor='password'
              className='col-sm-2 control-label'>
              Password
            </label>
            <div className='col-sm-10'>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                type='submit'
                className='btn btn-default'>
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default RegistrationForm

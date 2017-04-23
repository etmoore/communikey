import React, {Component} from 'react'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'testuser@example.com',
      password: 'testuser123'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  submitForm (e) {
    e.preventDefault()
    this.props.loginUser(this.state)
    this.props.history.push('/')
  }

  render () {
    const {email, password} = this.state
    return (
      <div className='login-form'>
        <h1>Login</h1>
        <form
          onSubmit={this.submitForm}
          className='form-horizontal'>
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
                name='email'
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
                name='password'
                value={password}
                onChange={this.handleInputChange} />
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                type='submit'
                className='btn btn-default'>
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm

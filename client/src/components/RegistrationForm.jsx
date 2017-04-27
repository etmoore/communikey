import React, {Component} from 'react'
import _ from 'lodash'

class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      firstName: 'Sharla',
      lastName: 'Castro',
      email: 'sharla@example.com',
      password: 'challenger',
      passwordConfirmation: 'challenger'
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this)
  }
  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  onSubmit (event) {
    event.preventDefault()
    this.props.registerUser(this.state, (errorMessage) => {
      if (errorMessage === 'passwords do not match') {
        this.setState({
          errors: { passwordConfirmation: 'passwords do not match' }
        })
      } else {
        this.props.createFlashMessage(errorMessage, 'error')
      }
    })
  }
  confirmPasswordMatch (event) {
    const password = document.getElementById('password').value
    const passwordConfirmation = event.target.value
    if (password !== passwordConfirmation) {
      this.setState({
        errors: { passwordConfirmation: 'passwords do not match' }
      })
    } else {
      const errorsState = _.omit(this.state.errors, 'passwordConfirmation')
      this.setState({
        errors: errorsState
      })
    }
  }
  render () {
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      errors
    } = this.state
    return (
      <div>
        <h1>Register</h1>
        <form
          onSubmit={(event) => {
            this.onSubmit(event)
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
                name='firstName'
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
                name='lastName'
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
          <div className={`form-group ${errors.passwordConfirmation && 'has-error'}`}>
            <label
              htmlFor='password-confirmation'
              className='col-sm-2 control-label'>
              Confirm Password
            </label>
            <div className='col-sm-10'>
              <input
                type='password'
                className='form-control'
                id='password-confirmation'
                name='passwordConfirmation'
                value={passwordConfirmation}
                onBlur={this.confirmPasswordMatch}
                onChange={this.handleInputChange} />
              {errors.passwordConfirmation && <span className='error-text'>{errors.passwordConfirmation}</span>}
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                disabled={_.isEmpty(errors) ? '' : 'disabled'}
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

function saveUserData (data) {
  window.localStorage.setItem('authToken', data.token)
  window.localStorage.setItem('userID', data.user.id)
  window.localStorage.setItem('firstName', data.user.firstName)
  window.localStorage.setItem('lastName', data.user.lastName)
  window.localStorage.setItem('email', data.user.email)
}

export {
  saveUserData
}

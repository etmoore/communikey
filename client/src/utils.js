function saveUserData (data) {
  window.localStorage.setItem('authToken', data.token)
  window.localStorage.setItem('userID', data.user.id)
  window.localStorage.setItem('userFirstName', data.user.firstName)
  window.localStorage.setItem('userLastName', data.user.lastName)
  window.localStorage.setItem('userEmail', data.user.email)
}

export {
  saveUserData
}

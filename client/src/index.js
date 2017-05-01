import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App.jsx'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

if (window.localStorage.authToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.authToken}`
} else {
  delete axios.defaults.headers.common['Authorization']
}

const Foo = (
  <Router>
    <Route component={App} />
  </Router>
)

ReactDOM.render(
  Foo,
  document.getElementById('root')
)

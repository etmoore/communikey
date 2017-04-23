import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Foo = (
  <Router>
    <Route component={App} />
  </Router>
)

ReactDOM.render(
  Foo,
  document.getElementById('root')
)

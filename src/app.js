'use strict'

import React from 'react'
import { hot } from 'react-hot-loader'

import style from './sass/app.scss'
import reactLogo from './images/react-logo.svg'

class App extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <img src={reactLogo} width='40px' height='40px' />
        My App
      </div>
    )
  }
}

export default hot(module)(App)

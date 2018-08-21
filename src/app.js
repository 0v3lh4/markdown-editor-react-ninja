'use strict'

import React from 'react'
import './sass/app.scss'
import MarkdownEditor from './components/markdown-editor'

import { hot } from 'react-hot-loader'
import marked from 'marked'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.getMarkup = this.getMarkup.bind(this)

    import('highlight.js').then(hljs => {
      marked.setOptions({
        highlight: (code) => hljs.highlightAuto(code).value
      })
    })
  }

  getMarkup () {
    return { __html: marked(this.state.value) }
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    return (
      <MarkdownEditor
        value={this.state.value}
        handleChange={this.handleChange}
        getMarkup={this.getMarkup} />
    )
  }
}

export default hot(module)(App)

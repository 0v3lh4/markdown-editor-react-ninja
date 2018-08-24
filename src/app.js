'use strict'

import React from 'react'
import 'sass/app.scss'
import MarkdownEditor from 'components/markdown-editor'

import { hot } from 'react-hot-loader'
import marked from 'marked'

import('highlight.js').then(hljs => {
  marked.setOptions({
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code).value
      }
      return hljs.highlightAuto(code).value
    }
  })
})

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      value: '',
      isSaving: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.getMarkup = this.getMarkup.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  getMarkup () {
    return { __html: marked(this.state.value) }
  }

  handleSave () {
    if (this.state.isSaving) {
      localStorage.setItem('md', this.state.value)
      this.setState({ isSaving: false })
    }
  }

  handleRemove () {
    localStorage.removeItem('md')
    this.setState({ value: '' })
  }

  handleChange (e) {
    this.setState({
      value: e.target.value,
      isSaving: true
    })
  }

  componentDidMount () {
    this.setState({ value: localStorage.getItem('md') || '' })
  }

  componentDidUpdate () {
    clearTimeout(this.timer)
    this.timer = setTimeout(this.handleSave, 1000)
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
  }

  render () {
    console.log('aqui')
    return (
      <MarkdownEditor
        value={this.state.value}
        isSaving={this.state.isSaving}
        handleChange={this.handleChange}
        handleRemove={this.handleRemove}
        getMarkup={this.getMarkup} />
    )
  }
}

export default hot(module)(App)

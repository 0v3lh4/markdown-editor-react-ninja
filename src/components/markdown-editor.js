'use strict'

import React from 'react'

import './markdown-editor.scss'

const MarkdownEditor = ({ value, handleChange, getMarkup }) => (
  <div className='editor'>
    <textarea name='textarea' value={value} onChange={handleChange} autoFocus />
    <div className='view' dangerouslySetInnerHTML={getMarkup()} />
  </div>
)

export default MarkdownEditor

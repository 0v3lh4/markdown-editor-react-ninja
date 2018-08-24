'use strict'

import React from 'react'
import MarkdownEditorHeader from './markdown-editor-header'

import './markdown-editor.scss'

const MarkdownEditor = ({ value, handleChange, getMarkup, isSaving, handleRemove }) => (
  <section className='editor'>
    <MarkdownEditorHeader onRemove={handleRemove} isSaving={isSaving} />
    <textarea name='textarea' value={value} onChange={handleChange} autoFocus />
    <article className='view' dangerouslySetInnerHTML={getMarkup()} />
  </section>
)

export default MarkdownEditor

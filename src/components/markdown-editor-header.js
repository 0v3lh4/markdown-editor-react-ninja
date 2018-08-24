'use strict'

import React from 'react'

const MarkdownEditorHeader = ({ isSaving, onRemove }) => (
  <header className='editor-header'>
    <p className='save-message'>
      {isSaving ? 'Salvando...' : 'Salvo!'}
    </p>
    <button onClick={onRemove}>Remover</button>
  </header>
)

export default MarkdownEditorHeader

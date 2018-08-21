import React, { Component } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role='img' aria-label='so cool'>
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('Async/Await', module)
  .add('with Title async / await', () => {
    class App extends Component {
      constructor () {
        super()

        this.state = {
          title: '...'
        }
      }

      getTitle () {
        return new Promise((resolve, reject) => {
          this.timer = setTimeout(() => {
            resolve('Title with async / await')
          }, 3000)
        })
      }

      async componentWillMount () {
        this.setState({ title: await this.getTitle() })
      }

      componentWillUnmount () {
        clearTimeout(this.timer)
      }

      render () {
        return (
          <div>
            <Button>{ this.state.title }</Button>
          </div>
        )
      }
    }

    return <App />
  })

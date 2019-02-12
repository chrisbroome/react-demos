import Router from 'next/router'
import React from 'react'
import App, {Container} from 'next/app'
import styles from './_app.css'

// hack to get css loading to work correctly in development mode
const initializeCssSSRHack = () => {
  if (process.env.NODE_ENV !== 'production') {
    Router.events.on('routeChangeComplete', () => {
      const el = document.querySelector('link[href*="/_next/static/css/styles.chunk.css"]')
      if (!el) return
      el.href = '/_next/static/css/styles.chunk.css?v=' + new Date().valueOf()
    })
  }
}

initializeCssSSRHack()

export default class MyApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }

  render() {
    const {Component, pageProps} = this.props

    return (
      <Container>
        <div className={styles.appContainer}>
          <Component {...pageProps} />
        </div>
      </Container>
    )
  }
}

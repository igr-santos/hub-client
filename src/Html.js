import React, {Component, PropTypes} from 'react'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'
import DocumentMeta from 'react-document-meta'
import Raven from 'raven-js'
Raven
    .config('https://27ca3f291894466997ae1a5c78b70673@app.getsentry.com/86009')
    .install()

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.object,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props
    const content = ReactDOMServer.renderToString(component)

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          { DocumentMeta.renderAsReact() }
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script src="/wysihtml/wysihtml-toolbar.min.js" />
          <script src="/wysihtml/advanced_and_extended.js" />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script src={assets.javascript.main}/>
        </body>
      </html>
    )
  }
}

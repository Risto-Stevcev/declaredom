import { div, h3, span, fragment, text, br, button } from '.'

document.body.appendChild(
  div([
    h3('Declarative syntax'),
    span('For DOM Elements'),
    // this is a document fragment
    fragment([
      br(),
      text('This is a text node'),
      br()
    ]),
    button({ onClick: console.log }, 'Click me')
  ])
)

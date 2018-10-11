# declaredom

## Installation

`npm install --save declaredom`


## Usage

```js
import { div, h3, span, br, button } from 'declaredom'

document.body.appendChild(
  div([
    h3('Declarative syntax'),
    span('For DOM Elements'),
    br(),
    button({ onClick: console.log }, 'Click me')
  ])
)
```

## API

The API is very similar to [r-dom][1]'s, except that it returns real `HTMLElement`s

This doc assumes the library uses the default import as `import d from 'declaredom'`. The function is variadic:

#### `d[tagName]([innerText])`

Returns an [HTMLElement][2]

- **tagName** `String` - An HTMLElement tag name
- **innerText** `String` - The innerText of the element


#### `d[tagName]([children])`

Returns an [HTMLElement][2]

- **tagName** `String` - An HTMLElement tag name
- **children** `Array[HTMLElement]` - An array of HTMLElements


#### `d[tagName]([properties], [innerText])`

Returns an [HTMLElement][2]

- **tagName** `String` - An HTMLElement tag name
- **properties** `Object` - An object with property/value pairs
- **innerText** `String` - The innerText of the element


#### `d[tagName]([properties], [children])`

Returns an [HTMLElement][2]

- **tagName** `String` - An HTMLElement tag name
- **properties** `Object` - An object with property/value pairs
- **children** `Array[HTMLElement]` - An array of HTMLElements

Declaredom also supports text nodes and document fragments:

```js
import { div, span, fragment, text, br } from 'declaredom'

document.body.appendChild(
  div([
    span('foobar'),
    // this is a document fragment
    fragment([
      br(),
      text('This is a text node'),
      br()
    ]),
    span('bazqux')
  ])
)
```


### Argument Examples

- **properties**
  - `{ id: 'foo', style: { fontSize: '12px' }, className: 'bar', classSet: { toggled: true } }`

- **children**
  - `[span('foo'), span('bar'), span('baz')]`


[1]: https://github.com/uber/r-dom
[2]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

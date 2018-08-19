# declaredom

## Installation

`npm install declaredom`

## Usage

```js
const declaredom = require('declaredom')

const element = declaredom({
  tagName: 'div',
  id: 'foo',
  className: 'bar',
  children: [
    tagName: 'section',
    style: { borderBottom: '5px' },
    children: [
      { tagName: 'span', text: 'hello world' }
    ]
  ]
})

document.body.appendChild(element)
```

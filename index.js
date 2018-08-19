const declaredom = declaration =>
  Object.entries(declaration).reduce((element, [attribute, value]) => {
    switch (attribute) {
      case 'tagName': break
      case 'id': element.id = value ;break
      case 'className': element.className = value ;break
      case 'text': element.innerText = value ;break
      case 'style':
        Object.entries(value).forEach(([property, value]) => {
          element.style[property] = value
        }) ;break
      case 'children':
        element.appendChild(
          value.map(declaredom).reduce((fragment, child) => {
            fragment.appendChild(child)
            return fragment
          }, document.createDocumentFragment())
        ) ;break
      default: element.setAttribute(attribute, value)
    }
    return element
  }, document.createElement(declaration.tagName))

module.exports = declaredom

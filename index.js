const isNode = x => x instanceof Node

const isAttributes = x => !(x instanceof Array) && x instanceof Object
    , isEmptyAttrs = x => isAttributes(x) && Object.keys(x).length === 0
    , isChildren   = x => x instanceof Array && x.every(item => isNode(item))
    , isText       = x => typeof x === 'string'
    , isNone       = x => x === undefined || x === 0

const getArgs = (arg1, arg2) =>
  isNone(arg1) && isNone(arg2) ?
  { attributes: {}, children: [] } :
  isChildren(arg1) && isNone(arg2) ?
  { attributes: {}, children: arg1 } :
  isAttributes(arg1) && isNone(arg2) ?
  { attributes: arg1, children: [] } :
  isText(arg1) && isNone(arg2) ?
  { attributes: {}, children: [document.createTextNode(arg1)] } :
  isAttributes(arg1) && isText(arg2) ?
  { attributes: arg1, children: [document.createTextNode(arg2)] } :
  isAttributes(arg1) && isChildren(arg2) ?
  { attributes: arg1, children: arg2 } : null

const getText = (arg1, arg2) =>
  isText(arg1) && isNone(arg2) ? arg1 :
  isEmptyAttrs(arg1) && isText(arg2) ? arg2 : null

const getChildrenOnly = (arg1, arg2) =>
  isChildren(arg1) && isNone(arg2) ?
  { attributes: {}, children: arg1 } :
  isEmptyAttrs(arg1) && isChildren(arg2) ?
  { attributes: {}, children: arg2 } : null

const setAttribute = (element, key) => value => {
  switch (key) {
    case 'id': element.id = value ;break
    case 'className':
    case 'class_name':
      element.className = value ;break
    case 'classSet':
    case 'class_set':
      element.className = [element.className.trim()].concat(
        Object.entries(value)
          .map(([className, isIncluded]) => isIncluded ? className : '')
      ).filter(e => !!e).join(' ') ;break
    case "dataset":
      Object.entries(value).forEach(([key, value]) => {
        element.dataset[key] = value
      }) ;break
    case 'style':
      Object.entries(value).forEach(([property, value]) => {
        element.style[property] = value
      }) ;break
    case 'contentEditable':
      element.contentEditable = value ? 'true' : 'false' ;break
    default:
      if (key.startsWith('on'))
        element.addEventListener(key.replace(/^on[_]{0,1}/, '').toLowerCase(), value)
      else
        element.setAttribute(key.replace(/_/g, '-'), value)
  }
}

const setAttributes = element => attributes => {
  for (let [key, value] of Object.entries(attributes))
    setAttribute(element, key)(value)
}

const setChildren = element => children => {
  const fragment = document.createDocumentFragment()

  for (let child of children)
    fragment.appendChild(child)

  element.appendChild(fragment)
}

const createNode = (tagName, { attributes, children }) => {
  const node = tagName === 'fragment' ?
    document.createDocumentFragment() :
    document.createElement(tagName)

  setAttributes(node)(attributes)
  setChildren(node)(children)

  return node
}

const createTextNode = (_, text) => document.createTextNode(text)

const _element = (tagName, arg1, arg2) => {
  const constructor = tagName === 'text' ? createTextNode : createNode
  const args = tagName === 'text' ? getText(arg1, arg2) :
    tagName === 'fragment' ? getChildrenOnly(arg1, arg2) : getArgs(arg1, arg2)

  if (args === null) throw new Error('Invalid arguments passed to declaredom')
  return constructor(tagName, args)
}


export function element(tagName, arg1, arg2) { return _element(tagName, arg1, arg2); }

export function a(arg1, arg2) { return _element('a', arg1, arg2); }
export function abbr(arg1, arg2) { return _element('abbr', arg1, arg2); }
export function acronym(arg1, arg2) { return _element('acronym', arg1, arg2); }
export function address(arg1, arg2) { return _element('address', arg1, arg2); }
export function applet(arg1, arg2) { return _element('applet', arg1, arg2); }
export function area(arg1, arg2) { return _element('area', arg1, arg2); }
export function article(arg1, arg2) { return _element('article', arg1, arg2); }
export function aside(arg1, arg2) { return _element('aside', arg1, arg2); }
export function audio(arg1, arg2) { return _element('audio', arg1, arg2); }
export function b(arg1, arg2) { return _element('b', arg1, arg2); }
export function base(arg1, arg2) { return _element('base', arg1, arg2); }
export function basefont(arg1, arg2) { return _element('basefont', arg1, arg2); }
export function bdo(arg1, arg2) { return _element('bdo', arg1, arg2); }
export function bgsound(arg1, arg2) { return _element('bgsound', arg1, arg2); }
export function big(arg1, arg2) { return _element('big', arg1, arg2); }
export function blink(arg1, arg2) { return _element('blink', arg1, arg2); }
export function blockquote(arg1, arg2) { return _element('blockquote', arg1, arg2); }
export function body(arg1, arg2) { return _element('body', arg1, arg2); }
export function br(arg1, arg2) { return _element('br', arg1, arg2); }
export function button(arg1, arg2) { return _element('button', arg1, arg2); }
export function canvas(arg1, arg2) { return _element('canvas', arg1, arg2); }
export function caption(arg1, arg2) { return _element('caption', arg1, arg2); }
export function center(arg1, arg2) { return _element('center', arg1, arg2); }
export function cite(arg1, arg2) { return _element('cite', arg1, arg2); }
export function code(arg1, arg2) { return _element('code', arg1, arg2); }
export function col(arg1, arg2) { return _element('col', arg1, arg2); }
export function colgroup(arg1, arg2) { return _element('colgroup', arg1, arg2); }
export function command(arg1, arg2) { return _element('command', arg1, arg2); }
export function datalist(arg1, arg2) { return _element('datalist', arg1, arg2); }
export function dd(arg1, arg2) { return _element('dd', arg1, arg2); }
export function del(arg1, arg2) { return _element('del', arg1, arg2); }
export function details(arg1, arg2) { return _element('details', arg1, arg2); }
export function dfn(arg1, arg2) { return _element('dfn', arg1, arg2); }
export function div(arg1, arg2) { return _element('div', arg1, arg2); }
export function dl(arg1, arg2) { return _element('dl', arg1, arg2); }
export function dt(arg1, arg2) { return _element('dt', arg1, arg2); }
export function em(arg1, arg2) { return _element('em', arg1, arg2); }
export function embed(arg1, arg2) { return _element('embed', arg1, arg2); }
export function fieldset(arg1, arg2) { return _element('fieldset', arg1, arg2); }
export function figcaption(arg1, arg2) { return _element('figcaption', arg1, arg2); }
export function figure(arg1, arg2) { return _element('figure', arg1, arg2); }
export function font(arg1, arg2) { return _element('font', arg1, arg2); }
export function footer(arg1, arg2) { return _element('footer', arg1, arg2); }
export function form(arg1, arg2) { return _element('form', arg1, arg2); }
export function frame(arg1, arg2) { return _element('frame', arg1, arg2); }
export function frameset(arg1, arg2) { return _element('frameset', arg1, arg2); }
export function h1(arg1, arg2) { return _element('h1', arg1, arg2); }
export function h2(arg1, arg2) { return _element('h2', arg1, arg2); }
export function h3(arg1, arg2) { return _element('h3', arg1, arg2); }
export function h4(arg1, arg2) { return _element('h4', arg1, arg2); }
export function h5(arg1, arg2) { return _element('h5', arg1, arg2); }
export function h6(arg1, arg2) { return _element('h6', arg1, arg2); }
export function head(arg1, arg2) { return _element('head', arg1, arg2); }
export function header(arg1, arg2) { return _element('header', arg1, arg2); }
export function hgroup(arg1, arg2) { return _element('hgroup', arg1, arg2); }
export function hr(arg1, arg2) { return _element('hr', arg1, arg2); }
export function html(arg1, arg2) { return _element('html', arg1, arg2); }
export function i(arg1, arg2) { return _element('i', arg1, arg2); }
export function iframe(arg1, arg2) { return _element('iframe', arg1, arg2); }
export function img(arg1, arg2) { return _element('img', arg1, arg2); }
export function input(arg1, arg2) { return _element('input', arg1, arg2); }
export function ins(arg1, arg2) { return _element('ins', arg1, arg2); }
export function isindex(arg1, arg2) { return _element('isindex', arg1, arg2); }
export function kbd(arg1, arg2) { return _element('kbd', arg1, arg2); }
export function keygen(arg1, arg2) { return _element('keygen', arg1, arg2); }
export function label(arg1, arg2) { return _element('label', arg1, arg2); }
export function legend(arg1, arg2) { return _element('legend', arg1, arg2); }
export function li(arg1, arg2) { return _element('li', arg1, arg2); }
export function link(arg1, arg2) { return _element('link', arg1, arg2); }
export function listing(arg1, arg2) { return _element('listing', arg1, arg2); }
export function map(arg1, arg2) { return _element('map', arg1, arg2); }
export function mark(arg1, arg2) { return _element('mark', arg1, arg2); }
export function marquee(arg1, arg2) { return _element('marquee', arg1, arg2); }
export function math(arg1, arg2) { return _element('math', arg1, arg2); }
export function menu(arg1, arg2) { return _element('menu', arg1, arg2); }
export function meta(arg1, arg2) { return _element('meta', arg1, arg2); }
export function meter(arg1, arg2) { return _element('meter', arg1, arg2); }
export function nav(arg1, arg2) { return _element('nav', arg1, arg2); }
export function nextid(arg1, arg2) { return _element('nextid', arg1, arg2); }
export function nobr(arg1, arg2) { return _element('nobr', arg1, arg2); }
export function noembed(arg1, arg2) { return _element('noembed', arg1, arg2); }
export function noframes(arg1, arg2) { return _element('noframes', arg1, arg2); }
export function noscript(arg1, arg2) { return _element('noscript', arg1, arg2); }
export function object(arg1, arg2) { return _element('object', arg1, arg2); }
export function ol(arg1, arg2) { return _element('ol', arg1, arg2); }
export function optgroup(arg1, arg2) { return _element('optgroup', arg1, arg2); }
export function option(arg1, arg2) { return _element('option', arg1, arg2); }
export function output(arg1, arg2) { return _element('output', arg1, arg2); }
export function p(arg1, arg2) { return _element('p', arg1, arg2); }
export function param(arg1, arg2) { return _element('param', arg1, arg2); }
export function plaintext(arg1, arg2) { return _element('plaintext', arg1, arg2); }
export function pre(arg1, arg2) { return _element('pre', arg1, arg2); }
export function progress(arg1, arg2) { return _element('progress', arg1, arg2); }
export function q(arg1, arg2) { return _element('q', arg1, arg2); }
export function rp(arg1, arg2) { return _element('rp', arg1, arg2); }
export function rt(arg1, arg2) { return _element('rt', arg1, arg2); }
export function ruby(arg1, arg2) { return _element('ruby', arg1, arg2); }
export function s(arg1, arg2) { return _element('s', arg1, arg2); }
export function samp(arg1, arg2) { return _element('samp', arg1, arg2); }
export function script(arg1, arg2) { return _element('script', arg1, arg2); }
export function section(arg1, arg2) { return _element('section', arg1, arg2); }
export function select(arg1, arg2) { return _element('select', arg1, arg2); }
export function small(arg1, arg2) { return _element('small', arg1, arg2); }
export function source(arg1, arg2) { return _element('source', arg1, arg2); }
export function spacer(arg1, arg2) { return _element('spacer', arg1, arg2); }
export function span(arg1, arg2) { return _element('span', arg1, arg2); }
export function strike(arg1, arg2) { return _element('strike', arg1, arg2); }
export function strong(arg1, arg2) { return _element('strong', arg1, arg2); }
export function style(arg1, arg2) { return _element('style', arg1, arg2); }
export function sub(arg1, arg2) { return _element('sub', arg1, arg2); }
export function sup(arg1, arg2) { return _element('sup', arg1, arg2); }
export function summary(arg1, arg2) { return _element('summary', arg1, arg2); }
export function svg(arg1, arg2) { return _element('svg', arg1, arg2); }
export function table(arg1, arg2) { return _element('table', arg1, arg2); }
export function tbody(arg1, arg2) { return _element('tbody', arg1, arg2); }
export function td(arg1, arg2) { return _element('td', arg1, arg2); }
export function textarea(arg1, arg2) { return _element('textarea', arg1, arg2); }
export function tfoot(arg1, arg2) { return _element('tfoot', arg1, arg2); }
export function th(arg1, arg2) { return _element('th', arg1, arg2); }
export function thead(arg1, arg2) { return _element('thead', arg1, arg2); }
export function time(arg1, arg2) { return _element('time', arg1, arg2); }
export function title(arg1, arg2) { return _element('title', arg1, arg2); }
export function tr(arg1, arg2) { return _element('tr', arg1, arg2); }
export function track(arg1, arg2) { return _element('track', arg1, arg2); }
export function tt(arg1, arg2) { return _element('tt', arg1, arg2); }
export function u(arg1, arg2) { return _element('u', arg1, arg2); }
export function ul(arg1, arg2) { return _element('ul', arg1, arg2); }
export function var_(arg1, arg2) { return _element('var', arg1, arg2); }
export function video(arg1, arg2) { return _element('video', arg1, arg2); }
export function wbr(arg1, arg2) { return _element('wbr', arg1, arg2); }
export function xmp(arg1, arg2) { return _element('xmp', arg1, arg2); }

/* Other node types */
export function text(arg1, arg2) { return _element('text', arg1, arg2); }
export function fragment(arg1, arg2) { return _element('fragment', arg1, arg2); }

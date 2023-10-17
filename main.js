import './style.css'
// import { encode, decode } from 'js-base64'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { emmetHTML } from 'emmet-monaco-es'

const $ = selector => document.querySelector(selector)

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'typesctipt' || label === 'javascript') return new JsWorker()
  }
}

const $html = $('#html')
const $css = $('#css')
const $js = $('#js')

const initialEditorState = {
  html: `
      <html>
      <head>
        <title>Document</title>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
      </html>
  `,
  css: `* { background-color: white; }`,
  js: `console.log('Hello World')`
}

const html = initialEditorState.html
const css = initialEditorState.css
const js = initialEditorState.js

const CommonEditorSettings = {
  minimap: {
    enabled: true
  },
  lineNumbers: "on",  
  theme: 'vs-dark',
  fontFamily: 'Consolas',
  fontSize: 18,
  fontLigatures: true,
  tabSize: 2,
  wordWrap: 'on',
  useTabStops: true,
  tabCompletion: true
}

// Crear editores y actulizar editores
const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: 'html',
  ...CommonEditorSettings
})

const cssEditor = monaco.editor.create($css, {
  value: css,
  language: 'css',
  ...CommonEditorSettings
})

const jsEditor = monaco.editor.create($js, {
  value: js,
  language: 'javascript',
  ...CommonEditorSettings
})

htmlEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)

// Agregar Emmet
emmetHTML(monaco, ['html', 'css', 'js']);

// Función para actualizar la vista previa
const htmlPreview = createHtml({ html, css, js })
$('iframe').setAttribute('srcdoc', htmlPreview)

function update() {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()
  const htmlPreview = createHtml({ html, css, js })
  $('iframe').setAttribute('srcdoc', htmlPreview)
}

// Función para generar la vista previa
function createHtml({ html, css, js }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>${js}</script>
    </body>
    </html>
  `;
}
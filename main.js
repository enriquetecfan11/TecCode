import './style.css'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// Configurar workers de Monaco
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new jsonWorker()
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker()
    if (label === 'typescript' || label === 'javascript') return new tsWorker()
    return new editorWorker()
  }
}

// Configuración mejorada para los editores
const editorOptions = {
  theme: 'vs-dark',
  fontSize: 16,
  padding: { top: 16 },
  minimap: { enabled: true },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  roundedSelection: true,
  occurrencesHighlight: true,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: true,
  smoothScrolling: true,
  bracketPairColorization: {
    enabled: true
  },
  formatOnPaste: true,
  formatOnType: true,
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  suggest: {
    preview: true
  }
}

// Crear los editores con la nueva configuración
const htmlEditor = monaco.editor.create(document.getElementById('html'), {
  ...editorOptions,
  language: 'html',
  value: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>'
})

const cssEditor = monaco.editor.create(document.getElementById('css'), {
  ...editorOptions,
  language: 'css',
  value: 'body {\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #007acc;\n}'
})

const jsEditor = monaco.editor.create(document.getElementById('js'), {
  ...editorOptions,
  language: 'javascript',
  value: 'document.addEventListener("DOMContentLoaded", () => {\n  console.log("Hello from Monaco!");\n});'
})

// Manejo de pestañas
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Desactivar todas las pestañas y editores
    document.querySelectorAll('.tab, .editor').forEach(el => {
      el.classList.remove('active')
    })

    // Activar la pestaña seleccionada y su editor
    tab.classList.add('active')
    const editorId = tab.id.replace('-tab', '')
    document.getElementById(editorId).classList.add('active')
  })
})

// Función de actualización de la vista previa
function updatePreview() {
  const html = htmlEditor.getValue()
  const css = cssEditor.getValue()
  const js = jsEditor.getValue()

  const preview = document.getElementById('preview')
  preview.srcdoc = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
    `
}

// Actualizar la vista previa cuando cambie el contenido
htmlEditor.onDidChangeModelContent(updatePreview)
cssEditor.onDidChangeModelContent(updatePreview)
jsEditor.onDidChangeModelContent(updatePreview)

// Actualización inicial
updatePreview()

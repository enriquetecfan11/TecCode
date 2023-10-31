import './style.css'
import * as monaco from 'monaco-editor'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { emmetHTML } from 'emmet-monaco-es'

// Función auxiliar para seleccionar elementos del DOM
const $ = selector => document.querySelector(selector)

// Configuración del entorno de Monaco
window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'html') return new HtmlWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'typesctipt' || label === 'javascript') return new JsWorker()
  }
}

// Estado inicial del editor
const initialEditorState = {
  html: `
    
    <!------ Replace this code and your own // Quita este codigo y programa el tuyo------>
    
    <!DOCTYPE html>
    <html>
    <body style="margin:0">
      <canvas id="myCanvas" style="width:100%; height:100%"></canvas>
    </body>
    </html>
  `,
  css: `
  
  /* Replace this code and your own // Quita este codigo y programa el tuyo */

  * { 
    background-color: dark; 
  }`,
  js: `
  
  
  //Replace this code and your own // Quita este codigo y programa el tuyo
  
  
  //-------------------------------------------------------------

  // Obtener el canvas y establecer su tamaño
var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

// Crear un array para almacenar las bolas
var balls = [];

// Crear 10 bolas con posiciones y velocidades aleatorias
for(var i = 0; i < 25; i++) {
    balls[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10
    };
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < balls.length; i++) {
        var ball = balls[i];
        drawBall(ball);
        
        if(ball.x + ball.dx > canvas.width-10 || ball.x + ball.dx < 10) {
            ball.dx = -ball.dx;
        }
        if(ball.y + ball.dy > canvas.height-10 || ball.y + ball.dy < 10) {
            ball.dy = -ball.dy;
        }
        
        ball.x += ball.dx;
        ball.y += ball.dy;
    }
}

setInterval(draw, 10);
`
}

// Crear los editores de Monaco
const htmlEditor = monaco.editor.create($('#html'), {
  value: initialEditorState.html,
  language: 'html',
  theme: 'vs-dark', 
  automaticLayout: true,
  autoIndent: true,
  autoClosingBrackets: true,
})

const cssEditor = monaco.editor.create($('#css'), {
  value: initialEditorState.css,
  language: 'css',

})

const jsEditor = monaco.editor.create($('#js'), {
  value: initialEditorState.js,
  language: 'javascript',
})

// Actualizar la vista previa cuando cambia el contenido del editor
htmlEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)

// Agregar soporte para Emmet
emmetHTML(monaco);

// Actualizar la vista previa inicial
update()

function update() {
  const htmlPreview = createHtml({
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue()
  })
  
 $('iframe').setAttribute('srcdoc', htmlPreview)
}

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
      ${html}
      <script>${js}</script>
    </body>
    </html>
  `;
}


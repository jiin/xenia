// xenia
import Main from './core/main'
import Detector from 'three/examples/js/Detector'

function init () {
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage()
  } else {
    const canvas = document.getElementById('webgl-canvas')
    let main = new Main(canvas)

    console.log('[XENIA v001] 🍌🍌🍌🍌 HAVE FUN! 🍌🍌🍌🍌')
  }
}

document.addEventListener('DOMContentLoaded', () => init(), false)

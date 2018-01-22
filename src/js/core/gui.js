import * as THREE from 'three'

const dat = require('dat.gui')

export default class GUI {
  constructor () {
    this._gui = new dat.GUI({ name: 'Control GUI' })

    this._styleFolder = this._gui.addFolder('Style Fields')
    this._positionFolder = this._gui.addFolder('Position Fields')
  }

  addColor (rootObject, field, defaultColor) {
    let conf = { color: defaultColor }

    let colorControl = this._styleFolder.addColor(conf, 'color')

    colorControl.onChange((value) => {
      var colorObject = new THREE.Color().setStyle(value)
      rootObject.color = colorObject
    })
  }

  addPosition (target) {
    this._positionFolder.add(target.position, 'x', -10, 10).step(0.1)
    this._positionFolder.add(target.position, 'y', -10, 10).step(0.1)
    this._positionFolder.add(target.position, 'z', -10, 10).step(0.1)
  }

  update () {
    // this._control.update()
  }
}

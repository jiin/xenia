import * as THREE from 'three'

window.THREE = THREE

import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

export default class Postprocessing {
  constructor (settings) {
    // When you've made your scene, create your composer and first RenderPass
    this._composer = new EffectComposer(settings.renderer)
    this._composer.addPass(new RenderPass(settings.scene, settings.camera))

    // Add shaders! Celebrate!
    // const someShaderPass = new ShaderPass(SomeShader)
    // this._composer.addPass(someShaderPass)

    // And draw to the screen
    const copyPass = new ShaderPass(CopyShader)
    copyPass.renderToScreen = true
    this._composer.addPass(copyPass)
  }

  render () {
    this._composer.render()
  }
}

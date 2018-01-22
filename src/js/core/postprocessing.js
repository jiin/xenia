import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

export default class Postprocessing {
  constructor (settings) {
    this._composer = new EffectComposer(settings.renderer)
    this._composer.addPass(new RenderPass(settings.scene, settings.camera))

    // const someShaderPass = new ShaderPass(SomeShader)
    // this._composer.addPass(someShaderPass)

    const copyPass = new ShaderPass(CopyShader)
    copyPass.renderToScreen = true
    this._composer.addPass(copyPass)
  }

  render () {
    this._composer.render()
  }
}

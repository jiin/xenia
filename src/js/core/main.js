import * as THREE from 'three'

import OrbitControls from 'orbit-controls-es6'

// import PostProcessing from './postprocessing'

export default class Main {
  constructor (canvas) {
    this._canvas = canvas
    this._scene = new THREE.Scene()

    this._viewport = new THREE.Vector2()
    this._resize()

    this._clock = new THREE.Clock(true)

    this._renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this._canvas,
      alpha: true
    })

    this._renderer.toneMapping = THREE.LinearToneMapping

    this._renderer.setClearColor(0x000000, 0)
    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(this._viewport.x, this._viewport.y)

    this._camera = new THREE.PerspectiveCamera(35, this._viewport.x / this._viewport.y, 1, 250000)
    this._camera.position.set(0, 0, -10)

    const controls = new OrbitControls(this._camera, this._renderer.domElement)

    controls.enabled = true
    controls.maxDistance = 1500
    controls.minDistance = 0
    controls.enableDumping = true
    controls.enableZoom = true

    this._initLights()
    this._initElements()

    window.addEventListener('resize', () => this._resize(), false)

    this._render()
  }

  _initLights () {
    this._ambientLight = new THREE.AmbientLight(0xffffff, 0.2)

    this._scene.add(this._ambientLight)


    let light = new THREE.PointLight(0xf0f0f0, 1)

    light.position.y = 2 * 0.5
    light.position.z = -2
    this._scene.add(light)
  }

  _initElements () {
    this._cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: 0xff0000 }))

    this._scene.add(this._cube)
  }

  _animate () {
    this._cube.rotation.x += 0.01
  }

  _render () {
    if (this._postprocessing) {
      this._postprocessing.render()
    } else {
      this._renderer.render(this._scene, this._camera)
    }

    this._animate()

    requestAnimationFrame(this._render.bind(this))
  }

  _resize (w, h) {
    this._viewport.x = window.innerWidth
    this._viewport.y = window.innerHeight

    if (this._renderer) {
      this._renderer.setPixelRatio(window.devicePixelRatio)
      this._renderer.setSize(this._viewport.x, this._viewport.y)
    }

    if (this._camera) {
      this._camera.aspect = this._viewport.x / this._viewport.y
      this._camera.updateProjectionMatrix()
    }
  }
}

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//load textures

const textureLoader = new THREE.TextureLoader()

const gridNormal = textureLoader.load('/textures/gridNormal.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( 0.5, 64, 64)
const geometry2 = new THREE.SphereGeometry(0.2,64,64)
const geometry3 = new THREE.SphereGeometry(0.05,64,64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 1.2
material.roughness = 2
material.normalMap = gridNormal
material.color = new THREE.Color(0x050505)

const material2 = new THREE.MeshStandardMaterial()
material.roughness = 2
material2.transparent = true
material2.opacity = 0.3
material2.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material2)
const sphere2 = new THREE.Mesh(geometry2, material2)
const sphere3 = new THREE.Mesh(geometry3, material2)
const sphere4 = new THREE.Mesh(geometry2, material2)
const sphere5 = new THREE.Mesh(geometry3, material2)
sphere2.position.set(1,0,0)
sphere3.position.set(1.5,0,0)
sphere4.position.set(0,0,1)
sphere5.position.set(0,0,1.5)
scene.add(sphere)
scene.add(sphere2)
scene.add(sphere3)
// scene.add(sphere4)
// scene.add(sphere5)

// Lights

const frontLight = new THREE.PointLight(0xff1636, 10)
frontLight.position.set(1,-2,-1)
scene.add(frontLight)

const backLight = new THREE.PointLight(0x0000a3, 10)
backLight.position.set(-3,-5,-1)
scene.add(backLight)

// light helpers
// const frontLightHelper = new THREE.PointLightHelper(frontLight, 0.5)
// scene.add(frontLightHelper)
// const backLightHelper = new THREE.PointLightHelper(backLight, 0.5)
// scene.add(backLightHelper)



// dat.gui add
const front = gui.addFolder('Red Light')
front.add(frontLight.position, 'x').min(-3).max(3).step(0.01)
front.add(frontLight.position, 'y').min(-6).max(3).step(0.01)
front.add(frontLight.position, 'z').min(-10).max(3).step(0.01)
front.add(frontLight, 'intensity').min(0).max(10).step(0.01)
const frontLightColor = {
    color: 0xff1636
}
front.addColor(frontLightColor, 'color')
    .onChange(() => {
        frontLight.color.set(frontLightColor.color)
    })


const back = gui.addFolder('Blue Light')
back.add(backLight.position, 'x').min(-3).max(3).step(0.01)
back.add(backLight.position, 'y').min(-6).max(3).step(0.01)
back.add(backLight.position, 'z').min(-3).max(3).step(0.01)
back.add(backLight, 'intensity').min(0).max(10).step(0.01)
const backLightColor = {
    color: 0x0000a3
}
back.addColor(backLightColor, 'color')
    .onChange(() => {
        backLight.color.set(backLightColor.color)
    })


const smallSphere = gui.addFolder('Sphere 2')
smallSphere.add(sphere2.position, 'x').min(-3).max(3).step(0.01)
smallSphere.add(sphere2.position, 'y').min(-6).max(3).step(0.01)
smallSphere.add(sphere2.position, 'z').min(-3).max(3).step(0.01)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * 0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.7
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.x = .2 * elapsedTime

    sphere2.rotation.y = -0.55 * elapsedTime
    sphere2.rotation.x = -.1 * elapsedTime

    backLight.intensity = Math.abs((Math.sin(elapsedTime/3) * 5))
    frontLight.intensity = Math.abs((Math.cos(elapsedTime/3) * 5)) 
    
    // camera.position.x = Math.sin(elapsedTime) 
    // camera.position.y = Math.cos(elapsedTime) 
    // camera.position.z = Math.sin(elapsedTime) + 1

    camera.lookAt(0,0,0)
    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()

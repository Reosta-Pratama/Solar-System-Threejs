import * as THREE from './three.js/build/three.module.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'

//Tekan Spasi buat nukar camera

var rendering, scene
var makeMatahari, makeMerkurius, makeVenus, makeBumi, makeBulan, makeAwan
var makeMars, makeJupiter, makeSaturnus, makeUranus, makeNeptunus
var makeBintang, makeCincin, makeCincin2, makeAura
var currentCamera, switchCamera, controlCamera
var camera1, camera2
var makeDirectional

var edarMerkurius, edarVenus, edarBumi, edarMars, edarJupiter, edarSaturnus, edarUranus, edarNeptunus

//rotasi merkurius
var rMerkurius = 100
var thetaMerkurius = 0
var dThetaMerkurius = 2 * Math.PI / 1000

//rotasi venus
var rVenus = 130
var thetaVenus = 0
var dThetaVenus = 1.6 * Math.PI / 1000

//rotasi Bumi
var rBumi = 160
var thetaBumi = 0
var dThetaBumi = 1.1 * Math.PI / 1000

//rotasi Mars
var rMars = 190
var thetaMars = 0
var dThetaMars = 0.8 * Math.PI / 1000

//rotasi Jupiter
var rJupiter = 240
var thetaJupiter = 0
var dThetaJupiter = 0.6 * Math.PI / 1000

//rotasi Saturnus
var rSaturnus = 300
var thetaSaturnus = 0
var dThetaSaturnus = 0.4 * Math.PI / 1000

//rotasi Uranus
var rUranus = 360
var thetaUranus = 0
var dThetaUranus = 0.2 * Math.PI / 1000

//rotasi Neptunus
var rNeptunus = 400
var thetaNeptunus = 0
var dThetaNeptunus = 0.1 * Math.PI / 1000

var DirectionalLight = () => {
    let light = new THREE.PointLight(0xffffff, 1)

    return light
}

var Bintang = () => {

    let vertices = [];
    for ( let i = 0; i < 15000; i ++ ) {
        const x = THREE.MathUtils.randFloatSpread( 2500 );
        const y = THREE.MathUtils.randFloatSpread( 2500 );
        const z = THREE.MathUtils.randFloatSpread( 2500 );
        vertices.push( x, y, z );
    }

    let geometry = new THREE.OctahedronBufferGeometry(3, 1)
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ))

    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Bintang.png')

    let material = new THREE.PointCloudMaterial({
        size: 2,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 2,
        shininess: 5
    })

    let mesh = new THREE.Points(geometry, material)

    return mesh
}

var Matahari = () => {
    let geoMatahari = new THREE.SphereGeometry(80, 64, 64,)

    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Matahari.jpg')

    let matMatahari = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 1.5
    })

    let meshMatahari = new THREE.Mesh(geoMatahari, matMatahari)
    meshMatahari.position.set(-70, 0, 0)
    
    return meshMatahari
}

var Matahari2 = () => {
    let geoMatahari = new THREE.SphereGeometry(81, 64, 64,)

    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Matahari.jpg')

    let matMatahari = new THREE.MeshPhongMaterial({  
        ambient: new THREE.AmbientLight(0xffffff, 1), 
        side: THREE.DoubleSide,
        envMap: texture,
        transparent: true,
        opacity: 0.2   
    })

    let meshMatahari = new THREE.Mesh(geoMatahari, matMatahari)
    meshMatahari.position.set(-70, 0, 0)
    
    return meshMatahari
}

var Merkurius = () => {
    let geoMerkurius = new THREE.SphereGeometry(4, 64, 64)
    let louderMerkurius = new THREE.TextureLoader()
    let textureMerkurius = louderMerkurius.load('./Textures/Merkurius.jpg')

    let matMerkurius = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: textureMerkurius,
        specular: 20,
        lightMap: textureMerkurius,
        lightMapIntensity: 0.8
    })

    let meshMerkurius = new THREE.Mesh(geoMerkurius, matMerkurius)
    meshMerkurius.castShadow = true

    return meshMerkurius
}

var circleMerkurius = () => {
    let geo = new THREE.RingGeometry(100, 101, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Venus = () => {
    let geoVenus = new THREE.SphereGeometry(5.5, 64, 64)
    let louderVenus = new THREE.TextureLoader()
    let textureVenus = louderVenus.load('./Textures/Venus.jpg')

    let matVenus = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: textureVenus,
        specular: 16,
        lightMap: textureVenus,
        lightMapIntensity: 0.6
    })

    let meshVenus = new THREE.Mesh(geoVenus, matVenus)
    meshVenus.castShadow = true

    return meshVenus
}

var circleVenus = () => {
    let geo = new THREE.RingGeometry(130, 131, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Bumi = () => {
    let geoBumi = new THREE.SphereGeometry(6, 64, 64)
    
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Bumi.jpg')
    let normalTexture = louder.load('./Textures/BumiNormal.jpg')

    let matBumi = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        shininess: 1,
        specular: 12,
        normalMap: normalTexture,
        lightMap : normalTexture,
        lightMapIntensity: 1.5
    })

    let meshBumi = new THREE.Mesh(geoBumi, matBumi)

    return meshBumi
}

var BumiAwan = () => {
    let geoBumi = new THREE.SphereGeometry(6.1, 64, 64)
    
    let louder = new THREE.TextureLoader()
    let awanTexture = louder.load('./Textures/Awan.jpg')

    let matBumi = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: awanTexture,
        shininess: 1,
        transparent: true,
        opacity: 0.7,
        lightMap: awanTexture,
        lightMapIntensity: 0.6
    })

    let meshBumi = new THREE.Mesh(geoBumi, matBumi)

    return meshBumi
}

var circleBumi = () => {
    let geo = new THREE.RingGeometry(160, 161, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Bulan = () => {
    let geoBulan = new THREE.SphereGeometry(1, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Bulan.jpg')

    let matBulan = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 0.5
    })

    let meshBulan = new THREE.Mesh(geoBulan, matBulan)
    meshBulan.position.set(78, 6, -6)

    return meshBulan
}

var Mars = () => {
    let geoMars = new THREE.SphereGeometry(4.5, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Mars.jpg')

    let matMars = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        specular: 10,
        lightMap: texture,
        lightMapIntensity: 0.6
    })

    let meshMars = new THREE.Mesh(geoMars, matMars)
    // meshMars.position.set(87, 0, 0)

    return meshMars
}

var circleMars = () => {
    let geo = new THREE.RingGeometry(190, 191, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Jupiter = () => {
    let geoJupiter = new THREE.SphereGeometry(15, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Jupiter.jpg')

    let matJupiter = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 0.4
    })

    let meshJupiter = new THREE.Mesh(geoJupiter, matJupiter)

    return meshJupiter
}

var circleJupiter = () => {
    let geo = new THREE.RingGeometry(240, 241, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Saturnus = () => {
    let geoSaturnus = new THREE.SphereGeometry(12, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Saturnus.jpg')

    let matSaturnus = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 0.4
    })

    let meshSaturnus = new THREE.Mesh(geoSaturnus, matSaturnus)

    return meshSaturnus
}

var circleSaturnus = () => {
    let geo = new THREE.RingGeometry(300, 301, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var CincinSaturnus = () => {
    let geo = new THREE.RingGeometry(14, 14.5, 64, 64, 6.283185307179586)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Saturnus.jpg')

    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        map: texture,
        color: 0xe5cf9b,
        transparent : true,
        opacity: 0.8
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(145, 0, 0)
    mesh.rotation.y = 90
    mesh.rotation.x = -20

    return mesh
}

var CincinSaturnus2 = () => {
    let geo = new THREE.RingGeometry(15, 19, 64, 64, 6.283185307179586)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Saturnus.jpg')

    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        map: texture,
        color: 0xe5cf9b,
        transparent : true,
        opacity: 0.8
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(145, 0, 0)
    mesh.rotation.y = 90
    mesh.rotation.x = -20

    return mesh
}

var Uranus = () => {
    let geoUranus = new THREE.SphereGeometry(8, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Uranus.jpg')

    let matUranus = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 0.4
    })

    let meshUranus = new THREE.Mesh(geoUranus, matUranus)

    return meshUranus
}

var circleUranus = () => {
    let geo = new THREE.RingGeometry(360, 361, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var Neptunus = () => {
    let geoNeptunus = new THREE.SphereGeometry(7.5, 64, 64)
    let louder = new THREE.TextureLoader()
    let texture = louder.load('./Textures/Neptunus.jpg')

    let matNeptunus = new THREE.MeshPhongMaterial({   
        side: THREE.DoubleSide,
        map: texture,
        lightMap: texture,
        lightMapIntensity: 0.4
    })

    let meshNeptunus = new THREE.Mesh(geoNeptunus, matNeptunus)

    return meshNeptunus
}

var circleNeptunus = () => {
    let geo = new THREE.RingGeometry(400, 401, 64, 64, 6.283185307179586)
   
    let mat = new THREE.MeshBasicMaterial({   
        side: THREE.DoubleSide, 
        color: 0xffffff,
        transparent:true,
        opacity: 0.2
    })

    let mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-70, 0, 0)
    mesh.rotation.x = 7.85
    return mesh
}

var classInisialisasi = () => {

    const width = window.innerWidth, heigth = window.innerHeight
    const aspect = width/heigth

    rendering = new THREE.WebGLRenderer({antialias : true})
    rendering.setSize(width, heigth)
    rendering.setClearColor(0x000000)
    document.body.appendChild(rendering.domElement)

    camera1 = new THREE.PerspectiveCamera(45, aspect)
    camera1.position.set(10, 1000, 10)
    camera1.lookAt(10, 100, 0)

    camera2 = new THREE.PerspectiveCamera(45, aspect)
    camera2.position.set(100, 500, -600)
    camera2.lookAt(0, 0, -1000)

    currentCamera = camera1
    switchCamera = 1

    controlCamera = new OrbitControls(camera2, rendering.domElement)

    //object
    makeDirectional = DirectionalLight()
    makeBintang = Bintang()
    makeMatahari = Matahari()
    makeMerkurius = Merkurius()
    makeVenus = Venus()
    makeBumi = Bumi()
    makeBulan = Bulan()
    makeAwan = BumiAwan()
    makeMars = Mars()
    makeJupiter = Jupiter()
    makeSaturnus = Saturnus()
    makeCincin = CincinSaturnus()
    makeCincin2 = CincinSaturnus2()
    makeUranus = Uranus()
    makeNeptunus = Neptunus()
    makeAura = Matahari2()

    edarMerkurius = circleMerkurius()
    edarVenus = circleVenus()
    edarBumi = circleBumi()
    edarMars = circleMars()
    edarJupiter = circleJupiter()
    edarSaturnus = circleSaturnus()
    edarUranus = circleUranus()
    edarNeptunus = circleNeptunus()


    //tambahan
    makeDirectional.position.set(-100, 50, 100)
    controlCamera.target = makeMatahari.position

    //scene
    scene = new THREE.Scene()
    scene.add(makeDirectional)
    scene.add(makeBintang)
    scene.add(makeMatahari)
    scene.add(makeMerkurius)
    scene.add(makeVenus)
    scene.add(makeBumi)
    scene.add(makeBulan)
    scene.add(makeAwan)
    scene.add(makeMars)
    scene.add(makeJupiter)
    scene.add(makeSaturnus)
    scene.add(makeCincin)
    scene.add(makeCincin2)
    scene.add(makeUranus)
    scene.add(makeNeptunus)
    scene.add(makeAura)

    //scene garis edar disini
    scene.add(edarMerkurius)
    scene.add(edarVenus)
    scene.add(edarBumi)
    scene.add(edarMars)
    scene.add(edarJupiter)
    scene.add(edarSaturnus)
    scene.add(edarUranus)
    scene.add(edarNeptunus)
}

var classRendering = () => {
    rendering.render(scene, currentCamera)
    requestAnimationFrame(classRendering)

    controlCamera.update()

    //Bintang
    makeBintang.rotation.y -= 0.0001
    makeBintang.rotation.z += 0.0001

    //Matahari
    makeMatahari.rotation.y += 0.001
    // makeAura.rotation.y += 0.001

    //Merkurius
    makeMerkurius.rotation.y -= 0.01
    thetaMerkurius -= dThetaMerkurius
    makeMerkurius.position.x = -70 + rMerkurius * Math.cos(thetaMerkurius)
    makeMerkurius.position.z = rMerkurius * Math.sin(thetaMerkurius)

    //Venus
    makeVenus.rotation.y -= 0.01
    thetaVenus -= dThetaVenus
    makeVenus.position.x = -70 + rVenus * Math.cos(thetaVenus)
    makeVenus.position.z = rVenus * Math.sin(thetaVenus) 

    //Bumi
    makeBumi.rotation.y -= 0.001
    thetaBumi -= dThetaBumi
    makeBumi.position.x = -70 + rBumi * Math.cos(thetaBumi)
    makeBumi.position.z = rBumi * Math.sin(thetaBumi)

    makeAwan.rotation.y -= 0.005
    makeAwan.position.x = -70 + rBumi * Math.cos(thetaBumi)
    makeAwan.position.z = rBumi * Math.sin(thetaBumi)

    //Bulan
    makeBulan.rotation.y -= 0.01
    // theta += dTheta
    makeBulan.position.x = -70 + (rBumi + 10) * Math.cos(thetaBumi)
    makeBulan.position.z = (rBumi + 10) * Math.sin(thetaBumi)

    //Mars
    makeMars.rotation.y -= 0.01
    thetaMars -= dThetaMars
    makeMars.position.x = -70 + rMars * Math.cos(thetaMars)
    makeMars.position.z = rMars * Math.sin(thetaMars)

    //Jupiter
    makeJupiter.rotation.y -= 0.01
    thetaJupiter -= dThetaJupiter
    makeJupiter.position.x = -70 + rJupiter * Math.cos(thetaJupiter)
    makeJupiter.position.z = rJupiter * Math.sin(thetaJupiter)

    //Saturnus
    makeSaturnus.rotation.y -= 0.01
    makeCincin.rotation.z += 0.001
    makeCincin.rotation.x += 0.01
    makeCincin2.rotation.z += 0.001
    makeCincin2.rotation.x += 0.01

    thetaSaturnus -= dThetaSaturnus
    makeSaturnus.position.x = -70 + rSaturnus * Math.cos(thetaSaturnus)
    makeSaturnus.position.z = rSaturnus * Math.sin(thetaSaturnus)
   
    makeCincin.position.x = -70 + rSaturnus * Math.cos(thetaSaturnus)
    makeCincin.position.z = rSaturnus * Math.sin(thetaSaturnus)

    makeCincin2.position.x = -70 + rSaturnus * Math.cos(thetaSaturnus)
    makeCincin2.position.z = rSaturnus * Math.sin(thetaSaturnus)

    //Uranus
    makeUranus.rotation.y -= 0.01
    thetaUranus -= dThetaUranus
    makeUranus.position.x = -70 + rUranus * Math.cos(thetaUranus)
    makeUranus.position.z = rUranus * Math.sin(thetaUranus)

    //Neptunus
    makeNeptunus.rotation.y -= 0.01
    thetaNeptunus -= dThetaNeptunus
    makeNeptunus.position.x = -70 + rNeptunus * Math.cos(thetaNeptunus)
    makeNeptunus.position.z = rNeptunus * Math.sin(thetaNeptunus)
}

var MakeKeyListener = (event) => {
    if(event.keyCode == 32){
        if(switchCamera == 1){
            currentCamera = camera2
            switchCamera = 2
        }
        else{
            currentCamera = camera1
            switchCamera = 1
        }
    }
}

window.onload = () => {
    classInisialisasi()

    classRendering()

    document.addEventListener("keydown",MakeKeyListener)
}

window.onresize = () => {
    const width = innerWidth
    const heigth = innerHeight

    rendering.setSize(width, heigth)

    camera1.aspect = width / heigth
    camera1.updateProjectionMatrix()
}


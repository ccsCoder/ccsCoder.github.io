$(document).ready(function() {
    // set the scene size
    var WIDTH = 1000,HEIGHT = 1000;

    // set some camera attributes
    var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container = $('#container');

    // create a WebGL renderer, camera
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);
    //var camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 1000 );
    var scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 0;
    
    
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // set up the sphere vars
    var radius = 60,
    segments = 30,
    rings = 16;

    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    var sphere = new THREE.Mesh(

        new THREE.SphereGeometry(
            radius,
            segments,
            rings),

        sphereMaterial);

    // add the sphere to the scene
    scene.add(sphere);

    // create the sphere's material
    var sphereMaterial =
    new THREE.MeshLambertMaterial(
    {
        color: 0xCC0000
    });
    
    // create a point light
    var pointLight =
    //new THREE.PointLight(0xFF00EE);
    new THREE.AmbientLight(0XFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
    var animFrameID;
    (function animLoop() {
        animFrameID=requestAnimationFrame(animLoop);
        if (camera.position.z<=290) {
            camera.position.z+=10;
        }        
        else
           cancelAnimationFrame(animFrameID);
        renderer.render(scene, camera);
    })();
    // draw!
    
    
    
    
//    window.requestAnimationFrame = function(callback, element) {
//            var currTime = new Date().getTime();
//            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
//            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
//              timeToCall);
//            lastTime = currTime + timeToCall;
//            return id;
//        };
    
});

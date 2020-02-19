import * as THREE from '../build/three.module.js';

import Stats from './jsm/libs/stats.module.js';

import { DragControls } from './jsm/controls/DragControls.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { BokehPass } from './jsm/postprocessing/BokehPass.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { TransformControls } from './jsm/controls/TransformControls.js';

let container = document.getElementById('container');
let postprocessing = {};
let listOfSphere = [];
let stats, camera, scene, renderer, helper, width, height;
let plan = 1;
let geometry = new THREE.SphereBufferGeometry( 1, 20, 10 );

let addSphere = function(plan,color,opacity,scale,positionX,positionY,positionZ,l){
  let mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: color} ) );
	mesh.position.set(positionX*Math.PI/l, positionY*Math.PI/l, positionZ*Math.PI/l);
	mesh.scale.set( scale, scale, scale);
	mesh.material.opacity = opacity;
	mesh.material.transparent = true;
  mesh.material.depthWrite = false;
	mesh.matrixAutoUpdate = false;
  mesh.plan = plan;
  mesh.x = positionX;
  mesh.y = positionY;
  mesh.z = positionZ;
	mesh.updateMatrix();
	scene.add( mesh );
  listOfSphere.push(mesh);
}

let changeSphere = function(mesh,opacity,l,scale){
  mesh.scale.set( scale, scale, scale);
  mesh.position.set(mesh.x*2*Math.PI/l, mesh.y*2*Math.PI/l, mesh.z*2*Math.PI/l)
  mesh.material.opacity = opacity;
  mesh.updateMatrix();
}

let update = function() {
  let kg = $("input[name=kRange]");
  let l = $("input[name=LRange]");
  let o = $("input[name=ORange]");
  listOfSphere.forEach((mesh) => {
    if(mesh.plan == -1)
      changeSphere(mesh,0.5,l.val(),kg.val());
    else
      changeSphere(mesh,o.val(),l.val(),0.1);
      if(mesh.plan > plan)
        mesh.material.opacity = 0;
  });
  kg.prop({
    'min': 0,
    'max': 20*Math.PI/l.val()
});
}

let animate = function(){
  requestAnimationFrame( animate, renderer.domElement );
  stats.update();
  renderer.render( scene, camera );
}

let init = function(){
  width = container.clientWidth;
  height = container.clientHeight;
  $("#container").children().remove();
//Création de la Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );

//Création de la Camera
  camera = new THREE.PerspectiveCamera( 1, width / height, 1, 10000 );
	camera.position.set( 0, 250, 0 );
  scene.add( camera );

//Création d'une grille (plan)
	helper = new THREE.GridHelper( 100, 100 );
	helper.position.y = 0;
	helper.material.opacity = 0.05;
	helper.material.transparent = true;
	scene.add( helper );

//Création du rendu
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( width, height );
	renderer.shadowMap.enabled = false;
  renderer.autoClear = false;
//On fixe l'élément;
	container.appendChild( renderer.domElement );

//Création du controle de la souris
	initPostprocessing(width,height);
	new OrbitControls( camera, renderer.domElement );
  postprocessing.bokeh.uniforms[ "focus" ].value = 500.0;
	postprocessing.bokeh.uniforms[ "aperture" ].value = 5 * 0.00001;
	postprocessing.bokeh.uniforms[ "maxblur" ].value = 1.0;

//Création de tout les sphere
  let red = 0xF00000
  let white = 0xFFFFFF
  let black = 0x000000
  let xgrid = 20, ygrid = 20,zgrid = 20;
  let kg = $("input[name=kRange]").val();
  let l = $("input[name=LRange]").val();
  let o = $("input[name=ORange]").val();

  for (let  i = -xgrid/2; i < xgrid/2+1; i++ )
    for (let j = -ygrid/2; j < ygrid/2+1; j++ )
      for (let k = -zgrid/2; k < zgrid/2+1; k++ )
        if(i == 0 && j == 0 && k == 0)
          addSphere(0,white,o, 0.1,i, j, k,l);
        else if( j == 0 && k == 0)
          addSphere(1,black,o, 0.1,i, j, k,l);
        else if( j == 0)
          addSphere(2,black,o, 0.1,i, j, k,l);
        else
          addSphere(3,black,o, 0.1,i, j, k,l);
  addSphere(-1,red,0.5,kg/2,0,0,0,l);

//Création du Stats ?
  stats = new Stats();

  animate()
  update();
}

let initPostprocessing = function() {
  var renderPass = new RenderPass( scene, camera );

  var bokehPass = new BokehPass( scene, camera, {
    focus: 1.0,
    aperture:	0.025,
    maxblur:	1.0,

    width: width,
    height: height
  } );

  var composer = new EffectComposer( renderer );

  composer.addPass( renderPass );
  composer.addPass( bokehPass );

  postprocessing.composer = composer;
  postprocessing.bokeh = bokehPass;

}

let modif = function(p){
  plan = p
}

export {
  init as init,
  update as update,
  modif as modif
};

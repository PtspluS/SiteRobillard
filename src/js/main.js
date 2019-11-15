import * as THREE from '../build/three.module.js';

import Stats from './jsm/libs/stats.module.js';

import { DragControls } from './jsm/controls/DragControls.js';
import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { BokehPass } from './jsm/postprocessing/BokehPass.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { TransformControls } from './jsm/controls/TransformControls.js';

(function () {
	var xgrid = 9,ygrid = 1,zgrid = 1;

		let currentState = '1d';//permet de savoir si on a appuyé sur le bouton 1d ou 2d ou 3d
			graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
		$('#selectLanguage').change(()=>{
			let selectedLanguage = $(this).children("option:selected").val();
			putTxt(selectedLanguage);
		});

		(()=>$('#kRangeValue').text($("input[name=kRange]").val()))();

		$('input[name=kRange]').on('input',()=>{
			$('#kRangeValue').text($("input[name=kRange]").val());
			if(currentState == '1d'){
				graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			} else if (currentState == '2d'){
				graph2d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			} else if (currentState == '3d'){
				graph3d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			}
		});

		(()=>$('#LRangeValue').text($("input[name=LRange]").val()))();

		$('input[name=LRange]').on('input',()=>{
			$('#LRangeValue').text($("input[name=LRange]").val());
			if(currentState == '1d'){
				graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			} else if (currentState == '2d'){
				graph2d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			} else if (currentState == '3d'){
				graph3d($("input[name=kRange]").val(),$("input[name=LRange]").val());
			}
		});

		$('#1d').click(function(){
			currentState = '1d';
			xgrid = 9,
			ygrid = 1,
			zgrid = 1;
			console.log(currentState)
			$("#container").children().remove();
			init()
			graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
		});

		$('#2d').click(function(){
			currentState = '2d';
			xgrid = 9,
			ygrid = 1,
			zgrid = 9;
			console.log(currentState)
			$("#container").children().remove();
			init()
			graph2d($("input[name=kRange]").val(),$("input[name=LRange]").val());
		});

		$('#3d').click(function(){
			currentState = '3d';
			xgrid = 9,
			ygrid = 9,
			zgrid = 9;
			console.log(currentState)
			$("#container").children().remove();
			init()
			graph3d($("input[name=kRange]").val(),$("input[name=LRange]").val());
		});

				var container, stats;
				var camera, scene, renderer,
					materials = [], objects = [],
					singleMaterial, zmaterial = [],
					parameters, i, j, k, h, x, y, z, nobjects, cubeMaterial;

				var mouseX = 0, mouseY = 0;

				container = document.getElementById( 'container' );

				var width = container.clientWidth;
				var height = container.clientHeight;
				console.log(width)
				console.log(height)
				var postprocessing = {};

				init();
				animate();

				function init() {

					scene = new THREE.Scene();
					scene.background = new THREE.Color( 0xf0f0f0 );

					camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );
					camera.position.set( 0, 300, 0 );
					scene.add( camera );

					var helper = new THREE.GridHelper( 2000, 100 );
					helper.position.y = 0;
					helper.material.opacity = 0.25;
					helper.material.transparent = true;
					scene.add( helper );

					renderer = new THREE.WebGLRenderer( { antialias: true } );
					renderer.setPixelRatio( window.devicePixelRatio );
					renderer.setSize( width, height );
					renderer.shadowMap.enabled = false;
					container.appendChild( renderer.domElement );

					stats = new Stats();
					var controls = new OrbitControls( camera, renderer.domElement );

					parameters = { color: 0x000000};
					cubeMaterial = new THREE.MeshBasicMaterial( parameters );

					singleMaterial = false;

					if ( singleMaterial ) zmaterial = [ cubeMaterial ];

					var geo = new THREE.SphereBufferGeometry( 1, 20, 10 );

					nobjects = xgrid * ygrid * zgrid;

					var s = 10;
					var count = 0;

					for ( i = 0; i < xgrid; i ++ )
						for ( j = 0; j < ygrid; j ++ )
							for ( k = 0; k < zgrid; k ++ ) {

								var mesh;

								if ( singleMaterial ) {

									mesh = new THREE.Mesh( geo, zmaterial );

								} else {

									mesh = new THREE.Mesh( geo, new THREE.MeshBasicMaterial( parameters ) );
									materials[ count ] = mesh.material;

								}

								x = 200 * (i-(xgrid-1)/2);
								y = 200 * (j-(ygrid-1)/2);
								z = 200 * (k-(zgrid-1)/2);

								mesh.position.set( x, y, z );
								mesh.scale.set( s, s, s );

								mesh.matrixAutoUpdate = false;
								mesh.updateMatrix();

								scene.add( mesh );
								objects.push( mesh );

								count ++;

							}

					initPostprocessing();

					renderer.autoClear = false;

					stats = new Stats();

					var effectController = {

						focus: 500.0,
						aperture:	5,
						maxblur:	1.0

					};

					var matChanger = function ( ) {

						postprocessing.bokeh.uniforms[ "focus" ].value = effectController.focus;
						postprocessing.bokeh.uniforms[ "aperture" ].value = effectController.aperture * 0.00001;
						postprocessing.bokeh.uniforms[ "maxblur" ].value = effectController.maxblur;

					};

					matChanger();

				}

				function initPostprocessing() {

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

				function animate() {

					requestAnimationFrame( animate, renderer.domElement );

					render();
					stats.update();

				}

				function render() {
					renderer.render( scene, camera );

				}
})();

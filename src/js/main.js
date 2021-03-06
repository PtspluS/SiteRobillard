import { init, update, modif } from './test.js';
//test
(function () {
//permet de savoir si on a appuyé sur le bouton 1d ou 2d ou 3d
	let currentState = '1d';
	let boutonk = $('#kRangeValue');
	let boutonl = $('#LRangeValue');
	let boutono = $('#ORangeValue');
	let k,l,o;

	let up = function(){
		k = $("input[name=kRange]").val();
	 	l = $("input[name=LRange]").val();
		o = $("input[name=ORange]").val();
		boutonl.text(l);
		boutono.text(o);
		boutonk.text(k);
	};

//permet de changer le language
	$('#selectLanguage').change(()=>{
		up()
		let selectedLanguage = $(this).children("option:selected").val();
		putTxt(selectedLanguage);
	});

//permet d'intéragir si on appuiye sur "k"
	$('input[name=kRange]').on('input',()=>{
		up()
		if(currentState == '1d')
			graph1d(k,l);
		else if (currentState == '2d')
			graph2d(k,l);
		else if (currentState == '3d')
			graph3d(k,l);
		update();
	});

//permet d'intéragir si on appuiye sur "l"
	$('input[name=LRange]').on('input',()=>{
		up()
		if(currentState == '1d')
			graph1d(k,l);
		else if (currentState == '2d')
			graph2d(k,l);
		else if (currentState == '3d')
			graph3d(k,l);
		update();
	});

//permet d'intéragir si on appuiye sur "O"
	$('input[name=ORange]').on('input',()=>{
		up()
		update();
	});

//permet d'intéragir si on appuiye sur "1d"
	$('#1d').click(function(){
		up()
		currentState = '1d';
		modif(1)
		update();
		graph1d(k,l);
	});

//permet d'intéragir si on appuiye sur "2d"
	$('#2d').click(function(){
		up()
		currentState = '2d';
		modif(2)
		update();
		graph2d(k,l);
	});

//permet d'intéragir si on appuiye sur "3d"
	$('#3d').click(function(){
		up()
		currentState = '3d';
		modif(3)
		update();
		graph3d(k,l);
	});

	window.onresize = ()=>{
		init();
	}

	up()
	graph1d(k,l);
	modif(1);
	init();
})();

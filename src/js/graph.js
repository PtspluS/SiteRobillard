let h = Math.pow(6,62607015,-34);
let h_ = h/(2*Math.PI);//ou h_ =1

var graph1d = function graph1d (k, l){

	let x = [];
	let y = [];
	let value = ((2*Math.PI)/l);
	let count = 2;

	for(let i = 0; i<=(k*l)/(2*Math.PI); i++){
		
		x[i] = i*((2*Math.PI)/l);
		y[i] = i*2;

	}

	//sert pour l'affichage

	var trace = {
	    x : x,
	    y : y,
	    mode: 'lines',
  		name: 'hv',
  		line: {shape: 'hv'},
  		type: 'scatter'
	}

	var data = [trace];

	var layout = {
		title :{
			text : 'Histogram test'
		},
		xaxis : {
			title : {
				text : 'k',
			}
		},
		yaxis : {
			title : {text: 'N(k)',}
		}
	}
	Plotly.newPlot('graph',data,layout,{scrollZoom : true},{showSendToCloud: true});
}


var graph2d = function(k,l){
	let x = [];
	let y = [];


	for(let i = 0; i<=(k*l)/(2*Math.PI); i++){
		x[i] = i*((2*Math.PI)/l);
		y[i] = 0;
		for(let n = 0; n<=i; n++){
			for (let m = 0; m<=Math.sqrt(i*i-n*n);m++){
				y[i]+=4;
			}
		}
	}

	//sert pour l'affichage

	var trace = {
	    x : x,
	    y : y,
	    mode: 'lines',
  		name: 'hv',
  		line: {shape: 'hv'},
  		type: 'scatter'
	}

	var data = [trace];

	var layout = {
		title :{
			text : 'Histogram test'
		},
		xaxis : {
			title : {
				text : 'k',
			}
		},
		yaxis : {
			title : {text: 'N(k)',}
		}
	}
	Plotly.newPlot('graph',data,layout,{scrollZoom : true},{showSendToCloud: true});
}

var graph3d = function(k,l){
	let x = [];
	let y = [];

	for (let i = 0; i<=(k*l)/(2*Math.PI); i++){
		x[i] = i*((2*Math.PI)/l);
		y[i] = 0;
		for(let n = 0; n<=i ; n++){
			for(let m = 0; m<=Math.sqrt(i*i-n*n);m++){
				for(let p = 0; p<=Math.sqrt(i*i-n*n-m*m);p++){
					y[i]+=8;
				}
			}
		}
	}

	//sert pour l'affichage

	var trace = {
	    x : x,
	    y : y,
	    mode: 'lines',
  		name: 'hv',
  		line: {shape: 'hv'},
  		type: 'scatter'
	}

	var data = [trace];

	var layout = {
		title :{
			text : 'Histogram test'
		},
		xaxis : {
			title : {
				text : 'k',
			}
		},
		yaxis : {
			title : {text: 'N(k)',}
		}
	}
	Plotly.newPlot('graph',data,layout,{scrollZoom : true},{showSendToCloud: true});
}
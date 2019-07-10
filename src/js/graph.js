let h = Math.pow(6,62607015,-34);
let h_ = h/(2*Math.PI);

var graph1d = function graph1d (k, l){

	let x = [];
	
	for(let i =0; i<k; i+=1){
		x[i] = (Math.PI * i^2)/(2/l)^2;
	}
	
	var trace = {
	    x: x,
	    type: 'histogram',
		//cumulative: {enabled: true}
	};

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
	Plotly.newPlot('graph',data,layout,{scrollZoom : true});
}
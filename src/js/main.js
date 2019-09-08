(function () {
	let currentState;//permet de savoir si on a appuyé sur le bouton 1d ou 2d ou 3d

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
		graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
	});

	$('#2d').click(function(){
		currentState = '2d';
		graph2d($("input[name=kRange]").val(),$("input[name=LRange]").val());
	});

	$('#3d').click(function(){
		currentState = '3d';
		graph3d($("input[name=kRange]").val(),$("input[name=LRange]").val());
	});

	
})();
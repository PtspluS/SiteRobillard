(function () {
	$('#selectLanguage').change(()=>{
		let selectedLanguage = $(this).children("option:selected").val();
		putTxt(selectedLanguage); 
	});

	(()=>$('#kRangeValue').text($("input[name=kRange]").val()))();

	$('input[name=kRange]').on('input',()=>{
		$('#kRangeValue').text($("input[name=kRange]").val());
	});

	(()=>$('#LRangeValue').text($("input[name=LRange]").val()))();

	$('input[name=LRange]').on('input',()=>{
		$('#LRangeValue').text($("input[name=LRange]").val());
	});

	$('#1d').click(function(){
		graph1d($("input[name=kRange]").val(),$("input[name=LRange]").val());
	});

	$('#2d').click(function(){
		alert('2D');
	});

	$('#3d').click(function(){
		alert('3D');
	});
})();
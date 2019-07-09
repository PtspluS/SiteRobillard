(function () {
	$('#selectLanguage').change(()=>{
		let selectedLanguage = $(this).children("option:selected").val();
		putTxt(selectedLanguage); 
	});

	(()=>$('#kRangeValue').text($("input[name=kRange]").val()))()

	$('input[name=kRange]').on('input',()=>{
		$('#kRangeValue').text($("input[name=kRange]").val());
	})
})();
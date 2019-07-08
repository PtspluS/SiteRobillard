(function () {
	$('#selectLanguage').change(function(){
		let selectedLanguage = $(this).children("option:selected").val();
		putTxt(selectedLanguage); 
	});
})();
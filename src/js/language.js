/*Function which will set all the text in the selected language*/
var putTxt = function putTxt (lang) {
	let datas;
	let jsonPath = "./language/"+lang+".json";//path to the json
	console.log(jsonPath);
	$.getJSON(jsonPath,function(json){
		datas = json;
	});
	$('#corps').children().each(()=>{
		if($(this).id == datas.$(this).id){
			let id = $(this).id;
			$(this).text(datas.id);
		} 
	});
};
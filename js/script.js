$(document).ready(function(){
	$('#quoteArea').submit(function(e){
		e.preventDefault();

		addQuote();
	});

	getQuote();

});


function closeModal(){
	$('#myModal').modal('hide');
}


function getQuote(){

	var Quote = Parse.Object.extend("Quote");
	var query = new Parse.Query(Quote);

	query.descending("createdAt");
	query.limit(25);

	query.find({
		success:function(results){
			$("#quoteListe").html("");
			var template = Handlebars.compile($("#quote-template").html());

			$(results).each(function(i,e){
				var q = e.toJSON();
				$("#quoteListe").append(template(q));
			});

		},
		error: function(error) {
      	console.log('error.message');
    }

	});
	
}

function addQuote(){

	var Quote = Parse.Object.extend("Quote");
	var quote = new Quote();

	var quoteText = $('#Quote').val();
	var attr = $('#attr').val();
	

	quote.set("quoteText", quoteText);
	quote.set("attr", attr);

	quote.save(null,{
		success:function(){
			
			closeModal();
			location.reload();
		},
		error:function(){
			errorModal();
		}
	});


};
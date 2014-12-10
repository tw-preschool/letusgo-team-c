$(document).ready(function(){
	$('#submit').click(function(event){
		event.preventDefault();
		var name = $('#name').val();
		var price = $('#price').val();
		var unit = $('#unit').val();
		if(isNaN(parseInt(price))){
			alert("price must be number!");
			return;
		}
        $.ajax({
	         type: "POST",
	         url: "/products",
	         data: {"name":name,"price":price,"unit":unit},
	         dataType: "json",
	         success: function(data){
	                     if(data){
	                     	window.open(location.host+'/'+data.message);
	                     }
	                  }
        });
	});
});

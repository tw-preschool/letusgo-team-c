$(document).ready(function(){
	$('#submit').click(function(){
		var name = $('#name').val();
		var price = $('#price').val();
		var unit = $('#unit').val();
        $.ajax({
	         type: "POST",
	         url: "/products",
	         data: {"name":name,"price":price,"unit":unit},
	         dataType: "json",
	         success: function(data){
	                     alert(data);
	                  }
        });
	});
});
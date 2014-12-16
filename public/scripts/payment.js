$(document).ready(function () {
 	var payinfo =  eval('('+sessionStorage.getItem("payinfo")+')');
 	var shopping_list = "";
 	for (var i = 0; i < payinfo.shopping_items.length; i++) {
 	 	var item = payinfo.shopping_items[i];
 	 	shopping_list+= '<tr><td>'+item.name+'</td>'+
		 	 		'<td>'+item.price+'</td>'+
		 	 		'<td>'+item.unit+'</td>'+
		 	 		'<td>'+item.num+'</td>'+
		 	 		'<td>'+item.subTotal+'</td></tr>';
 	 }; 
 	 var promotion_list = "";
 	 for (var i = 0; i < payinfo.promotion_items.length; i++) {
 	 	var item = payinfo.shopping_items[i];
 	 	promotion_list+= '<tr><td>'+item.name+'</td>'+
		 	 		'<td>'+item.num+'</td>'+
		 	 		'<td>'+item.unit+'</td></tr>';
 	 }; 

 	 $("tbody[name='shopping']").append(shopping_list);
 	 $("tbody[name='promotion']").append(promotion_list);
 	 $("[name='totalMoney']").text(payinfo.totalMoney);
 	 $("[name='totalSavingMoney']").text(payinfo.totalSavingMoney);
 	 
});
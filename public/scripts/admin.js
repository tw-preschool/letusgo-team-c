$(document).ready(function() {
	$('#item-table').find('.edit-product').on('click', function(event) {
		event.preventDefault();
		var listItem = $(this).closest('tr');
		var name = listItem.find('.product-name').text();
		var price = listItem.find('.product-price').text();
		var unit = listItem.find('.product-unit').text();
		openEditLayer(name, price, unit, listItem);
	});

	$('.add-product').on('click', function(event) {
		event.preventDefault();
		openAddLayer();
	});

	$('#item-table').find('.delete-product').on('click', function(event) {
		event.preventDefault();
		var name = $(this).closest('tr').find('td').first().text();
		$(this).closest('tr').remove();
		$.ajax('/delete', {
			success: function(response) {
				console.log('ok');
			},
			data: {"name": name}
		});
	});

	$('.overlay').find('#cancel').on('click', function(event) {
		event.preventDefault();
		$('.overlay').fadeOut();
	});

	function openEditLayer(name, price, unit, listItem) {
		$('.overlay').find('#submit').text('更新');
		$('#product-form')[0].reset();	
		$('.overlay').find('#name').val(name);
		$('.overlay').find('#price').val(price);
		$('.overlay').find('#unit').val(unit);
		$('.overlay').fadeIn();	

		$('.overlay').find('#submit').off();
		$('.overlay').find('#submit').on('click', function(event){
			event.preventDefault();
			$('.overlay').fadeOut();
			var newName = $('#name').val();
			var newPrice = $('#price').val();
			var newUnit = $('#unit').val();
			
			$.ajax('/edit', {
				success: function(response) {
					console.log('ok');
				},
				type: 'post',
				data: {"name": name, "newName": newName, "price": newPrice, "unit": newUnit },
				complete: function() {
					listItem.find('.product-name').text(newName);
					listItem.find('.product-price').text(newPrice);
					listItem.find('.product-unit').text(newUnit);
				}
			});
			
		});		
	}

	function openAddLayer() {
		$('.overlay').find('#submit').text('添加');
		$('.overlay').fadeIn();
		$('#product-form')[0].reset();	
		$('.overlay').find('#submit').off();
		$('.overlay').find('#submit').on('click', function(event){
			event.preventDefault();
			$('.overlay').fadeOut();
			var name = $('#name').val();
			var price = $('#price').val();
			var unit = $('#unit').val();
			var promoted = "false";		
			$.ajax('/add', {
				success: function(response) {
					showAddProductLine(name, price, unit, promoted, response.productId)
				},
				type: 'post',
				dataType: 'json',
				data: {"name": name, "price": price, "unit": unit, "promoted": promoted },
			});		
		});	
	}

	function showAddProductLine(name, price, unit, promoted, productId) {
		var check = promoted == "true" ? "checked" : "unchecked";
        var editLink = '<a href="#" class="edit-product"><span class="glyphicon glyphicon-edit"></span></a>';
        var deleteLink = '<a href="#" class="delete-product"><span class="glyphicon glyphicon-remove"></span></a>';
        var checkBoxLink = '<label class="pull-right"><input type="checkbox" name="promotion" '+ ' ' + check +'>买二送一</label>';
		var listItem = $('<tr id=' + productId + '><td class="product-name">' + name + '</td><td class="product-price">' + price 
			+ '</td><td class="product-unit">' + unit + "</td><td>" + editLink + deleteLink + checkBoxLink + 
			"</td></tr>");
		$('#item-table').find('tbody').append(listItem);

		listItem.find('.delete-product').on('click', function(event) {
			event.preventDefault();
			var productName = $(this).closest('tr').find('td').first().text();
			$(this).closest('tr').remove();
			$.ajax('/delete', {
				success: function(response) {
					console.log('ok');
				},
				data: {"name": productName}
			});
		});

		listItem.find('.edit-product').on('click', function(event) {
			event.preventDefault();
			openEditLayer(name, price, unit, listItem);
		});

		listItem.find("input[name='promotion']").click(function() {
			var tr = $(this).closest('tr');
			var item_id = parseInt(tr.attr('id'));
			var item_name = tr.children()[0].innerText;
			var post_url = this.checked ? "/addPromotion" : "/deletePromotion";
			$.ajax({
				type: "POST",
				url: post_url,
				data: {
					"item_id": item_id,
					"item_name": item_name
				},
				dataType: "json",
				complete: function(){
					if(post_url == "/addPromotion") {
						alert('Suceess add the promotion on this product!');
					} else {
						alert('Suceess remove the promotion on this product!');
					}
				}
			});	
		});
	}

	$("input[name='promotion']").click(function() {
		var tr = $(this).closest('tr');
		var item_id = parseInt(tr.attr('id'));
		var item_name = tr.children()[0].innerText;
		var post_url = this.checked ? "/addPromotion" : "/deletePromotion";
		$.ajax({
			type: "POST",
			url: post_url,
			data: {
				"item_id": item_id,
				"item_name": item_name
			},
			dataType: "json",
			complete: function(){
				if(post_url == "/addPromotion") {
					alert('Suceess add the promotion on this product!');
				} else {
					alert('Suceess remove the promotion on this product!');
				}
			}
		});	
	});

	function changePromotionStatus(item_id, item_name, post_url) {
		$.ajax({
			type: "POST",
			url: post_url,
			data: {
				"item_id": item_id,
				"item_name": item_name
			},
			dataType: "json",
			complete: function(){
				if(post_url == "/addPromotion") {
					alert('Suceess add the promotion on this product!');
				} else {
					alert('Suceess remove the promotion on this product!');
				}
			}
		});	
	}
});
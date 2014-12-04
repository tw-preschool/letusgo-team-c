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

	$('.overlay').find('#submit').on('click', function(event){
		event.preventDefault();
		$('.overlay').fadeOut();
		var name = $('#name').val();
		var price = $('#price').val();
		var unit = $('#unit').val();
		if($(this).text() == '添加') {
			$.ajax('/add', {
				success: function(response) {
					console.log('ok');
				},
				type: 'post',
				data: {"name": name, "price": price, "unit": unit },
				complete: showAddProductLine(name, price, unit)
			});
		} else if($(this).text() == '更新') {
			$.ajax('/edit', {
				success: function(response) {
					console.log('ok');
				},
				type: 'post',
				data: {"name": name, "price": price, "unit": unit },
				complete: function() {

				}
			});
		}		
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
	}

	function showAddProductLine(name, price, unit) {
		var manage = '<a href="#" class="edit-product"><span class="glyphicon glyphicon-edit"></span></a>' +
            '<a href="#" class="delete-product"><span class="glyphicon glyphicon-remove"></span></a>' +
            '<label class="pull-right"><input type="checkbox">买二送一</label>';
		var listItem = $("<tr><td>" + name + "</td><td>" + price 
			+ "</td><td>" + unit + "</td><td>" + manage + "</td></tr>");
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
			openEditLayer();
		});
	}
});
$(document).ready(function() {
	$('#item-table').find('.edit-product').on('click', function(event) {
		event.preventDefault();
		openEditLayer();
	});

	$('.add-product').on('click', function(event) {
		event.preventDefault();
		openAddLayer();
	});

	$('#item-table').find('.delete-product').on('click', function(event) {
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

	$('.overlay').find('#submit').on('click', function(event){
			event.preventDefault();
			$('.overlay').fadeOut();
			var name = $('#name').val();
			var price = $('#price').val();
			var unit = $('#unit').val();
			$.ajax('/add', {
				success: function(response) {
					console.log('ok');
				},
				data: {"name": name, "price": price, "unit": unit },
				complete: showAddProductLine(name, price, unit)
			});
		});

	$('.overlay').find('#cancel').on('click', function(event) {
			event.preventDefault();
			$('.overlay').fadeOut();
		});

	function openEditLayer() {
		$('.overlay').find('#submit').text('更新');
		$('.overlay').fadeIn();
		editProduct();
	}

	function openAddLayer() {
		$('.overlay').find('#submit').text('添加');
		$('.overlay').fadeIn();
		addProduct();
	}

	function editProduct() {
	
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

	function addProduct() {
		$('#product-form')[0].reset();		
	}

	function deleteProduct() {

	}
	
	$("input[name='promotion']").click(function() {
		var tr = $(this).closest('tr');
		var item_id = parseInt(tr.attr('id'));
		var item_name = tr.children()[0].innerText;
		var url = this.checked ? "/addPromotion" : "/deletePromotion";
		$.ajax({
			type: "POST",
			url: url,
			data: {
				"item_id": item_id,
				"item_name": item_name
			},
			dataType: "json",
			error: function(e) {
				alert('Failed add the promotion on this product!');
			},
			success: function(data) {
				alert('Suceess add the promotion on this product!');
			}
		});
		
	});
});
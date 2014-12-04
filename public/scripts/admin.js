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

	function openEditLayer() {
		$('.overlay').find('#submit').text('更新');
		$('.overlay').fadeIn();
		$('.overlay').find('#cancel').on('click', function(event) {
			event.preventDefault();
			$('.overlay').fadeOut();
		});
		cancelButton();
		editProduct();
	}

	function openAddLayer() {
		$('.overlay').find('#submit').text('添加');
		$('.overlay').fadeIn();
		cancelButton();
		addProduct();
	}

	function cancelButton() {
		$('.overlay').find('#cancel').on('click', function(event) {
			event.preventDefault();
			$('.overlay').fadeOut();
			console.log('cancel press');
		});
	}

	function editProduct() {
		$('.overlay').find('#submit').on('click', function(event){
			event.preventDefault();
			$('.overlay').fadeOut();
			console.log('submit press');
		});
	}

	function addProduct() {
		$('#product-form')[0].reset();
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
				data: {"name": name, "price": price, "unit": unit }
			});
		});
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
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
});
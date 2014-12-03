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
	}

	function openAddLayer() {
		$('.overlay').find('#submit').text('添加');
		$('.overlay').fadeIn();
		$('.overlay').find('#cancel').on('click', function(event) {
			event.preventDefault();
			$('.overlay').fadeOut();
		});
	}
});
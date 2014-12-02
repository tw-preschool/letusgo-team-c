$(document).ready(function() {
	$('#item-table').find('.edit-product').on('click', function(event) {
		console.log('edit product this time');
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
});
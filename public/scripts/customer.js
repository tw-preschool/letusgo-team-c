$(document).ready(function() {
    changeNavHighlight();
});

function changeNavHighlight() {
	if(window.location.pathname == '/views/items') {
		$('.myorder').removeClass('active');
		$('.product-list').addClass('active');
	} else if(window.location.pathname == '/orders') {
		$('.product-list').removeClass('active');
		$('.myorder').addClass('active');
	} else if(window.location.pathname.indexOf('/orders/') != -1) {
		$('.product-list').removeClass('active');
		$('.myorder').addClass('active');
	}
}
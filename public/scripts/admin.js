$(document).ready(function() {
	changeNavHighlight();
	$('#item-table').find('.edit-product').on('click', function(event) {
		event.preventDefault();
		var listItem = $(this).closest('tr');
		var name = listItem.find('.product-name').text();
		var price = listItem.find('.product-price').text();
		var unit = listItem.find('.product-unit').text();
		var number = listItem.find('.product-number').text();
		var information = listItem.find('.product-information').text();
		openEditLayer(name, price, unit, number,information,listItem);
	});

	$('.add-product').on('click', function(event) {
		event.preventDefault();
		openAddLayer();
	});

	$('#item-table').find('.delete-product').on('click', function(event) {
		event.preventDefault();
		var name = $(this).closest('tr').find('td').first().text();
		$(this).closest('tr').remove();
		deleteProductByName(name);
	});

	$('.overlay').find('#cancel').on('click', function(event) {
		event.preventDefault();
		$('.overlay').fadeOut();

	});

	$("input[name='promotion']").click(function() {
		var tr = $(this).closest('tr');
		var check = this.checked;
		changePromotionStatus(tr, check);
	});
});

function changeNavHighlight() {
    if(window.location.pathname == '/admin') {
        $('.product-manage').addClass('active');
        $('.order-manage').removeClass('active');
    } else if (window.location.pathname == '/orders') {
        $('.product-manage').removeClass('active');
        $('.order-manage').addClass('active');
    } else if (window.location.pathname.indexOf('/orders/') != -1 ) {
    		$('.product-manage').removeClass('active');
        $('.order-manage').addClass('active');
    }
}

function openEditLayer(name, price, unit, number,information,listItem) {
	clearLayer();
	$('.overlay').find('#submit').text('更新');
	$('.overlay').find('#name').val(name);
	$('.overlay').find('#price').val(price);
	$('.overlay').find('#unit').val(unit);
	$('.overlay').find('#number').val(number);
  $('.overlay').find('#information').val(information);
	$('.overlay').fadeIn();
	$('.overlay').find('#submit').off();
	$('.overlay').find('#submit').on('click', function(event){
		event.preventDefault();
	  if (!validateInputInfo())
		{
			return;
		}
		$('.overlay').fadeOut();
		editProduct(name, $('#name').val(), $('#price').val(), $('#unit').val(), $('#number').val(),$('#information').val(), listItem);
	});
}

function openAddLayer() {
	clearLayer();
	$('.overlay').find('#submit').text('添加');
	$('.overlay').fadeIn();
	$('.overlay').find('#submit').off();
	$('.overlay').find('#submit').on('click', function(event){
		event.preventDefault();
		if (!validateInputInfo())
		{
			return;
		}
		$('.overlay').fadeOut();
		addProduct($('#name').val(), $('#price').val(), $('#unit').val(), $('#number').val(), $('#information').val(),"false");
	});
}

function showAddProductLine(name, price, unit, number,information, promoted, productId) {
	var listItem = generateNewProductItem(name, price, unit, number, information,promoted, productId);

	$('#item-table').find('tbody').append(listItem);

	listItem.find('.delete-product').on('click', function(event) {
		event.preventDefault();
		var productName = $(this).closest('tr').find('td').first().text();
		$(this).closest('tr').remove();
		deleteProductByName(productName);
	});

	listItem.find('.edit-product').on('click', function(event) {
		event.preventDefault();
		openEditLayer(name, price, unit, number,information,listItem);
	});

	listItem.find("input[name='promotion']").click(function() {
		var tr = $(this).closest('tr');
		var check = this.checked;
		changePromotionStatus(tr, check);
	});
}

function changePromotionStatus(tr, check) {
	var item_id = parseInt(tr.attr('id'));
	var item_name = tr.children()[0].innerText;
	var post_url = check ? "/addPromotion" : "/deletePromotion";
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

function addProduct(name, price, unit, number,information,promoted) {
	$.ajax('/add', {
		success: function(response) {
			showAddProductLine(name, price, unit, number,information, promoted, response.productId)
		},
		type: 'post',
		dataType: 'json',
		data: {"name": name, "price": price, "unit": unit, "number": number, "information":information,"promoted": promoted },
	});

}

function deleteProductByName(productName) {
	$.ajax('/delete', {
		success: function(response) {
			console.log('delete a product ok');
		},
		data: {"name": productName}
	});
}

function editProduct(name, newName, newPrice, newUnit, newNumber, newInformation,listItem) {
	$.ajax('/edit', {
		success: function(response) {
			listItem.find('.product-name').text(newName);
			listItem.find('.product-price').text(newPrice);
			listItem.find('.product-unit').text(newUnit);
			listItem.find('.product-number').text(newNumber);
			listItem.find('.product-information').text(newInformation);
		},
		type: 'post',
		data: {"name": name, "newName": newName, "price": newPrice, "unit": newUnit, "number": newNumber,"information": newInformation},
		complete: function() {

		}
	});
}

function generateNewProductItem(name, price, unit, number,information, promoted, productId) {
	var check = promoted == "true" ? "checked" : "unchecked";
	var editLink = '<a href="#" class="edit-product"><span class="glyphicon glyphicon-edit"></span></a>';
	var deleteLink = '<a href="#" class="delete-product"><span class="glyphicon glyphicon-remove"></span></a>';
	var checkBoxLink = '<label class="pull-right"><input type="checkbox" name="promotion" '+ ' ' + check +'>买二送一</label>';
	var listItem = $('<tr id=' + productId + '><td class="product-name">' + name + '</td><td class="product-price">' + price
		+ '</td><td class="product-unit">' + unit + '</td><td class="product-number">' + number + '</td><td class="product-information">'+information+'</td><td>' + editLink + deleteLink + checkBoxLink +
		'</td></tr>');
	return listItem;
}

function priceChecking() {
	var price = /^[0-9]+(\.[0-9]*)?$/;
	return price.test($('.overlay').find('#price').val()) ? "" : "商品单价设置不合理，请重新输入<br/>";
}

function productNumChecking() {
	var numberReg = /^[0-9]+$/;
	return numberReg.test($('.overlay').find('#number').val()) ? "" : "数量格式不正确，请重新输入<br/>";
}

function depictionChecking() {
	return $('.overlay').find('#information').val().length <= 10 ? "" : "商品描述信息上限为10个字，请重新输入<br/>";
}

function validateInputInfo() {
	var error_message = "";
	error_message += priceChecking() + productNumChecking() + depictionChecking();
	$('.product-information-error').html(error_message);
	return error_message == "";
}

function clearLayer() {
	$('.product-information-error').html("");
	$('#product-form')[0].reset();
}

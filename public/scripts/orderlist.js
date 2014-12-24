$(document).ready(function() {
    changeNavHighlight();
    addRemoveOrderHandler();
});

function changeNavHighlight() {
    if(window.location.pathname == '/orders') {
        $('.product-manage').removeClass('active');
        $('.order-manage').addClass('active');
    } else {
        $('.product-manage').addClass('active');
        $('.order-manage').removeClass('active');
    }
}

function addRemoveOrderHandler() {
    $("[name='remove']").click(function() {
        var guid = $(this).attr("id");
        $(this).parent().parent().remove();
        $.ajax({
            type: "POST",
            url: "/deleteOrder",
            data: {
                "guid": guid
            },
            dataType: "json",
            complete: function(data) {
            }
        });
    });
}
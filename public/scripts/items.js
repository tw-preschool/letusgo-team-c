$(document).ready(function () {
    $("button[name='add']").click(function(){
        var userid = $('#myshoppingcart').data('userid');
        if(!userid) {
            window.location.href = "/login";
            return ;
        }
        var tr = $(this).closest('tr');
        var id = parseInt(tr.attr('id'));
        var name = tr.children()[0].innerText;
        var price = parseInt(tr.children()[1].innerText);
        var unit = tr.children()[2].innerText;
        var cartNum = parseInt($("#count").html());
        $("#count").html(cartNum+1);
        $.ajax({
            type: "POST",
            url: "/items",
            data: {
                "id" : id,
                "name": name,
                "price": price,
                "unit": unit,
                "userid": userid
            },
            dataType: "json",
            success: function(){
    
            }
        });
    });
});

$(document).ready(function () {
    $("button[name='add']").click(function(){
        var tr = $(this).closest('tr');
        //var id = parseInt(tr.attr('id'));
        var name = tr.children()[0].innerText;
        var price = parseInt(tr.children()[1].innerText);
        var unit = tr.children()[2].innerText;
        var num =  parseInt(tr.children()[3].children[0].value);
        var cartNum = parseInt($("#count").html());
        $("#count").html(cartNum+num);
        $.ajax({
            type: "POST",
            url: "/items",
            data: {      
                "name": name,
                "price": price,
                "unit": unit,
                "num": num
            },
            dataType: "json",
            success: function(){
                alert('Suceess add the product in cart!');
            }
        });
    });
});
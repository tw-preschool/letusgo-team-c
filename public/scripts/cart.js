 $(document).ready(function () {
    $(".all").click(function() {
        var checked = this.checked;
        $(":checkbox").prop("checked", checked);
        if (checked) {
            $(".sub").each(calculate);
        } else {
            $("[name='total']").text("0.00");
        }
    });

    $(".sub").bind("click", {
        flag: 1
    }, calculate);

    $("button[name='plus']").bind("click", {
        flag: 1
    }, calculateByPlusAndSub);

    $("button[name='subtract']").bind("click", {
        flag: 0
    }, calculateByPlusAndSub);

    $("[name='remove']").click(function() {
        $(this).closest('tr').remove();
        var id = parseInt($(this).attr("key"));
        $.ajax('/deleteCartItem', {
            success: function(response) {
                console.log('ok');
            },
            type: 'post',
            data: {
                "id": id
            }
        });
    });

    function calculateByPlusAndSub(e) {

        if (e.data.flag == 1) {
            $input = $(this).parent().prev();
        } else {
            $input = $(this).parent().next();
        }

        var val = parseInt($input.val());

        $td = $(this).closest("td").siblings("td:first");

        var checked = $td.find(".sub").prop("checked");
        var subTotal = parseInt($td.parent().find("[name='subTotal']").text());
        var price = $td.next().text();
        var promoted = $td.parent().attr("promoted");
        var total = $td.parent().siblings("tr:last").find("[name='total']").text();
        var money = parseInt(total) - subTotal;

        if (e.data.flag == 1) {
            $input.val(++val);
        } else {
            if (val >= 1) {
                $input.val(--val);
            }
        }

        if (promoted == "true" && val > 2) {
            subTotal = parseInt(price) * (val - Math.floor(val / 3));
            $td.find(".show_promotion").show();
        } else {
            subTotal = parseInt(price) * val;
            $td.find(".show_promotion").hide();
        }

        money += subTotal;

        $td.parent().find("[name='subTotal']").text(subTotal);
        if (checked) {
            $td.parent().siblings("tr:last").find("[name='total']").text("0");
            $(".sub").each(calculate);
        }
    }

    function calculate() {
        $td = $(this).parent();
        var subTotal = $td.parent().find("[name='subTotal']").text();
        var totalNode = $td.parent().siblings("tr:last").find("[name='total']");
        var newMoney = this.checked ? (parseInt(totalNode.text()) + parseInt(subTotal)) : (parseInt(totalNode.text()) - parseInt(subTotal));
        totalNode.text(newMoney);
    }
    $(".all").click();

    function payment(){
        $td = $(this).parent();
        var subTotal = $td.parent().find("[name='subTotal']").text();
        var totalNode = $td.parent().siblings("tr:last").find("[name='total']");
        var newMoney = this.checked ? (parseInt(totalNode.text()) + parseInt(subTotal)) : (parseInt(totalNode.text()) - parseInt(subTotal));
        totalNode.text(newMoney);
    }

    $("[name='payment']").click(function(){
       
        $(this).attr('href','/payment?name=zxf')
    });
});
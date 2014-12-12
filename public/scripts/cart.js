 $(document).ready(function () {
    $(".all").click(function(){
        var checked = this.checked;
        $(":checkbox").prop("checked",checked);
        if(checked){
            $(".sub").each(calculate);
        }else{
            $("[name='total']").text("0.00");
        }
    });

    $(".sub").bind("click",{flag:1},calculate);

    $("button[name='plus']").bind("click",{flag:1},calculateByPlusAndSub);

    $("button[name='subtract']").bind("click",{flag:0},calculateByPlusAndSub);
    
    var record;
    var key;
    $("input[name='number']").keydown(function(e){
        record = this.value;
        key = e.keyCode;
        if(key == 8){
            this.value = record;
        }   
    });

    $("input[name='number']").keyup(function() {
        if (key == 8) {
            this.value = record;
        } else {
            this.value = this.value.replace(/[^\d]/g, record);
        }
    });

    $("input[name='number']").blur(function(){
        if(this.value == ""){
            this.value = record;
        }
    });
    

    $("[name='remove']").click(function(){
        $(this).closest('tr').remove();
        var id = parseInt($(this).attr("key"));
        $.ajax('/deleteCartItem', {
                success: function(response) {
                    console.log('ok');
                },
                type: 'post',
                data: {"id": id}
            });
    });

    function calculateByEdit(){
        $td = $(this).closest("td").siblings("td:first");
        var checked = $td.find(".sub").prop("checked");
        var price = $td.next().text();
       
        var total = $td.parent().siblings("tr:last").find("[name='total']").text();
        var money = parseInt(total);
        if(checked){
            var newMoney = parseInt(money)+
            $td.parent().siblings("tr:last").find("[name='total']").text();
        }
    }

    function calculateByPlusAndSub(e){

        if (e.data.flag == 1) {
            $input = $(this).parent().prev();
        } else {
            $input = $(this).parent().next();
        }

        var val = parseInt($input.val());

        $td = $(this).closest("td").siblings("td:first");

        var checked = $td.find(".sub").prop("checked");
        var subTotal;
        var price = $td.next().text();
        var promoted = $td.parent().attr("promoted");
        var total = $td.parent().siblings("tr:last").find("[name='total']").text();
        var money = parseInt(total);

        if (e.data.flag == 1) {
            $input.val(++val);
            money += parseInt(price);
        } else {
            if (val >= 1) {
                $input.val(--val);
                money -= parseInt(price);
            }
        }

        if (promoted == "true" && val > 2) {
            subTotal = parseInt(price) * (val - 1);
            $td.find(".show_promotion").show();
        } else {
            subTotal = parseInt(price) * val;
            $td.find(".show_promotion").hide();
        }

        $td.parent().find("[name='subTotal']").text(subTotal);
        if (checked) {
            $td.parent().siblings("tr:last").find("[name='total']").text("0");
            $(".sub").each(calculate);
        }
    }

    function calculate(){
        $td = $(this).parent();
        var subTotal = $td.parent().find("[name='subTotal']").text();
        var totalNode = $td.parent().siblings("tr:last").find("[name='total']");
        var newMoney = this.checked ? (parseInt(totalNode.text()) + parseInt(subTotal)) : (parseInt(totalNode.text()) - parseInt(subTotal));
        totalNode.text(newMoney);
    }
    $(".all").click();
});
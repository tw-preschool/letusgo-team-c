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

    $("button[name='plus']").click(function(){
        $input = $(this).parent().prev();
        var val = parseInt($input.val());
        $input.val(++val);
    });

    $("button[name='subtract']").click(function(){
        $input = $(this).parent().next();
        var val = parseInt($input.val());
        if(val > 1){
            $input.val(--val);
        }
    });

    $("input[name='number']").keyup(function(){
        this.value = this.value.replace(/[^\d]/g, '');
    });

    function calculate(e){
        var subTotal;
        $td =$(this).parent();
        var checked = this.checked;
        var price = $td.next().text();
        var promoted = $td.parent().attr("promoted");
        var num = $td.parent().find("[name='number']").val();
        var total =$td.parent().siblings("tr:last").find("[name='total']").text();
        
        if(promoted == "true" && num > 2){
            subTotal = parseInt(price) * (parseInt(num) - 1);
            $td.find(".show_promotion").show();
        }else{
            subTotal = parseInt(price) * parseInt(num);
            $td.find(".show_promotion").hide();
        }

        if(checked){
            $td.parent().find("[name='subTotal']").text(subTotal);
            $td.parent().siblings("tr:last").find("[name='total']").text(parseInt(total)+subTotal);
        }else{
            $td.parent().siblings("tr:last").find("[name='total']").text(parseInt(total)-subTotal);
        }
    }

});

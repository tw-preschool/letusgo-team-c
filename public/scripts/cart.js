$(document).ready(function () {
    $(".all").click(function(){
        $(":checkbox").prop("checked",this.checked);
    });
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

});

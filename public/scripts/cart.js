$(document).ready(function () {
    $(".all").click(function(){
        $(":checkbox").prop("checked",this.checked);
    });
});

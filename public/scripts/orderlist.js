$(document).ready(function() {
    addRemoveOrderHandler();
});

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
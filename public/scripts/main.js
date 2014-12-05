$(document).ready(function () {
  var feature = (function () {
    var initItems = function () {
      if($('#item-table').length) {
        $.ajax({
          type: "GET",
          url: "/products",
          dataType: "json",
          success: function(data) {
            var items = data;
            $.each(items, function (index, item) {
              var addCart = '<button class="btn btn-primary btn-small" id="btn-'+index+'">加入购物车</button>';
              var listItem = $('<tr class="itemRow">\
                                <td>' + item.name + '</td>\
                                <td>' + item.price + '</td>\
                                <td>' + item.unit + '</td>\
                                <td>' + addCart + '</td>\
                                </tr>');
              $('#item-table').append(listItem);
            });
            $('.itemRow button').click(function(event) {
              event.preventDefault();
              var itemIndex = parseInt($(event.target).attr("id").split("-")[1]);
              //shopping cart should do something
              //the counter of cart should updata
            });
          }
        });
      }
    };

    var printDate = function() {
      $("#pay-date").text(utils.getDate());
    };

    return {
      init: initItems,
      printDate: printDate
    };
  })();

  feature.init();
  feature.printDate();
});

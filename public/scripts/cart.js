 $(document).ready(function() {
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

         if (checked) {
             $td.parent().siblings("tr:last").find("[name='total']").text("0");
             $(".sub").each(calculate);
         } else {
             var subTotal = calculateSubTotal($td);
             $td.parent().find("[name='subTotal']").text(subTotal);
         }
     }

     function calculateSubTotal($td) {
         var promoted = $td.parent().attr("promoted");
         var price = $td.next().text();
         var val = parseInt($td.parent().find("[name='number']").val());
         var subTotal = $td.parent().find("[name='subTotal']").text();

         if (promoted == "true" && val > 2) {
             subTotal = parseInt(price) * (val - Math.floor(val / 3));
             $td.find(".show_promotion").show();
         } else {
             subTotal = parseInt(price) * val;
             $td.find(".show_promotion").hide();
         }

         $td.parent().find("[name='subTotal']").text(subTotal);
         return subTotal;

     }

     function calculate() {
         $td = $(this).parent();
         var subTotal = calculateSubTotal($td);
         var totalNode = $td.parent().siblings("tr:last").find("[name='total']");
         var newMoney = this.checked ? (parseInt(totalNode.text()) + parseInt(subTotal)) : (parseInt(totalNode.text()) - parseInt(subTotal));
         totalNode.text(newMoney);
     }
     $(".all").click();

     function creatGuid() {
         var guid = "";
         for (var i = 1; i <= 32; i++) {
             var n = Math.floor(Math.random() * 16.0).toString(16);
             guid += n;
         }
         return guid;
     }

     $("[name='payment']").click(function() {
         var totalSavingMoney = 0.00;
         var payment_list = {
             shopping_items: [],
             promotion_items: [],
             totalMoney: 0.00,
             totalSavingMoney: 0.00
         };

         function payment() {
             var $td = $(this).parent();
             var promoted = $td.parent().attr("promoted");
             var name = $(this).next().text();
             var $price = $td.next();
             var price = new Number($price.text());
             var unit = $price.next().text();
             var num = parseInt($td.parent().find("input[name='number']").val());
             var subTotal = parseInt($td.parent().find("[name='subTotal']").text());
             if (this.checked && num > 0) {
                 payment_list.shopping_items.push({
                     name: name,
                     price: price,
                     unit: unit,
                     num: num,
                     subTotal: subTotal
                 });
                 if (promoted == "true" && Math.floor(num / 3) > 0) {
                     payment_list.promotion_items.push({
                         name: name,
                         unit: unit,
                         num: Math.floor(num / 3)
                     });
                     totalSavingMoney += (price * num) - subTotal;
                 }
             }
             payment_list.totalSavingMoney = totalSavingMoney;
             payment_list.totalMoney = parseInt($("[name='total']").text());
         }
         $(".sub").each(payment);
         //sessionStorage.setItem("payinfo", JSON.stringify(payment_list));
         $.post("/payment", {
                 guid: creatGuid(),
                 list: JSON.stringify(payment_list)
             },
              function(data) {
                // location.href = '/orders';
             });
        });
 });

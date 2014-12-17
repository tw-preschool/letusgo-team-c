$(document).ready(function(){

  $('#customerEmail_null').hide();
  $('#customerEmail_wrong').hide();
  $('#customerPassword_null').hide();
  $('#customerPassword_wrong').hide();
  $('#customerName_null').hide();
  $('#customerName_wrong').hide();
  $('#customerAddress_wrong').hide();
  $('#customerTelphone_null').hide();
  $('#customerTelphone_wrong').hide();


  $('#register').on("click",function(event){
    event.preventDefault();

    var customerEmail = $('#customerEmail').val();
    var customerPassword  = $('#customerPassword').val();
    var customerName  = $('#customerName').val();
    var customerAddress  = $('#customerAddress').val();
    var customerTelephone  = $('#customerTelphone').val();

    var emailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var isCusEmail = isCheck(customerEmail,emailReg);
    if(customerEmail === ""){
      $('#customerEmail_null').show();
      $('#customerEmail_wrong').hide();
    }else if(isCusEmail === false){
      $('#customerEmail_null').hide();
      $('#customerEmail_wrong').show();
    }else{
      $('#customerEmail_null').hide();
      $('#customerEmail_wrong').hide();
    }

    var passwordReg = /^[a-z0-9]{6,25}$/;
    var isCusPassword = isCheck(customerPassword,passwordReg);
    if(customerPassword === ""){
      $('#customerPassword_null').show();
      $('#customerPassword_wrong').hide();
    }else if(isCusPassword === false){
      $('#customerPassword_null').hide();
      $('#customerPassword_wrong').show();
    }else{
      $('#customerPassword_null').hide();
      $('#customerPassword_wrong').hide();
    }

    var nameReg = /^[a-z ]{1,100}$/;
    var isCusName  = isCheck(customerName,nameReg);
    if(customerName === ""){
      $('#customerName_null').show();
      $('#customerName_wrong').hide();
    }else if(isCusName === false){
      $('#customerName_null').hide();
      $('#customerName_wrong').show();
    }else{
      $('#customerName_null').hide();
      $('#customerName_wrong').hide();
    }

    var addressReg  = /^[a-z 0-9.-]{1,100}$/;
    var isCusAddress = isCheck(customerAddress,addressReg);
    if(isCusAddress === false){
      $('#customerAddress_wrong').show();
    }else{
      $('#customerAddress_wrong').hide();
    }

    var telReg = /^[0-9-]{8,11}$/;
    var isCusTel = isCheck(customerTelephone,telReg);
    if(customerTelephone === ""){
      $('#customerTelphone_null').show();
      $('#customerTelphone_wrong').hide();
    }else if(isCusTel === false){
      $('#customerTelphone_null').hide();
      $('#customerTelphone_wrong').show();
    }else{
      $('#customerTelphone_null').hide();
      $('#customerTelphone_wrong').hide();
    }

    function isCheck(element,reg){
      if(element !== ""){
        var isok = reg.test(element);
        if(!isok){
          return false;
        }else{
          return true;
        }
      }
    }

    if(isCusEmail === true && isCusPassword === true && isCusName === true &&
       isCusAddress !== false && isCusTel === true){
      alert("注册成功");
      sendMessage(customerEmail,customerPassword,customerName,customerAddress,customerTelephone);
    }else{
      alert("注册失败");
    }

  });
});

  var sendMessage = function(name,password){
    $.ajax({
      type: "POST",
      url: "/register",
      data: {"customerEmail":customerEmail,"customerPassword":customerPassword,"customerName":customerName,
             "customerAddress":customerAddress,"customerTelephone":customerTelephone},
      dataType: "json",
      success: function(data){
        if(data === true){
          alert("注册成功!");
          window.location.href = "/";
        }else{
          alert("注册失败");
        }

      }
    });
  };

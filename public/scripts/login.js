$(document).ready(function(){
  showOrLoginUser();
  $('#logout').on("click",function(event){
    event.preventDefault();
      $.ajax({
        type: "POST",
        url: "/logout",
        dataType: "json",
        success: function(data){
        if(data === false){
          return;
         }
         else
           {
             window.location.href = "/login";
           }
        }
      });
  });

  var loginUrl="/login";
  $(":radio").each(function(){
    $(this).click(function(){
      if(this.checked == true)
        {
          if($(this).attr("id") == "customLogin")
            loginUrl = "/customlogin";
          else
            loginUrl = "/login";
        }
    });
  });
  $('#login').on("click",function(event){
    event.preventDefault();
    var name = $('#username').val();
    var password  = $('#password').val();

    if(name.length === 0 || password.length === 0)
      {
        alert("请输入用户名和密码");
        return;
      }
    sendMessage(name,password,loginUrl);
    });

    $('#register').on("click",function(event){
      event.preventDefault();
       window.location.href = "/register";
      });

});

var sendMessage = function(name,password,loginUrl){
  $.ajax({
    type: "POST",
    url: loginUrl,
    data: {"name":name,"password":password},
    dataType: "json",
    success: function(data){
      if(loginUrl == "/login"){
        if(data === true )
        {
          window.location.href = "/admin";
        }
        else
        {
          window.location.href = "/login";
        }

      }
      if(loginUrl == "/customlogin")
      {
        if(data === "user_not_exit")
        {
          alert("用户不存在，请重新输入用户名!");
          window.location.href = "/login";
        }
        else if(data == "password_error")
        {
          alert("输入密码错误，请从新输入");
          window.location.href = "/login";
        }
        else
        {
          window.location.href = "/views/items";
        }
      }
    }
  });
};

var showOrLoginUser = function(){
  $.ajax({
    type:"GET",
    url:"/showUser",
    dataType:"json",
    success:function(data){
     if(data === false)
       {
         $("#title-login").find("span").text("登陆");
       }
     else
       {
         $("#title-login").find("span").text(data);
       }
    }
  });
  $("#title-login").on("click",function(event){
    event.preventDefault();
    if($(this).find("span").text() == "登陆")
      {
        window.location.href = "/login";
      }
  });
};

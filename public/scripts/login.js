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
          alert("用户未登陆，请重新登陆!");
          return;
         }
         else
           {
             alert("用户退出成功");
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

  $('#cancel').on("click",function(event){
    event.preventDefault();
    window.location.href = "../index.html";
  });
});

var sendMessage = function(name,password,loginUrl){
  $.ajax({
    type: "POST",
    url: loginUrl,
    data: {"name":name,"password":password},
    dataType: "json",
    success: function(data){
      if(data === true && loginUrl == "/login"){
        alert("管理员登陆成功!");
        window.location.href = "/admin";
      }
      else if(data === true && loginUrl == "/customlogin")
      {
         alert("用户登陆成功");
         window.location.href = "/views/items";
      }
      else{
         alert("登陆失败，请重新登陆!");
         window.location.href = "/login";
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

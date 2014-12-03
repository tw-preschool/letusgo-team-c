$(document).ready(function(){
  $('#admin').click(function(){
    var name = $('#username').val();
    var password  = $('#password').val();

    if(name.length === 0 || password.length === 0)
      {
        alert("请输入用户名和密码");
        return;
      }

    $.ajax({
      type: "GET",
      url:"/",
      data: {"name":name,"password":password},
      dataType: "html",
      success: function(){
        alert("登陆成功");
      },
      error: function(){
        alert("请输入正确的用户名和密码");
      }
    });
  });
});

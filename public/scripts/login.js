$(document).ready(function(){

  $('button').on("click",function(event){
    event.preventDefault();
    var name = $('#username').val();
    var password  = $('#password').val();
    if(name.length === 0 || password.length === 0)
      {
        alert("请输入用户名和密码");
        return;
      }
    sendMessage(name,password);
    });
});
var sendMessage = function(name,password){

  $.ajax({
    type: "POST",
    url: "/login",
    data: {"name":name,"password":password},
    dataType: "json",
    success: function(data){
      if(data === true){
        alert("登陆成功");
      }else{
        alert("登陆失败，请重新登陆!");
      }

    }
  });
};

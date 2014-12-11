$(document).ready(function () {
  var flag = true;
  $("a").click(function(){
      flag = false;
  });
  /* window.onbeforeunload = function(e){
     return false;
  };*/
  window.onunload = function(e){
     if(flag){
        $.post("/close");
     }
  };
});

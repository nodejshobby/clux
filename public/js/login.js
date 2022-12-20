$(document).ready(function(){
   
    var login_buttton = $("#login_btn");
    var message = $("#message");

    login_buttton.on('click',function(e){
        e.preventDefault();
        login_buttton.text("Processing...");
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var settings = {
            "url": "http://localhost:3000/login",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
            },
            "data": JSON.stringify({
              "username": username,
              "password": password
            }),
          };
          
          $.ajax(settings).done(function(response) {
            if(response.error){
                message.html("<div class='alert alert-danger'>" + response.message + '</div>');
                login_buttton.text("Login");
            }else{
                var url = "/listclasses";
                $(location).attr('href',url);            }
          });
    })
    
})
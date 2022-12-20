$(document).ready(function(){
    $("#add_btn").on('click', function(e){
        e.preventDefault();
        $("#add_btn").text = "Processing...";
        var description = $("#description").value;
        var start = $("#start").value;
        var end = $("#end").value;
        var message = $("#message");

        var max_participants = $("#max_participants").value;
        var record_class = $("record_class").value

        var settings = {
            "url": "http://localhost:3000/addclass",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
            },
            "data": JSON.stringify({
              "description": description,
              "start": start,
              "end": end,
              "max_participants": max_participants,
              "record_class": record_class,
            }),
          };
          
          $.ajax(settings).done(function (response) {
            if(!response.error){
                message.html("<div class='alert alert-success'>" + response.message + '</div>');
                $("add_btn").text('<i class="fa fa-plus"></i> Create')
            }
          });
    })
   
})


function myDateToIso(date){
    var dtx = new Date(date);
    return dtx.toISOString();
}
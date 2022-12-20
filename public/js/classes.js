$(window).on('load',function(){
    var class_div = $("#class");

    var settings = {
        "url": "http://localhost:3000/classes",
        "method": "GET",
      };
      
      $.ajax(settings).done(function (response) {
        if(response.error){
            var url = "/login";
            $(location).attr('href',url);     
        }else{
            var classes = response.results;
            var dataHtml = '<a href="/addclass" class="btn btn-light text-primary"><i class="fa fa-plus"></i> Create Virual Class</a>';
            classes.forEach(cls => {
                dataHtml = dataHtml + `<div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <img src="${cls.teacher_avatar}" class="img-fluid img-circle" alt="...">
                      <h5 class="card-title mt-2"> Teacher: ${cls.teacher_first_name} ${cls.teacher_last_name}</h5>
                      <p class="card-text">${cls.description ? cls.description : "No decription"}</p>
                      <a href="#" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i> Update</a> 
                      <a href="#" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> Delete</a>
                    </div>
                </div>
            </div>`
            });
            class_div.html(dataHtml);
            console.log(classes);
        }
      });    
})
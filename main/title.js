let open = false;
$(document).ready(function(){
    $(".page").hide();
        $("button").mousedown(function(){
            if(open){
                $(".page").hide();
            }
            else{
                $(".page").show();
            }
            open=!open;
        });
});
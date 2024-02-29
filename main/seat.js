$(document).ready(function(){
  

  $(".grid-item").hide();
  
  $("#btn").click(function(){
    let row = $("#row").val();
    let column = $("#column").val();
    let x = 0;
    $('.flex-container').append('<div class="output-container"><div class="table"><h3>講桌</h3></div><div class="grid-container"></div></div>')
    for(var i = 1; i <= row; i++){
        $('.grid-container').append(`<div id = "${i}"></div>`)
        for(var j = 1; j <= column; j++){

        $(`#${i}`).append(`<div class="grid" id="p${x}"></div>`)
        x +=1;
        }
    }
    let sum = row * column;
    let arrNum=[];
      
      for(var i = 0; i < row*column; i++) {
        var cur = Math.floor(Math.random()*sum) + 1;
        
        while(arrNum.includes(cur)){
          cur = Math.floor(Math.random()*sum) + 1;
        }
        arrNum.push(cur);

      }
      for(var i = 0; i < row*column ; i++){
        $(`#p${i}`).append(`<h3 class="seat">${arrNum[i]}</h3>`);
      }


  });
      
  });

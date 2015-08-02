//create and display random bubbles inside that area...

function createRandomBubbles( number) {
    var bubblesArray = [];
    
    var temp;
    for(var i=0;i<number;i++) {
        temp=document.createElement("div");
        bubblesArray.push($(temp));
        
        $(bubblesArray[i]).css("display","none");
    }
    
    return bubblesArray;
}

function moveBubble(bubble) {
    
    $(bubble).show();
    //console.debug($(bubble).position());
    $(bubble).animate({
        top:0
    },{ duration: 4000, queue: false },function() {
        $(bubble).fadeOut("slow",function(){
            $(this).remove();
        });
    });

//    setInterval(function() {
//
//        //console.debug($(bubble).position().top);
//        if ($(bubble).position().top<=0) {
//            
//           $(bubble).fadeOut("slow",function() {
//               $(bubble).remove();
//               return;
//           }) 
//        } 
//        $(bubble).css("top",
//            //$(bubble).position().top-Math.floor((Math.random()+50)+1));
//            $(bubble).position().top-$(bubble).outerHeight()/2);
//    }, 10);
}

function attachBubbles() {
    var bubblesArray = createRandomBubbles(70);
    var colorArray=['#C0E0DA','#67C7E2','#C6C6FF'];
    var temp;
    
    for(var i=0;i<bubblesArray.length;i++) {
        
        temp = Math.floor((Math.random()*100)+1);
        $("body").append(bubblesArray[i]);
        $(bubblesArray[i]).addClass("dynamicBubble")
        .css({
                                //"background-color":colorArray[i%3],
                                "height": temp,
                                "width": temp,
                                "left": Math.floor((Math.random()*($("body").outerWidth()-100))+1),
                                //"top": Math.floor((Math.random()*$("body").outerHeight())+1)
                                "top": Math.floor((Math.random()*($(document).height()-100))+1)
                                
                                

                                }
                                );
                                    
        //begin animating these bubbles now, that they are added into the DOM.
        moveBubble(bubblesArray[i]);    
                                    
    }
    
    
        
}


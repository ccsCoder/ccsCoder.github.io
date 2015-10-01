/**
 * @Author: Neo
 * 
 */
var firstTime=true;
var currentlyAnimating = 0;
var intervalID;
$(document).ready(function() {
    $(document).bind("click",function(event) {
        startEverythingWithOffset(event);
    });
    
    demoAnimation();
    
    $("#footer").find("a").bind("click",function(event) {
        event.stopPropagation();
    })
    
    
});




function demoAnimation() {
    var event = jQuery.Event("click");
    event.clientX = $(window).width()/2-300;
    event.clientY = 50;
    event.pageX = event.clientX;
    event.pageY = event.clientY;
    $(document).trigger(event);
    
    setTimeout(function(){
        var event = jQuery.Event("click");
        event.clientX = $(window).width()/2-300;
        event.clientY = $(window).height()/2-30;
        event.pageX = event.clientX;
        event.pageY = event.clientY;
        $(document).trigger(event);
    }, 2000);
    
    setTimeout(function(){
        $("#messageBoard").slideDown("slow").delay(1500).fadeOut("slow");
        
    },7000);
    
    

}

function startEverythingWithOffset(event) {
    var i=0;
    intervalID = setInterval(function() {
        animateThis(i++,event);
    }, 200);
}

function animateThis(index,event) {
    if (currentlyAnimating>=$(".dynamicText").size()) {
        currentlyAnimating=0;
        clearInterval(intervalID);
        return;
    }
   
    $(".dynamicText:eq("+index+")").animate(
    {
        "left":(event.pageX+(index*30))+"px",
        "top":event.pageY+"px"
               
    }, 500, "easeInExpo");
       
}
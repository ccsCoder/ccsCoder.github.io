$(document).ready(function() {
	$(".experiment_item").on("click",function(event) {
		window.open($(this).attr("link_to_follow"),"_blank");
	});
	$(".topNavItem").on("click",function(event) {
		scrollToTarget("#"+$(this).attr("scrollTarget"));
	});
});


function scrollToTarget(scrollTarget) {
    $('html, body').animate({
        scrollTop: $(scrollTarget).offset().top
    }, 2000);
}
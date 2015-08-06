$(document).ready(function() {
	$(".experiment_item").on("click",function(event) {
		window.open($(this).attr("link_to_follow"),"_blank");
	});
});


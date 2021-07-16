$(document).ready(function() {
	var infoOpen = false;
	$('.nav-link').not("#propertiesLink").on('mouseenter', function() {
		$(this).stop().animate({
			borderColor: '#003ea5',
		}, 150);
	}).on('mouseleave', function() {
		$(this).stop().animate({
			borderColor: 'transparent',
		}, 150);
	});
	$('#propertiesLink').on('mouseenter', function() {
		$(this).stop().animate({
			backgroundColor: 'transparent',
			color: '#000000'
		}, 150);
	}).on('mouseleave', function() {
		$(this).stop().animate({
			backgroundColor: '#003ea5',
			color: '#ffffff'
		}, 150);
	});
	$("#contactInfoRow").on("click", function() {
		if(infoOpen) {
			infoOpen = false;
			$(".mobileContactInfoView").stop().animate({
				height: "0px"
			}, 150);
		}
		else {
			if($(window).width() < 991) {
				infoOpen = true;
				$(".mobileContactInfoView").stop().animate({
					height: "100px"
				}, 150);
			}
		}
	})

	function resize() {
    if(infoOpen) {
			infoOpen = false;
			$(".mobileContactInfoView").stop().animate({
				height: "0px"
			}, 150);
		}
  }

  window.onresize = resize;
});
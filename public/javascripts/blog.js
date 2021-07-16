$(document).ready(function() {
	if(platform.os.family == "Android" || platform.os.family == "iOS")
	{
		$(".blogParallax").css("background-image", "url('/images/fwdprincetonpictures/Nassau Princeton NJ 08540 USA-large-013-6-Community photos-1500x1000-72dpi.jpg')");
	}
	$('.blogImgOverlay').on('mouseenter', function() {
		$(this).stop().animate({
			backgroundColor: 'rgba(0,0,0,0.2)'
		}, 200);
		$(this).find('p').stop().animate({
			marginLeft: '10px',
			opacity: '1'
		}, 200, 'easeOutExpo');
	}).on('mouseleave', function() {
		$(this).stop().animate({
			backgroundColor: 'rgba(0,0,0,0)'
		}, 200);
		$(this).find('p').stop().animate({
			marginLeft: '50px',
			opacity: '0'
		}, 200);
	});
});
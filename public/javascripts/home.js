$(document).ready(function() {
	if(platform.os.family == "Android" || platform.os.family == "iOS")
	{
		$(".homeParallax").css("background-image", "url('/images/fwdprincetonpictures/Nassau Princeton NJ 08540 USA-large-008-7-Community photos-1500x1000-72dpi.jpg')");
	}
	var animatingWhite = false;
	var animatingClear = false;
	var animatingPropTitle = false;
	var animatingPropRowOne = false;
	var animatingPropRowTwo = false;
	var animatingContact = false;
	var isWhite = false;
	var isClear = true;
	var animatingBalloon = false;
	var dropdown = false;
	//$('.nav-link').css('color', '#ffffff');
	$(window).on('resize scroll',function() {
		//Make navbar visible/invisible on scroll
		/*if(document.documentElement.scrollTop > 50 || document.body.scrollTop > 50)
		{
			if(!animatingWhite && isClear)
			{
				animatingWhite = true;
				$('.navbar').stop().animate({
					backgroundColor: '#ffffff',
					borderBottomColor: '#dddddd'
				}, 200, function() {
					animatingWhite = false;
					isWhite = true;
					isClear = false;
				});
				$('.nav-link').not("#propertiesLink").stop().animate({
					color: '#000000'
				}, 200);
				$('.navbar-toggler .icon-bar').stop().animate({
					backgroundColor: '#777777'
				}, 200);
			}
		}
		else
		{
			if(!animatingClear && isWhite)
			{
				animatingClear = true;
				$('.navbar').stop().animate({
					backgroundColor: 'transparent',
					borderBottomColor: 'transparent'
				}, 200, function() {
					animatingClear = false;
					isWhite = false;
					isClear = true;
				});
				$('.nav-link').stop().animate({
					color: '#ffffff'
				}, 200);
				$('.navbar-toggler .icon-bar').stop().animate({
					backgroundColor: '#ffffff'
				}, 200);
			}
		}*/

		/*if($('.mission').isInViewport())
		{
			var elementTop = $('.mission').offset().top;
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
			var difference = viewportBottom - elementTop;
			if(difference > 0 && difference < 1600)
			{
				$('.mission').css({'paddingTop': difference/4, 'paddingBottom': (400 - difference/4) + 80});
			}
		}*/
		
		$('#featuredProperties').isInViewportFade(50);
		$('.featuredCol').isInViewportLoopFade(100);
		$('#contactContainer').isInViewportFade(150);
	});

	$.fn.isInViewport = function() {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$.fn.isInViewportFade = function(offsetTop) {
		var elementTop = $(this).offset().top;
		var elementBottom = elementTop + $(this).outerHeight();
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();
		if(elementBottom > viewportTop && elementTop < viewportBottom - offsetTop) {
			$(this).animate({
				opacity: 1.0
			}, 800, 'easeOutQuad');
		}
	};

	$.fn.isInViewportLoopFade = function(offsetTop) {
		for(var i = 0; i < $(this).length; i++)
		{
			var elementTop = $(this).eq(i).offset().top;
			var elementBottom = elementTop + $(this).eq(i).outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
			if(elementBottom > viewportTop && elementTop < viewportBottom - offsetTop) {
				$(this).eq(i).animate({
					opacity: 1.0
				}, 800, 'easeOutQuad');
			}
		}
	};

	$('#featuredProperties').isInViewportFade(50);
	$('.featuredCol').isInViewportLoopFade(100);
	$('#contactContainer').isInViewportFade(150);

	$('#searchButton').on('mouseenter', function() {
		$(this).stop().animate({
			backgroundColor: 'transparent',
		}, 150);
	}).on('mouseleave', function() {
		$(this).stop().animate({
			backgroundColor: '#003ea5',
		}, 150);
	});

	$('#contactButton').on('mouseenter', function() {
		$(this).stop().animate({
			opacity: 0.7
		}, 150);
	}).on('mouseleave', function() {
		$(this).stop().animate({
			opacity: 1
		}, 150);
	});

	/*$(document).bind('scroll', function(e) {
		var scrollTop = $(this).scrollTop();
		var height = $(window).height();
		var elementTop = $('#ourMissionImg').offset().top;
		if(scrollTop > elementTop - height + 100 && !animatingBalloon)
		{
			animatingBalloon = true;
			$('#ourMissionImg').stop().animate({
				marginTop: '0px',
				opacity: 1.0 
			}, 2000, 'easeInOutQuad');
		}
	});*/

	//Make navbar invisible/visible when clicking hamburger
	/*$('#navbar-toggler').on('click', function() {
		if(document.documentElement.scrollTop <= 50)
		{
			if(!dropdown)
			{
				dropdown = true;
				$('.navbar').stop().animate({
					backgroundColor: "#ffffff",
					borderBottomColor: "#dddddd" 
				}, 200);
				$('.nav-link').stop().animate({
					color: '#000000'
				}, 200);
				$('.navbar-toggler .icon-bar').stop().animate({
					backgroundColor: '#777777'
				}, 200);
			}
			else
			{
				dropdown = false;
				$('.navbar').stop().animate({
					backgroundColor: "transparent",
					borderBottomColor: "transparent" 
				}, 200);
				$('.nav-link').stop().animate({
					color: '#ffffff'
				}, 200);
				$('.navbar-toggler .icon-bar').stop().animate({
					backgroundColor: '#ffffff'
				}, 200);
			}
		}
	});*/

	$('#propertiesLink').on('mouseenter', function() {
		if(document.documentElement.scrollTop > 50 || document.body.scrollTop > 50)
		{
			$(this).stop().animate({
				backgroundColor: 'transparent',
				color: '#000000'
			}, 150);
		}
		else
		{
			$(this).stop().animate({
				backgroundColor: 'transparent',
			}, 150);
		}
	}).on('mouseleave', function() {
		if(document.documentElement.scrollTop > 50 || document.body.scrollTop > 50)
		{
			$(this).stop().animate({
				backgroundColor: '#003ea5',
				color: '#ffffff'
			}, 150);
		}
		else
		{
			$(this).stop().animate({
				backgroundColor: '#003ea5',
			}, 150);
		}
	});

	$(".featuredOverlay").on("mouseenter", function() {
		$(this).stop().animate({
			backgroundColor: 'rgba(11,63,158,0.5)'
		}, 250);
		$(this).find(".featuredContent").stop().animate({
			opacity: '0.7'
		}, 250);
		$(this).find(".searchIcon").addClass('animate').stop().animate({
			opacity: '1'
		}, 250);
	}).on("mouseleave", function() {
		$(this).stop().animate({
			backgroundColor: 'rgba(0,0,0,0.15)'
		}, 250);
		$(this).find(".featuredContent").stop().animate({
			opacity: '1'
		}, 250);
		$(this).find(".searchIcon").removeClass('animate').stop().animate({
			opacity: '0'
		}, 250);
	});
});
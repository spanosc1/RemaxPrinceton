$(document).ready(function() {
	if(platform.os.family == "Android" || platform.os.family == "iOS")
	{
		$(".agentsParallax").css("background-image", "url('/images/fwdprincetonpictures/Nassau Princeton NJ 08540 USA-large-013-6-Community photos-1500x1000-72dpi.jpg')");
	}
	var clickedSubmit = false;

	$('#agentModal').on('hidden.bs.modal', function () {
		//Reset contact form area
		$('.agentContactForm').css({
			opacity: 0,
			display: "none"
		});
		$("#agentModalContactContainer").css({
			opacity: 1,
			display: "block"
		});
		clickedSubmit = false;
		$("#agentSendText").text("Send");

		$("#agentContactName").val('');
		$("#agentContactEmail").val('');
		$("#agentContactMessage").val('');
		$("#agentEmail").text('');
	});

	$('#modalDismiss').on('click', function() {
		$('.agentBioModal').text('');
		$('#agentModal').modal('hide');
	});

	$(window).on('resize scroll',function() {
		$('.agentCard').isInViewportLoop(100);
		$('#contactContainer').isInViewport(150);
	});

	$.fn.isInViewport = function(offsetTop) {
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

	$.fn.isInViewportLoop = function(offsetTop) {
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
	
	$('.agentCard').isInViewportLoop(100);


	$('#contactContainer').isInViewport(150);

	$(".agentImageOverlay").on("mouseenter", function() {
		$(this).stop().animate({
			opacity: '1'
		}, 150);
	}).on("mouseleave", function() {
		$(this).stop().animate({
			opacity: '0'
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

	$(".agentContactButton").on("mouseenter", function() {
		$(this).stop().animate({
			backgroundColor: 'transparent'
		}, 150);
		$('.contactMeText').stop().animate({
			color: '#d81929'
		}, 150);
	}).on("mouseleave", function() {
		$(this).stop().animate({
			backgroundColor: '#d81929'
		}, 150);
		$('.contactMeText').stop().animate({
			color: '#ffffff'
		}, 150);
	}).on("click", function() {
		$("#agentSendText").css("color", '#ffffff');
		$('#agentModalContactContainer').animate({
			opacity: 0
		}, 150, function() {
			$("#agentModalContactContainer").css("display", "none");
			$(".agentContactForm").css("display", "block").animate({
				opacity: 1
			}, 150);
		});
	});

	$("#agentContactSend").on("click", function() {
		if(!clickedSubmit)
		{
			clickedSubmit = true;
			var name = $("#agentContactName").val();
			var email = $("#agentContactEmail").val();
			var message = $("#agentContactMessage").val();
			if(name == '' || email == '' || message == '')
			{
				console.log('no');
				clickedSubmit = false;
				$('#formIncomplete').css("display", "flex").stop().animate({
					opacity: 1,
					marginTop: '30px'
				}, 200, 'easeOutQuad');
				setTimeout(function() {
					$('#formIncomplete').stop().animate({
						opacity: 0,
						marginTop: '-10px'
					}, 200, 'easeOutQuad', function() {
						$('#formIncomplete').css("display", "none");
					});
				}, 1500)
			}
			else
			{
				$("#agentContactSend").css({
					opacity: 0.3
				});
				var agentEmail = $("#agentEmail").text();
				var currentURL = window.location.origin;
				$.post(currentURL + "/emailagent",
					{
						name,
						email,
						message,
						agentEmail
					},
					function(data, status){
						console.log(data, status);
						clickedSubmit = false;
						$("#agentContactSend").css({
							opacity: 1
						});
						$("#agentSendText").text("Thank you!");
					}
				);
			}
		}
	})
});
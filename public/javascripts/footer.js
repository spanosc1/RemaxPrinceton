$(document).ready(function() {

	$("#reviewCarousel").slick();
	$(".arrowLeft").on('click', function() {
    $(".slick-prev").click();
  });

  $(".arrowRight").on('click', function() {
    $(".slick-next").click();
  });
	// var center = '#reviewContent1';
	// var left = '#reviewContent3';
	// var right = '#reviewContent2';
	// var animating = false;
	var submitting = false;
	// $(".fa-chevron-right").on("click", function() {
	// 	if(!animating)
	// 	{
	// 		animating = true;
	// 		$(center).removeClass("AnimatedCenter").addClass("AnimatedLeft");
	// 		$(right).removeClass("AnimatedRight").addClass("AnimatedCenter");
	// 		setTimeout(function() {
	// 			$(left).css('display', 'none').removeClass("AnimatedLeft").addClass("AnimatedRight");
	// 			var tempCenter = center;
	// 			var tempLeft = left;
	// 			var tempRight = right;
	// 			center = tempRight;
	// 			left = tempCenter;
	// 			right = tempLeft;
	// 		}, 250);
	// 		setTimeout(function() {
	// 			$(right).css('display', 'block');
	// 			animating = false;
	// 		}, 500);
	// 	}
	// })

	// $(".fa-chevron-left").on("click", function() {
	// 	if(!animating)
	// 	{
	// 		animating = true;
	// 		$(center).removeClass("AnimatedCenter").addClass("AnimatedRight");
	// 		$(left).removeClass("AnimatedLeft").addClass("AnimatedCenter");
	// 		setTimeout(function() {
	// 			$(right).css('display', 'none').removeClass("AnimatedRight").addClass("AnimatedLeft");
	// 			var tempCenter = center;
	// 			var tempLeft = left;
	// 			var tempRight = right;
	// 			left = tempRight;
	// 			right = tempCenter;
	// 			center = tempLeft;
	// 		}, 250);
	// 		setTimeout(function() {
	// 			$(left).css('display', 'block');
	// 			animating = false;
	// 		}, 500);
	// 	}
	// });
	
	$("#submitEmailButton").on("click", function() {
		if($("#emailInput").val() == '')
		{
			$('#newsletterIncomplete').css("display", "flex").stop().animate({
				opacity: 1,
				marginTop: '175px'
			}, 200, 'easeOutQuad');
			setTimeout(function() {
				$('#newsletterIncomplete').stop().animate({
					opacity: 0,
					marginTop: '145px'
				}, 200, 'easeOutQuad', function() {
					$('#newsletterIncomplete').css("display", "none");
				});
			}, 1500);
		}
		else
		{
			if(!submitting)
			{
				submitting = true;
				$("#submitEmailButton").css({
					opacity: 0.3
				});
				var email = $("#emailInput").val();
				var currentURL = window.location.origin;
				$.post(currentURL + "/newsletter",
					{
						email
					},
					function(data, status){
						console.log(data, status);
						$("#submitEmailButton").css({
							opacity: 1
						});
						$("#submitEmailButton").text("Thank you!");
					}
				);
			}
		}
	})

})
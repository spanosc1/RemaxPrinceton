$(document).ready(function() {
  if(platform.os.family == "Android" || platform.os.family == "iOS")
	{
		$(".contactBackground").css("background-image", "url('/images/fwdprincetonpictures/Nassau Princeton NJ 08540 USA-large-013-6-Community photos-1500x1000-72dpi.jpg')");
	}
	var latlng = new google.maps.LatLng(40.350285, -74.065621);
	var myOptions = {
    zoom: 14,
    center: latlng,
    disableDefaultUI: true,
  };
  map = new google.maps.Map(document.getElementById("contactMap"), myOptions);
  var customStyled = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
];//(array shown above)
	map.set('styles',customStyled);

  map2 = new google.maps.Map(document.getElementById("contactMap2"), myOptions);
  map2.set('styles',customStyled);
  var markerLatLng = new google.maps.LatLng(40.350285, -74.065621);
  var marker = new google.maps.Marker({
    position: markerLatLng,
    map: map,
    icon: '/images/icons8-marker-filled-50.png'
  });
  var marker2 = new google.maps.Marker({
    position: markerLatLng,
    map: map2,
    icon: '/images/icons8-marker-filled-50.png'
  });

  $.fn.isInViewport = function(offsetTop) {
    console.log('called');
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

  $(window).on('resize scroll',function() {
    $('.instagramContainer').isInViewport(100);
  });

  $('.instagramContainer').isInViewport(100);

  $('.carousel').slick({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false
        }
      }
    ]
  });
  var formStatus = 0;
  $("#email").on("mouseenter", function() {
    if(formStatus < 1)
    {
      $(this).stop().animate({
        padding: '14px',
        height: '50px',
        width: '290px'
      }, 250, 'easeOutExpo');
      $("#contactUs").stop().animate({
        fontSize: '2.1em',
        marginTop: '-6px',
        opacity: '0.8'
      }, 250, 'easeOutExpo');
    }
  }).on("mouseleave", function() {
    if(formStatus < 1)
    {
      $(this).stop().animate({
        padding: '12px',
        height: '48px',
        width: '280px'
      }, 250, 'easeOutExpo');
      $("#contactUs").stop().animate({
        fontSize: '2.0em',
        marginTop: '0px',
        opacity: '1'
      }, 250, 'easeOutExpo');
    }
  });
  $("#email").on('focus', function() {
    if(formStatus < 1)
    {
      $(this).stop().animate({
        padding: '12px',
        height: '48px',
        width: '280px'
      }, 300, 'easeOutExpo');
      $("#contactUs").stop().animate({
        fontSize: '3em',
        marginTop: '-60px',
        opacity: '0.0'
      }, 300, 'easeOutExpo');
      $(".formContainer").animate({
        height: '164px'
      }, 300, 'easeOutExpo', function() {
        $("#name").css("display", "block").animate({
          opacity: '1'
        }, 300, 'easeOutExpo');
      });
      formStatus++;
    }
  });

  $("#name").on('focus', function() {
    if(formStatus < 2)
    {
      $(".formContainer").animate({
        height: '232px'
      }, 300, 'easeOutExpo', function() {
        $("#number").css("display", "block").animate({
          opacity: '1'
        }, 300, 'easeOutExpo');
      });
      formStatus++;
    }
  });

  $("#number").on('focus', function() {
    if(formStatus < 3)
    {
      $(".formContainer").animate({
        height: '374px'
      }, 300, 'easeOutExpo', function() {
        $("#message").css("display", "block").animate({
          opacity: '1'
        }, 300, 'easeOutExpo');
      });
      formStatus++;
    }
  });

  $("#message").on('focus', function() {
    if(formStatus < 4)
    {
      $(".formContainer").animate({
        height: '426'
      }, 300, 'easeOutExpo', function() {
        $("#contactSubmit").css("display", "block").animate({
          opacity: '1'
        }, 300, 'easeOutExpo');
      });
      formStatus++;
    }
  });

  $(".arrowLeft").on('click', function() {
    $(".slick-prev").click();
  });

  $(".arrowRight").on('click', function() {
    $(".slick-next").click();
  });

  $(".arrowContainer").on('mouseenter', function() {
    $(this).stop().animate({
      backgroundColor: '#357ac6'
    }, 300, 'easeOutExpo');
  }).on('mouseleave', function() {
    $(this).stop().animate({
      backgroundColor: '#0059bd'
    }, 300, 'easeOutExpo');
  });

  $('#contactSubmit').on('mouseenter', function() {
    $(this).stop().animate({
      backgroundColor: 'transparent',
    }, 150);
  }).on('mouseleave', function() {
    $(this).stop().animate({
      backgroundColor: '#003ea5',
    }, 150);
  }).on('click', function() {
    var email = $("#email").val();
    var name = $("#name").val();
    var number = $("#number").val();
    var message = $("#message").val();
    if(email == '' || name == '' || message == '')
    {
      $('#contactIncomplete').css("display", "flex").stop().animate({
        opacity: 1,
        marginTop: '175px'
      }, 200, 'easeOutQuad');
      setTimeout(function() {
        $('#contactIncomplete').stop().animate({
          opacity: 0,
          marginTop: '145px'
        }, 200, 'easeOutQuad', function() {
          $('#contactIncomplete').css("display", "none");
        });
      }, 2000);
    }
    else 
    {
      var currentURL = window.location.origin;
      $.post(currentURL + "/emailremax",
        {
          email,
          name,
          number,
          message
        },
        function(data, status){
          console.log(data, status);
          $(".formContainer").animate({
            opacity: 0
          }, 300, 'easeOutExpo', function() {
            $(".formContainer").css("display", "none");
            $("#result").css("display", "block");
            $("#result").animate({
              opacity: 1
            }, 300, 'easeOutExpo');
          });
        }
      );
    }
  });
})
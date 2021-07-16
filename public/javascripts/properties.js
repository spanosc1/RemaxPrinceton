$(document).ready(function() {
  // $("body").css({
  //   margin: "0",
  //   height: "100vh",
  //   width: "100vw",
  //   overflow: "hidden"
  // });
  var map = '';
  var mobileFilterOpen = false;
  var currentIsList = true;
  var featured = [];
  var currentFilters = {
    beds: 0,
    baths: 0,
    min: 0,
    max: 0,
    type: 'All',
    term: ''
  };
	// function getLocation() {
 //    if (navigator.geolocation) {
 //      navigator.geolocation.getCurrentPosition(translateLatlng);
 //    } else { 
      
 //    }
	// }

	// function translateLatlng(position) {
	// 	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// 	 google.maps.event.addDomListener(window, "load", initialize(latlng));
	// }

	// function initialize(latlng) {
 //    var myOptions = {
 //      zoom: 13,
 //      center: latlng,
 //      mapTypeId: google.maps.MapTypeId.ROADMAP
 //    };
 //    map = new google.maps.Map(document.getElementById("propertiesMap"), myOptions);
 //    /*Map listeners*/
 //    populateMap(latlng);
 //  }

 //  function populateMap(latlng)
 //  {
 //  	$(".propertiesList").empty();
 //  	var type = 'for_sale';
 //  	var sort = 'date';
 //  	var lat = latlng.lat();
 //  	var lng = latlng.lng();
 //  	var zoom = 13;
 //  	var markers = [];
 //  	$.get( "/properties/" + type + "/" + sort + "/" + lat + "," + lng + "/" + zoom, function( data ) {
	// 	  for(var i = 0; i < data.homes.length; i ++) {
 //        var url = "'" + data.homes[i].mainImage + "'";
	// 	  	var html =
 //          '<div data-toggle="modal" data-target="#propertyModal" style="background-image: url(' + url + ')" class="propertyRow row">' +
 //            '<div class="propertyOverlay">' +
 //              '<p>' + data.homes[i].listingType + '</p>' +
 //              '<div class="propDivider"></div>' +
 //              '<p class="propertyPrice">' + data.homes[i].listPriceText + '<span class="propertyInfo">' + data.homes[i].beds + ' bd | ' + data.homes[i].baths + ' ba | ' + data.homes[i].sqft + ' sqft</span></p>' +
 //              '<div class="propDivider"></div>' +
 //              '<p class="propertySubInfo">' + data.homes[i].address + ', ' + data.homes[i].town + ', ' + data.homes[i].state + '</p>' +
 //              '<p class="propertySubInfo">' + data.homes[i].organization + '</p>' +
 //              '<p class="propertyId hidden">' + data.homes[i].id + '</p>' +
 //            '</div>' +
 //          '</div>';
	// 	  	$(".propertiesList").append( html );
	// 	    var latLng = new google.maps.LatLng(data.homes[i].latitude, data.homes[i].longitude);
 //        var marker = new google.maps.Marker({
 //          position: latLng,
 //          map: map
 //        });
	// 		}
	// 	});
 //  }
  
	// getLocation();

  currentFilters.term = $("#searchTerm").val();
  currentFilters.max = $("#searchTerm").attr("max");
  currentFilters.type = $("#searchTerm").attr("propType");

  console.log(currentFilters.term);
  console.log(currentFilters.max);

  $(document).on("mouseenter", ".propertyOverlay", function() {
    $(this).stop().animate({
      backgroundColor: 'rgba(0,0,0,0.3)'
    }, 150);
  }).on("mouseleave", ".propertyOverlay", function() {
    $(this).stop().animate({
      backgroundColor: 'rgba(0,0,0,0.0)'
    }, 150);
  }).on("click", ".propertyOverlay", function() {
    var propertyId = $(this).find(".propertyId").html();
    var property = findProperty(propertyId);
    populateModal(property);
  });

  $('#propertyModal').on('hidden.bs.modal', function () {
    $('.thumbnailContainer').slick('unslick');
    $(".thumbnailContainer").css({"opacity": 0, "margin-top": "-20px", "margin-bottom": "40px"});
  })

  $(document).on("click", ".propertyImages", function() {
    $("#mainImage").attr("style", "background-image: url('" + $(this).attr('src') + "'");
    $("#mainImage").attr("src", $(this).attr('src'));
  });

  $(document).on("click", ".expandContainer", function() {
    $("#expandedImage").attr('src', $('#mainImage').attr('src'));
    $(".expandedView").css("display", "flex");
    $(".expandedView").animate({
      opacity: 1
    }, 250, 'easeOutExpo');
  });

  $(document).on("click", ".dismissExpanded", function() {
    $(".expandedView").animate({
      opacity: 0
    }, 250, 'easeOutExpo', function() {
      $(".expandedView").css("display", "none");
    });
  });

  $.get( "/featured", function( data ) {
    //remove duplicates here
    featured = data.featured;
    if(currentFilters.term != "" || currentFilters.max != 0 || currentFilters.type != 'All') {
      var newProps = filterItems();
      populateProperties(newProps);
    }
    else {
      populateProperties(featured); 
    }
  });

  $(".sortBed").on("click", function() {
    currentFilters.beds = $(this).attr("val");
    if(currentFilters.beds == 0) {
      $("#bedroomButton").empty().html("Bedrooms ");
    }
    else if(currentFilters.beds == 5) {
      $("#bedroomButton").empty().html(currentFilters.beds + "+ Bedrooms ");
    }
    else {
      $("#bedroomButton").empty().html(currentFilters.beds + " Bedrooms ");
    }
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $(".sortBath").on("click", function() {
    currentFilters.baths = $(this).attr("val");
    if(currentFilters.baths == 0) {
      $("#bathroomButton").empty().html("Bathrooms ");
    }
    else if(currentFilters.baths == 5) {
      $("#bathroomButton").empty().html(currentFilters.baths + "+ Bathrooms ");
    }
    else {
      $("#bathroomButton").empty().html(currentFilters.baths + " Bathrooms ");
    }
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $(".sortPrice").on("click", function() {
    currentFilters.min = $(this).attr("min");
    currentFilters.max = $(this).attr("max");
    var priceText = $(this).html();
    if(priceText == 'All') {
      $("#priceButton").empty().html('Price ');
    }
    else {
      $("#priceButton").empty().html(priceText);
    }
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $(".sortType").on("click", function() {
    currentFilters.type = $(this).attr("val");
    if(currentFilters.type == "All") {
      $("#typeButton").empty().html("Type ");
    }
    else {
      $("#typeButton").empty().html(currentFilters.type);
    }
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $("#propSearchButton").on("click", function() {
    currentFilters.term = $("#searchTerm").val();
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $("#clearSearch").on("click", function() {
    $("#searchTerm").val('');
    currentFilters.term = '';
    var newProps = filterItems();
    populateProperties(newProps);
  });

  $("#searchTerm").on('keyup', function (e) {
    if (e.keyCode == 13) {
      currentFilters.term = $("#searchTerm").val();
      var newProps = filterItems();
      populateProperties(newProps);
    }
  });

  $(".filterIcon").on("click", function() {
    if(mobileFilterOpen) {
      mobileFilterOpen = false;
      $("#searchSortBar").css("overflow", "hidden");
      $(".toggleMap").css("display", "flex");
      $("#searchSortBar").stop().animate({
        height: "46px"
      }, 100);
    }
    else {
      mobileFilterOpen = true;
      $(".toggleMap").css("display", "none");
      $("#searchSortBar").stop().animate({
        height: "200px"
      }, 100, function() {
        $("#searchSortBar").css("overflow", "visible");
      });
    }
  });

  $(".toggleMap").on("click", function() {
    if(currentIsList) {
      currentIsList = false;
      $(".propCol").css("display", "none");
      $(".mapCol").css("display", "block");
      $(".markerIcon").removeClass("fa-map-marker-alt").addClass("fa-list-ul");
    }
    else {
      currentIsList = true;
      $(".propCol").css("display", "block");
      $(".mapCol").css("display", "none");
      $(".markerIcon").removeClass("fa-list-ul").addClass("fa-map-marker-alt");
    }
  });

  function resize() {
    if(mobileFilterOpen) {
      mobileFilterOpen = false;
      $("#searchSortBar").stop().animate({
        height: "46px"
      }, 100);
    }
    if($(window).width() < 767) {
      if(currentIsList) {
        $(".propCol").css("display", "block");
        $(".mapCol").css("display", "none");
        $(".myPropsCol").css("display", "block");
      }
      else {
        $(".propCol").css("display", "none");
        $(".mapCol").css("display", "block");
        $(".myPropsCol").css("display", "block");
      }
      $(".toggleMap").css("display", "flex");
      $("#searchSortBar").css("overflow", "hidden");
    }
    else {
      $(".toggleMap").css("display", "none");
      $(".propCol").css("display", "block");
      $(".mapCol").css("display", "block");
      $("#searchSortBar").css("overflow", "visible");
    }
  }

  window.onresize = resize;

  /**
   * Populates modal with property data
   */
  function populateModal(property) {
    var html;
    //console.log(property);
    $("#modalTitle").text(property.address + ", " + property.cityName + ", " + "NJ");
    $("#propertyAddress").text(property.address);
    $("#propertyTown").text(property.cityName + ", " + "NJ" + " " + property.zipcode);
    $("#propertyInfo").text(property.bedrooms + " beds | " + property.fullBaths + " baths | " + property.sqFt + " sqft");
    $("#propertyComment").text(property.remarksConcat);
    $("#propertyType").text(property.idxPropType);
    $("#propertyPrice").text(property.listingPrice);
    $("#mainImage").attr("style", "background-image: url('" + property.image['0'].url + "'");
    $("#mainImage").attr("src", property.image['0'].url);
    $("#fullDetails").attr("href", property.fullDetailsURL);
    $(".thumbnailContainer").empty();
    for(var i = 0; i < property.image.totalCount; i++)
    {
      html = '<div>' +
                '<img class="propertyImages" src="' + property.image[i].url + '">' +
              '</div>';
      $(".thumbnailContainer").append(html);
    }
    setTimeout(function() {
      $('.thumbnailContainer').slick({
        dots: false,
        arrows: true,
        infinite: false,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 3,
        variableWidth: false,
        autoplay: false,
      });
      $(".thumbnailContainer").animate({
        opacity: 1,
        marginTop: "0px",
        marginBottom: "20px"
      }, 250);
    }, 500);
  }

  /**
   * Filters properties based on currentFilters object
   */
  function filterItems() {
    //returns newPropList, array of properties
    var newPropList = featured;
    //Beds
    console.log(1, newPropList);
    if(currentFilters.beds == 5) {
      newPropList = newPropList.filter(item => item.bedrooms >= currentFilters.beds);
    }
    else if (currentFilters.beds == 0) {

    }
    else {
      newPropList = newPropList.filter(item => item.bedrooms == currentFilters.beds);
    }
    console.log(2, newPropList);
    //Baths
    if(currentFilters.baths == 5) {
      newPropList = newPropList.filter(item => item.fullBaths >= currentFilters.baths);
    }
    else if (currentFilters.baths == 0) {

    }
    else {
      newPropList = newPropList.filter(item => item.fullBaths == currentFilters.baths);
    }
    console.log(3, newPropList);
    //Price
    if(currentFilters.max == 0) {

    }
    else if(currentFilters.min == 1000000) {
      newPropList = newPropList.filter(item => item.rntLsePrice >= currentFilters.min);
    }
    else {
      newPropList = newPropList.filter(item => item.rntLsePrice >= currentFilters.min && item.rntLsePrice <= currentFilters.max);
    }
    console.log(4, newPropList);
    //Type
    console.log(currentFilters.type);
    if(currentFilters.type == "All") {
      console.log('all');
    }
    else if(currentFilters.type == "Other") {
      newPropList = newPropList.filter(item => item.idxPropType == "Residential Income" || item.idxPropType == "Lots And Land");
      console.log('other');
    }
    else {
      newPropList = newPropList.filter(item => item.idxPropType == currentFilters.type);
      console.log('normal');
    }
    //Search Term
    console.log(5, newPropList);
    if(currentFilters.term != '')
    {
      newPropList = newPropList.filter(item => 
        item.address.toLowerCase().indexOf(currentFilters.term.toLowerCase()) != -1 ||
        item.cityName.toLowerCase().indexOf(currentFilters.term.toLowerCase()) != -1
      );
    }
    console.log(6, newPropList);
    return newPropList;
  }

  function populateProperties(propList) {
    $(".propertiesList").empty();
    if(propList.length == 0)
    {
      var html =
        '<div id="noResultsContainer">' +
          '<p id="noResults">No results.</p>' +
        '</div>';
      $(".propertiesList").append( html );
    }
    for(var i = 0; i < propList.length; i++)
    {
      var obj = propList[i];
      var html =
        '<div data-toggle="modal" data-target="#propertyModal" style="background-image: url(' + obj.image['0'].url + ')" class="propertyRow row">' +
          '<div class="propertyOverlay">' +
            '<p>' + obj.idxPropType + '</p>' +
            '<div class="propDivider"></div>' +
            '<p class="propertyPrice">' + obj.listingPrice + '<span class="propertyInfo">' + obj.bedrooms + ' bd | ' + obj.fullBaths + ' ba | ' + obj.sqFt + ' sqft</span></p>' +
            '<div class="propDivider"></div>' +
            '<p class="propertySubInfo">' + obj.address + ', ' + obj.cityName + ', ' + 'NJ' + '</p>' +
            '<p class="propertyId hidden">' + obj.listingID + '</p>' +
          '</div>' +
        '</div>';
      $(".propertiesList").append( html );
    }
  }

  function findProperty(id) {
    for(var i = 0; i < featured.length; i++)
    {
      if(featured[i].listingID == id)
      {
        return featured[i];
      }
    }
  }
});
$(document).ready(function() {
	//Initializes editors
  CKEDITOR.replace( 'postContent' );
  CKEDITOR.replace( 'newPostContent' );

  //Opens nav and animates between open and close icons on navbar
	var navOpen = true;
	$("#openNav").on("click", function openNav() {
		if(!navOpen)
		{
			$("#mySidenav").animate({
		  	left: '0px'
		  }, 250);
		  $(".editContainer").animate({
		  	paddingLeft: '140px'
		  }, 250);
		  $(this).animate({
		  	opacity: '0'
		  }, 125, function() {
		  	$(this).html('&#8249;');
		  	$(this).animate({
		  		opacity: '1'
		  	}, 125);
		  });
		  navOpen = true;
		}
		else
		{
			$("#mySidenav").animate({
		  	left: '-130px'
		  }, 250);
		  $(".editContainer").animate({
		  	paddingLeft: '10px'
		  }, 250);
		  $(this).animate({
		  	opacity: '0'
		  }, 125, function() {
		  	$(this).html('&#8250;');
		  	$(this).animate({
		  		opacity: '1'
		  	}, 125);
		  });
		  navOpen = false;
		}
	});

	//Shows preview of cover photo url
	$("#imgURL").on("change", function() {
		$("#preview").attr('src', $(this).val());
	});

  //Shows preview of profile photo url
  $("#imgURL").on("change", function() {
    $("#preview").attr('src', $(this).val());
  });

	//Same as above but for the image store
	$("#userPhoto").on("change", function(event) {
		$("#uploadImageBtn").css('display', 'block');
    var output = document.getElementById('previewTwo');
    output.src = URL.createObjectURL(event.target.files[0]);
    $("#uploadImageBtn").removeClass("hidden");
	});

  //Same as above but for the profile store
  $("#userProfile").on("change", function(event) {
    $("#uploadProfileBtn").css('display', 'block');
    var output = document.getElementById('previewThree');
    output.src = URL.createObjectURL(event.target.files[0]);
    $("#uploadProfileBtn").removeClass("hidden");
  });

	//Allows the admin to search for a post to edit
	$("#searchTermAdmin").on("keyup", function() {
		var input, filter, ul, li, a, i;
    input = $("#searchTermAdmin");
    filter = input.val().toUpperCase();
    ul = $(".itemListAdmin");
    li = $(".itemAdmin");
    for (i = 0; i < li.length; i++)
    {
      titles = li[i].getElementsByTagName("p")[0];
      if(titles.innerHTML.toUpperCase().indexOf(filter) > -1)
      {
        li[i].style.display = "";
      }
      else
      {
        li[i].style.display = "none";
      }
    }
	});

  //Allows the admin to search for an agent to edit
  $("#searchAgentAdmin").on("keyup", function() {
    var input, filter, ul, li, a, i;
    input = $("#searchAgentAdmin");
    filter = input.val().toUpperCase();
    ul = $(".agentListAdmin");
    li = $(".agentAdmin");
    for (i = 0; i < li.length; i++)
    {
      titles = li[i].getElementsByTagName("p")[0];
      if(titles.innerHTML.toUpperCase().indexOf(filter) > -1)
      {
        li[i].style.display = "";
      }
      else
      {
        li[i].style.display = "none";
      }
    }
  });

	//Displays modal
  //find children with the info (title, description, body, caption, id)
  //and set them to the ones in the modal for editing
  $(".itemAdmin").on("click", function() {
    $(".post-modal-body").find("#newFeatured")[0].checked = false;
    $(".post-modal-body").find("#newPostTitle").val($(this).find(".adminTitle").html());
    $(".post-modal-body").find("#newPostDescription").val($(this).find(".adminDescription").html());
    $(".post-modal-body").find("#newImgURL").val($(this).find(".adminImg").attr('src'));
    $(".post-modal-body").find("#newImgCaption").val($(this).find(".adminCaption").html());
    $(".post-modal-body").find("#Id").val($(this).find(".adminId").html());
    if($(this).find(".adminFeatured")[0].innerHTML == 'true')
    {
      $(".post-modal-body").find("#newFeatured")[0].checked = true;
    }
    CKEDITOR.instances['newPostContent'].setData($(this).find(".adminContent").text());
    $(".delete").attr("action", "/admin/delete/" + $(this).find(".adminId").html());
    $("#imagePath").attr("value", $(this).find(".adminImg").attr("src"));
  });

  //Displays modal
  //find children with the info (title, description, body, caption, id)
  //and set them to the ones in the modal for editing
  $(".agentAdmin").on("click", function() {
    $(".agent-modal-body").find("#newAgentName").val($(this).find(".adminAgentName").html());
    $(".agent-modal-body").find("#newAgentTitle").val($(this).find(".adminAgentTitle").html());
    $(".agent-modal-body").find("#newAgentProfile").val($(this).find(".adminAgentImg").attr('src'));
    $(".agent-modal-body").find("#newAgentPreferred").val($(this).find(".adminAgentPhone").html());
    $(".agent-modal-body").find("#newAgentOrg").val($(this).find(".adminAgentOrg").html());
    $(".agent-modal-body").find("#newAgentLicense").val($(this).find(".adminAgentLicense").html());
    $(".agent-modal-body").find("#newAgentCode").val($(this).find(".adminAgentCode").html());
    $(".agent-modal-body").find("#newAgentDirect").val($(this).find(".adminAgentDirect").html());
    $(".agent-modal-body").find("#newAgentMobile").val($(this).find(".adminAgentMobile").html());
    $(".agent-modal-body").find("#newAgentEmail").val($(this).find(".adminAgentEmail").html());
    $(".agent-modal-body").find("#newAgentOfficeCode").val($(this).find(".adminAgentOfficeCode").html());
    $(".agent-modal-body").find("#newAgentOfficePhone").val($(this).find(".adminAgentOfficePhone").html());
    $(".agent-modal-body").find("#newAgentFax").val($(this).find(".adminAgentFax").html());
    $(".agent-modal-body").find("#newAgentBio").val($(this).find(".adminAgentBio").html());
    $(".agent-modal-body").find("#agentId").val($(this).find(".agentId").html());
    $(".deleteAgent").attr("action", "/admin/delete-agent/" + $(this).find(".agentId").html());
  });

  //Displays 'Are you sure?' option when attempting to delete a post
  $("#deletePost").on("click", function() {
    $(".surePost").css({display: 'inline'}).animate({
      opacity: 1.0
    }, 200);
    $(".surePostButton").css({display: 'inline'}).animate({
      opacity: 1.0
    }, 200);
  });

  $("#deleteAgent").on("click", function() {
    $(".sureAgent").css({display: 'inline'}).animate({
      opacity: 1.0
    }, 200);
    $(".sureAgentButton").css({display: 'inline'}).animate({
      opacity: 1.0
    }, 200);
  });

  //Hides 'Are you sure?' option when modal is closed
  $("#myModalPost").on('hidden.bs.modal', function() {
    $(".surePost").css({display: 'inline', opacity: 0.0});
  });

  $("#myModalAgent").on('hidden.bs.modal', function() {
    $(".sureAgent").css({display: 'inline', opacity: 0.0});
  });

});
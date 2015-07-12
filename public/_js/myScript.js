$(function(){

	var globObj = {

		//Regist input validation
		"checkRegistValid" : function(){

			var tmp_valid = false,
				login = $("input#myLogin").val(),
				pass = $("input#myPass").val();

			if(login === "" || pass === ""){
				tmp_valid = true;
			} else {
				login = login.trim();
				pass = pass.trim();

				console.log("login=" + login + "&" + "pass=" + pass)

				$.ajax({
					url : "/login",
					method : "POST",
					data : "login=" + login + "&" + "pass=" + pass,
					success : function(){
						// TO DO.......
						return tmp_valid = false;
					}
				});
			}

			return tmp_valid;
		},

		"_allFormValidate" : function(form){

			var currentInput = $(form);

			if(currentInput.val() == ""){
				currentInput.css("border" , "2px red solid");
			} else {
				currentInput.css("border" , "1px solid #CD8726");
			}
			return currentInput;
		},

		// Registrieren Form validation
		"validationRegistForm" : function(form){

			$(form).find('input[type=text], input[type=password]').each(function(){

				return currentInput = globObj._allFormValidate($(this));

			});
		},

		//Links form validation
		"validationLinkForm" : function(e){
			var currentInput = $('form.addlink-form').find('input[type=text], select, textarea').each(function(){

				if($(this).attr('type') === 'text'){

					var currentInput = globObj._allFormValidate($(this));

				}
			});
		},

		/*"_sendePostForm" : function(currentInput){

			console.log(currentInput.serialize())

			$.ajax({
				url : "",
				method : "POST",
				data : currentInput.serialize()

			});
		},*/

		//add and remove Links Modal Window
		"itemOverloy" : function(cssClass, button){

			//$(event).on("click", function(e){
				//e.preventDefault();
				$(".register-form").css({display: "none"});
				$(".overlay-content-container").css({display: "block"});
				$(".footer-box").css({display: "none"});
				$(".footer-box-x").css({display: "none"});
				$(".overlay-container").css({background: "transparent", width: "100%", height: "100%"});
				$(".overlay-content").animate({
					position: 	"fixed"
				}, 200)
				.animate({opacity: 1}, 200, function(){
					$(button).css({display: "block"});
				});
				$(cssClass).css({display : "block"});

				if($('#mySelect').children('option').length === 1){
					$('#mySelect, label[for="mySelect"]').css({display : "none"});
				}

				globObj._overlayContainerCloseBtn(cssClass, button);
				//e.preventDefault();
			//});
		},

		"_overlayContainerCloseBtn" : function(cssClass, button){

			if(widtTmp <= 400)
				$(".title").css({fontSize: "1em"});

			$(button).click(function(){
				$(this).fadeOut(100);
				$(".overlay-content").animate({opacity: 0}, 100, function(){
					$(this).css({position:  "static"});
					$(".overlay-container").animate({height: 0}, 100, function(){
						$(".overlay-container").css({width: 0});
					});
				});
				$(cssClass).css({display : "none"});
			});
		},

		"overloyModalWindow" : function(){

			var state;
			var navA = document.getElementById('main-nav');

			navA.addEventListener('click', function(e){
				e.preventDefault();
				state = {item : e.target.getAttribute('href')};
				//history.pushState(state, '', state.item);
				if(state.item === '/addlink'){
					setTimeout(function(){
						globObj.itemOverloy('form.addlink-form', ".close-button");
					}, 300);
				} else if(state.item === '/removelink') {
					setTimeout(function(){
						globObj.itemOverloy('form.removelink-form', ".close-button");
					}, 300);
				} else {
					return false;
				}
			});
		}
	};

	globObj.overloyModalWindow();

	//---------- NAVI -----------
  	$('.fade').hide();
  	$('#navicon').click(function() {
  
	  	if($('#navicon').hasClass('closed')) {

	  	 	$('body').animate({right: "-250px"}, 400).css({"overflow":"hidden"});
		 	$('#main-nav').animate({left: "0"}, 400);
			$(this).removeClass('closed').addClass('open').html('x');
			$('.fade').fadeIn();

	  	}
	  	else if($('#navicon').hasClass('open')) {

		  	$('body').animate({right: "0"}, 400).css({"overflow":"scroll"});
		  	$('#main-nav').animate({left: "-250px"}, 400);
		  	$(this).removeClass('open').addClass('closed').html('&#9776;');
		  	$('.fade').fadeOut();

	  	}
  	});
  	//---------- NAVI END-----------

	$("body").css({display: "block"});
	var widtTmp = $("html").width();
	var widthContent = $(".overlay-content").width();
	if(widtTmp <= 400){
		widthContent = 240;
	}
	var widthTmp = (widtTmp - widthContent)/2;

	var user = false;

	// Login Password window
	if(!user){
		
		$(".overlay-container-lw").css({width: "100%", height: "100%", backgroundColor: "#B1A58E"}).animate({}, function(){
			$(".overlay-content-lw").css({
				position: 	"fixed", 
				height: 	"auto", 
				left: 		"" + widthTmp + "px",
				right: 		"" + widthTmp + "px",
				width: 		"" + widthContent + "",
				opacity:  	"1",
				top : 		"100px" 
			})
		});
		
		if(widtTmp <= 400)
			$(".title, .title-registr").css({fontSize: "1em", color: "#000 !important"});

		$("input.form-submit").on('click', function(e){

			globObj.validationRegistForm("form.register-form");

			if(!globObj.checkRegistValid()){

				$('.overlay-content-lw').
					animate({opacity: 0}, 200, function(){
						$(".overlay-container-lw").animate({height: 0}, 1000, function(){
							$(".overlay-container-lw").css({width: 0});
						});
					});

				$(".register-form").css({display: "none"});
				
			} else {
				return false;
			}
		});
	}

	/*****************************/

	$('input.form-submit-link').on('click', function(e){

		globObj.validationLinkForm(e);
	});


	/*MENU*/

	$('#main-nav a').on('mouseover', function(){
		$(this).each(function(){
			$(this).css({color: "#793A2A"});
		});
		
	});
	$('#main-nav a').on('mouseout', function(){
		$(this).each(function(){
			$(this).css({color: "#FFF"});
		});
	});
	$('#main-nav a:nth-child(5)').on('mouseover', function(){
		$('#menu-img').css({opacity : ".5"});
	});
	$('#main-nav a:nth-child(5)').on('mouseout', function(){
		$('#menu-img').css({opacity : "1"});
	});

	/*****************************/

});

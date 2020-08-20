// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};





//init tabs
$(function() {
	  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
	    $(this)
	      .addClass('active').siblings().removeClass('active')
				.closest('div.tabs').find('div.tabs__content').hide().eq($(this).index()).fadeIn(300).show();
		});



	//url params handling
	$(function() {
		function getQueryParams(qs) {
			qs = qs.split('+').join(' ');

			var params = {},
					tokens,
					re = /[?&]?([^=]+)=([^&]*)/g;

			while (tokens = re.exec(qs)) {
					params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
			}

			return params;
		}



		var query = getQueryParams(document.location.search);

		if(query.popup == "thankyou") {
			$.goodpopup.getPopup("thankyou").open();
		}

	});





	// //show mobile header ovelay
	// $(function() {
	// 		// get the value of the bottom of the #main element by adding the offset of that element plus its height, set it as a variable
	// 		var bannerbottom = $('#banner').offset().top + $('#banner').height();
	// 		// var bannerbottom = $('#banner').height();

	// 		// on scroll, 
	// 		$(window).on('scroll',function(){

	// 				// we round here to reduce a little workload
	// 				stop = Math.round($(window).scrollTop());
	// 				if (stop > bannerbottom) {
	// 						$('.mobile-header').addClass('past-banner');
	// 						$(".mobile-header-scroll-up").addClass("mobile-header-scroll-up-block");
	// 				} else {
	// 						$('.mobile-header').removeClass('past-banner');
	// 						$(".mobile-header-scroll-up").removeClass("mobile-header-scroll-up-block");
	// 			}
	// 		});
	// });

	// setTimeout(function() {
	// 	$(window).trigger('scroll');
	// }, 1);





	$(".cards-btn").on("click", function() {
		$this = $(this);
		var productName = $this.parent().parent().find(".cards-h3").text();

		fbq('track', 'InitiateCheckout', {
			content_name: productName
		 });
	});







	//adjust cards height so they become equal
	var biggestHeightCurr = 0;
	var biggestHeightPrev = 0;

	function resizeCardsHeight(wrapperQuery, windowWidthFrom, windowWidthTo) {
		if (($(window).width() > windowWidthFrom) && ($(window).width() < windowWidthTo)) {
			var $wrappers = $(wrapperQuery);
			biggestHeightCurr = 0;


			$wrappers.height("initial");
			
			$wrappers.each(function() {
				var currentHeight = $(this).innerHeight();
				if (currentHeight > biggestHeightCurr) {
					biggestHeightCurr = currentHeight;
				}
			});
			biggestHeightCurr = Math.floor(biggestHeightCurr);

			$wrappers.height(biggestHeightCurr);

			biggestHeightPrev = biggestHeightCurr;
		} else {
			$(wrapperQuery).removeAttr("style");
		}
	}

	$(window).on("resize", debounce( function() {
		resizeCardsHeight("#prices .cards-top-wrapper", 1000, 5000);
	}, 125));

	$(window).on("resize", debounce( function() {
		resizeCardsHeight("#additional .cards-top-wrapper", 1000, 5000);
	}, 125));

	$(window).on("resize", debounce( function() {
		resizeCardsHeight(".reviews-content-wrapper", 769, 5000);
	}, 125));



	//expand read more paragraph on cards
	function expandReadMoreCards(section, collapsedItem) {
		var $readMoreLinks = $("." + section + "-read-more-a");
		
		$readMoreLinks.on("click", function() {
			$this = $(this);

			$this.parent().children("." + collapsedItem).css("height", "initial");
			$this.css("display", "none");
		});
	}

	expandReadMoreCards("prices", "cards-ul");





	// pagination underline transition
	function paginationUnderlineTransition($paginationWrapper,
		$paginationUnderline, $activeItem, sizeOfLine) {
	
		if($paginationWrapper === undefined) {
			return;
		} else if (typeof $paginationWrapper === 'string') {
			$paginationWrapper = $($paginationWrapper);
		}

		if($paginationUnderline === undefined) {
			return;
		} else if (typeof $paginationUnderline === 'string') {
			if($($paginationUnderline).length === 0) {
				$paginationUnderline = $("<div class='" + $paginationUnderline.slice(1) + "'></div>");
				$paginationUnderline.appendTo($paginationWrapper);
			} else {
				$paginationUnderline = $($paginationUnderline);
			}
		}

		if($activeItem === undefined) {
			return;
		} else if (typeof $activeItem === 'string') {
			$activeItem = $($activeItem);
		}

		if(sizeOfLine === undefined) {
			sizeOfLine = 0.99;
		}
		

		// check if pagination has active item
		function checkIfActivePaginationItemChanged() {
			if ($activeItem[0]) {
				$paginationUnderline.css({
					"width": $activeItem.width(),
					"left": $activeItem.position().left
				});
			}
		}
		checkIfActivePaginationItemChanged();
		
		// underline transition
		$($paginationWrapper).find("a").hover(
			// on hover
			function(){
				$paginationUnderline.css({
					"width": $(this).width() * sizeOfLine,
					"left": $(this).position().left + $(this).width() * (1 - sizeOfLine) / 2
				});
			},
			// hover ends
			function(){
				if ($activeItem[0]) {
					// go back to current
					$paginationUnderline.css({
						"width": $activeItem.width() * sizeOfLine,
						"left": $activeItem.position().left + $(this).width() * (1 - sizeOfLine) / 2
					});
				} else {
					// disapear
					$paginationUnderline.width(0);
				}
			}
		);
	}
	
	paginationUnderlineTransition(
		$(".header-menu-nav"),
		".header-pagination-underline",
		$(".header-menu-a_active"),
		0.99
	);





	// //initializing mCSB scrollbar with custom theme
	// $(function () {
	// 	if ($(window).width() > 945) {
	// 		$('.delivery-container').css("height", 500);
	// 		$('.delivery-container').mCustomScrollbar({
	// 				theme:'my-theme'
	// 		});
	// 		$('.delivery-container').css("height", "");
	// 	}

	// 	else {
	// 		$('.delivery-container').mCustomScrollbar({
	// 			theme:'my-theme'
	// 	});
	// 	}

	// 	$('.intro-container').mCustomScrollbar({
	// 			theme:'my-theme'
	// 	});

	// 	$('.seotext-container').mCustomScrollbar({
	// 		theme:'my-theme'
	// 	});
	// });





	// // on before slide change
	// $('.reviews-wrapper').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
	// 	$reviewsPaginationNumbers = $(".reviews-pagination-number");
	// 	$reviewsPaginationNumbers.eq(currentSlide).removeClass("reviews-pagination-number_active");
	// 	$reviewsPaginationNumbers.eq(nextSlide).addClass("reviews-pagination-number_active");
	
	// 	paginationSetPosition(nextSlide);
		
	// 	paginationUnderlineTransition(
	// 		$(".reviews-pagination-numbers-wrapper"),
	// 		".reviews-pagination-numbers-underline",
	// 		$(".reviews-pagination-number_active"),
	// 		0.99
	// 	);
	// });


	//set pagination circle
	function setPaginationCircle(section) {
		$(section + " .slick-dots .slick-active")
			.append('<svg class="pagination-circle progress-ring" width="30" height="30" viewBox="0 0 30 30"'
				+ 'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
				+ '<circle class="progress-ring__circle" stroke="#54da83" stroke-width="1" fill="transparent"'
				+ 'r="14" cx="15" cy="15" style="stroke-dasharray: 90, 90; stroke-dashoffset: 90px;"/>'
				+ '</svg>');

		setTimeout(function() {
			var $circle = $(section + ' .pagination-circle circle');
			$circle.css("strokeDashoffset", 23);
		}, 10);
	}



	$portfolioSlick = $('.portfolio-wrapper');

	$portfolioSlick.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
		// $("#portfolio .pagination-circle").remove();


		$(".portfolio-pagination-counter-current").text("0" + (nextSlide + 1));
	});

	$portfolioSlick.on("afterChange", function() {
		// setPaginationCircle("#portfolio");
	});

	$portfolioSlick.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		speed: 500,
		fade: true,
		cssEase: "ease",
		customPaging: function(slider, i) {
			return "<div class='slick-stripe'></div>";
		},
		responsive: [
			{
				breakpoint: 801,
				settings: {
					fade: false
				}
			},
		]
	});

	// setPaginationCircle("#portfolio");

	var i = 0;
	$("#portfolio .slick-dots li").each(function () {
		i++;
	});
	$(".portfolio-pagination-counter-total").text("/0" + i);



	$reviewsSlick = $('.reviews-wrapper');

	$reviewsSlick.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
		// $("#reviews .pagination-circle").remove();


		$(".reviews-pagination-counter-current").text("0" + (nextSlide + 1));
	});

	$reviewsSlick.on("afterChange", function() {
		// setPaginationCircle("#reviews");
	});

	$reviewsSlick = $('.reviews-wrapper');
	$reviewsSlick.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		speed: 500,
		fade: true,
		cssEase: "ease",
		customPaging: function(slider, i) {
			return "<div class='slick-stripe'></div>";
		},
		responsive: [
			{
				breakpoint: 769,
				settings: {
					fade: false
				}
			},
		]
	});

	// setPaginationCircle("#reviews");

	var i = 0;
	$("#reviews .slick-dots li").each(function () {
		i++;
	});
	$(".reviews-pagination-counter-total").text("/0" + i);



	function initDottedPagination(slickDots, paginationStripes, windowWidthFrom) {
		if ($(window).width() > windowWidthFrom) {
			$(slickDots).appendTo(paginationStripes);
		}
	}

	$(window).on("resize", debounce( function() {
		initDottedPagination("#portfolio .slick-dots", ".portfolio-pagination-stripes", 800);
	}, 100));

	$(window).on("resize", debounce( function() {
		initDottedPagination("#reviews .slick-dots", ".reviews-pagination-stripes", 768);
	}, 100));


	function adjustDottedPagination(paginationWrapper, elemToAlignWith, h2Wrapper, windowWidthFrom, paddingLeft, offsetTop) {
		if ($(window).width() > windowWidthFrom) {

			var $paginationWrapper = $(paginationWrapper);
			var $elemToAlignWith = $(elemToAlignWith);
			var $h2Wrapper = $(h2Wrapper);


			$paginationWrapper.css("left", $elemToAlignWith.position().left +
				parseInt($elemToAlignWith.css("marginLeft")) + paddingLeft);

			if (offsetTop !== undefined) {
				$paginationWrapper.css("top", $elemToAlignWith.position().top +
					$elemToAlignWith.outerHeight() + $h2Wrapper.outerHeight(true) -
					$paginationWrapper.outerHeight() + offsetTop);
			} else {
				$paginationWrapper.css("top", $elemToAlignWith.position().top +
					$elemToAlignWith.outerHeight() + $h2Wrapper.outerHeight(true) -
					$paginationWrapper.outerHeight());
			}
		}
	}

	$(window).on("resize", debounce( function() {
		adjustDottedPagination(".portfolio-pagination", ".portfolio-content-wrapper", ".portfolio-h2-wrapper", 800, 20, 30);
	}, 125));

	$(window).on("resize", debounce( function() {
		adjustDottedPagination(".reviews-pagination", ".reviews-content-wrapper", ".reviews-h2-wrapper", 768, 20, 74);
	}, 125));



	$(".portfolio-pagination-arrow-a_prev").on("click", function() {
		$portfolioSlick.slick('slickPrev');
	});

	$(".portfolio-pagination-arrow-a_next").on("click", function() {
		$portfolioSlick.slick('slickNext');
	});


	$(".reviews-pagination-arrow-a_prev").on("click", function() {
		$reviewsSlick.slick('slickPrev');
	});

	$(".reviews-pagination-arrow-a_next").on("click", function() {
		$reviewsSlick.slick('slickNext');
	});



	// //portfolio pagination setter
	// var $paginationWrapper = $(".reviews-pagination-numbers-wrapper");
	// var $reviews = $(".portfolio-elem");
	// var counter = 0;

	// $reviews.each(function() {
	// 	if (counter === 1) {
	// 		(function(counter) {
	// 			$('<a href="javascript:;" data-position="' + counter + '" class="reviews-pagination-number reviews-pagination-number_active"></a>')
	// 			.appendTo($paginationWrapper)
	// 			.on("click", function() {
	// 				$reviewsSlick.slick('slickGoTo', counter - 1);
	// 			});
	// 		})(counter);
	// 		counter++;

	// 	} else {
	// 		(function(counter) {
	// 			$('<a href="javascript:;" data-position="' + counter + '" class="reviews-pagination-number"></a>')
	// 			.appendTo($paginationWrapper)
	// 			.on("click", function() {
	// 				$reviewsSlick.slick('slickGoTo', counter - 1);
	// 			});
	// 		})(counter);
	// 		counter++;
	// 	}
	// });

	// $(".reviews-pagination-arrow-a_prev").on("click", function() {
	// 	$reviewsSlick.slick('slickPrev');
	// });

	// $(".reviews-pagination-arrow-a_next").on("click", function() {
	// 	$reviewsSlick.slick('slickNext');
	// });



	// function paginationSetPosition(slideIndex) {
	// 	var $pagination = $(".reviews-pagination");
	// 	if (slideIndex === undefined) {
	// 		var slideIndex = $(".reviews-pagination-number_active").data("position");
	// 	}
	// 	var $activeContentWrapper = $(".reviews-review").eq(slideIndex).find(".reviews-content-wrapper");
	
	// 	$pagination.css("top", $activeContentWrapper.position().top + $activeContentWrapper.innerHeight() + 40);
	// }
	// paginationSetPosition()
	// $(window).on("resize", function() { paginationSetPosition(); });

	// paginationUnderlineTransition(
	// 	$(".reviews-pagination-numbers-wrapper"),
	// 	".reviews-pagination-numbers-underline",
	// 	$(".reviews-pagination-number_active"),
	// 	0.99
	// );





	var $slick_proofs = $('.proofs-wrapper');

  var settings_proofs = {
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			customPaging: function(slider, i) {
				return "<div class='slick-stripe'></div>";
			}
	}

  // reslick only if it's not slick()
  $(window).on('resize', function() {

		if ($(window).width() > 690) {
      if ($slick_proofs.hasClass('slick-initialized')) {
        $slick_proofs.slick('unslick');
      }
		}
		
    else if (!$slick_proofs.hasClass('slick-initialized')) {
      return $slick_proofs.slick(settings_proofs);
		}

	});





	//hide slick dots if there is only one
	$("ul.slick-dots").each(function() {
		var $children = $(this).children();
		if ($children.length < 2) {
			$children.hide();
		}
	});





	//expand read more paragraph on
	function expandReadMoreSlider(section, collapsedItem, windowWidthFrom) {
		var $readMoreLinks = $("." + section + "-read-more-a");
		
		$readMoreLinks.on("click", function() {
			$("#" + section + " ." + collapsedItem).css("height", "initial");
			$readMoreLinks.css("display", "none");

			$(window).on("resize", debounce( function() {
				resizeCardsHeight("." + collapsedItem, 0, windowWidthFrom);
			}, 125));

			$(window).trigger("resize");
		});
	}

	expandReadMoreSlider("portfolio", "portfolio-p", 800);
	expandReadMoreSlider("reviews", "reviews-p", 768);





//change close icon on popup
function changeCloseIcon() {
	var closeIcon = $(".goodpopup-close-svg__path");
	closeIcon.attr("d", "M 15.99 0.72C 15.99 0.72 15.26-0 15.26-0 15.26-0 7.99 7.27 7.99 7.27 7.99 7.27 0.72-0 0.72-0 0.72-0-0 0.72-0 0.72-0 0.72 7.27 7.99 7.27 7.99 7.27 7.99-0 15.26-0 15.26-0 15.26 0.72 15.99 0.72 15.99 0.72 15.99 7.99 8.72 7.99 8.72 7.99 8.72 15.26 15.99 15.26 15.99 15.26 15.99 15.99 15.26 15.99 15.26 15.99 15.26 8.72 7.99 8.72 7.99 8.72 7.99 15.99 0.72 15.99 0.72Z");
}



function setPopupWidth() {
	$(".goodpopup-inner-content-element").last()
		.css("max-width", $(".popup").css("max-width"));
}



function replaceMenuBtn($menuBtn) {
	$menuBtn.detach();

	var $closeBtn = $(".goodpopup-close").css({
		"position": "initial",
		"top": "0",
		"right": "0",
		"width": "23px",
		"text-align": "center"
	});

	$closeBtn.appendTo($(".mobile-header"));
}


function redoMenuBtn($menuBtn) {
	$(".goodpopup-close").remove();

	$menuBtn.appendTo($(".mobile-header"));
}



function callPopupOrder (that) {
	$.goodpopup.getPopup("order").setOptions({
		isOuterClickClosing: true,
		callbackBeforeOpen: function() {
			setTimeout(function(){

				changeCloseIcon();

				$(".popup-rules-a").on("click", callPopupRules);


				var productPrice = parseInt($(that).parent().find(".cards-price").text());

				var productName = $(that).parent().parent().find(".cards-h3").text();
				$("#orderProduct").val(productName);


				$("#orderTel").intlTelInput({
					initialCountry: "ru",
					preferredCountries: ["ru", "ua", "by", "kz"],
					utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/15.0.0/js/utils.js"
				});			

				$(".input-tel-wrapper .order-label").insertAfter($(".popup-order-tel"));



				validateOrder("#orderForm");


				var $popupError = $("#orderFile-error");				
				
				$('#orderForm').submit(function() {
					var $this = $(this);
					var isValid = $this.valid();

					if (!isValid) {
						$popupError.html("Пожалуйста, заполните все поля.").css("display", "block").removeClass("error-single_green");
					} else {
						$popupError.html("Выполняется отправка.").css("display", "block").addClass("error-single_green");

						$this.ajaxSubmit({
							data: {action: 'submit'},
							success: function(data) {
								//nginx only
								var outputString = data.split(".");
								var outputString = outputString[0] + ".";

								$popupError.html(outputString);
								if (outputString.indexOf("Ваша заявка отправлена.") !== -1) {
									$this[0].reset();
									$("#orderTel-error").remove();
									$popupError.addClass("error-single_green");

									fbq('track', 'Purchase', {
										content_name: productName,
										value: productPrice,
										currency: "usd" 
									});       
								} else {
									$popupError.removeClass("error-single_green");
								}
							},
							error: function() {
								$popupError.html("Произошла ошибка. Пожалуйста, попробуйте ещё раз.").removeClass("error-single_green");
							}
						});
						return false;
					}
				});
			}, 100);
		}
	}).open();

	setPopupWidth();
}



function callPopupContact (nameOfItem, price) {
	$.goodpopup.getPopup("contact").setOptions({
		isOuterClickClosing: true,
		callbackBeforeOpen: function() {
			setTimeout(function(){

				changeCloseIcon();

				$("#contactTel").intlTelInput({
					initialCountry: "ru",
					preferredCountries: ["ru", "ua", "by", "kz"],
					utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/15.0.0/js/utils.js"
				});

				$(".input-tel-wrapper .contact-label").insertAfter($(".popup-contact-tel"));


				validatePopupContact("#popupContactForm");
				

				var $popupError = $("#popupContactFile-error");

				$('#popupContactForm').submit(function() {
					var $this = $(this);
					var isValid = $this.valid();

					if (!isValid) {
						$popupError.html("Пожалуйста, заполните все поля.").css("display", "block").removeClass("error-single_green");
					} else {
						$popupError.html("Выполняется отправка.").css("display", "block").addClass("error-single_green");

						$this.ajaxSubmit({
							data: {action: 'submit'},
							success: function(data) {
								//nginx only
								var outputString = data.split(".");
								var outputString = outputString[0] + ".";

								$popupError.html(outputString);
								if (outputString.indexOf("Ваше сообщение отправлено.") !== -1) {
									$this[0].reset();
									$("#orderTel-error").remove();
									$popupError.addClass("error-single_green");

									fbq('track', 'Lead', {
										content_category: "popup", 
									});
								} else {
									$popupError.removeClass("error-single_green");
								}
							},
							error: function() {
								$popupError.html("Произошла ошибка. Пожалуйста, попробуйте ещё раз.").removeClass("error-single_green");
							}
						});
					return false;
					}
				});
			}, 100);
		}
	}).open();

	setPopupWidth();
}



function callPopupRules() {
	var popup = $.goodpopup.getPopup("rules");
	popup.setOptions({
		callbackBeforeOpen: function() {
				setTimeout(function() {
					$(".popup-close-btn").on("click", function() {
						popup.close();
				});

				$('.popup-rules-scroll-container').mCustomScrollbar({
					axis: "y",
					theme:'my-theme'
				});

				changeCloseIcon();
			});
		}
	});
	popup.open();

	setPopupWidth();
}



// function callPopupMenu() {
// 	var popup = $.goodpopup.getPopup("menu");
// 	var $menuBtn = $("#mobile-header-menu-a");
// 	popup.setOptions({
// 		isOuterClickClosing: true,
// 		callbackBeforeOpen: function() {
// 			setTimeout(function() {

// 				$(".popup-menu-a").on("click", function() {
// 					popup.close();
// 				});
			
// 				$("#btn-subscribe-2").on("click", callPopupSubscribe);

// 				changeCloseIcon();

// 				replaceMenuBtn($menuBtn);
// 			});
// 		},
// 		callbackBeforeClose: function() {
// 			redoMenuBtn($menuBtn);
// 		}
// 	});
// 	popup.open();
// }
	


//popup events binding
$(".cards-btn").on("click", function() {
	callPopupOrder(this);
});


$(".header-btn").on("click", callPopupContact);

$("#btn-contact-mobile-menu").on("click", callPopupContact);


$(".footer-rules-a").on("click", callPopupRules);


			
	//validations
	$(function() {
		jQuery.validator.addMethod("telephone", function(value, element) {
			var temp1 = $(element);
			var temp2 = temp1.intlTelInput("isValidNumber");
			return temp2;
		}, "Введите существующий номер");

		jQuery.validator.addMethod("fullName", function(value, element) {
			return this.optional(element) || /^([А-Я][а-я]+\s*){3}/.test(value);
		}, "Введите Ваше ФИО");

		jQuery.validator.addMethod("simpleName", function(value, element) {
			return this.optional(element) || /^([А-Я][а-я]+\s*)/.test(value);
		}, "Введите Ваше имя");
	});



	function validateOrder(form) {
		$(form).validate({
			rules: {
				orderName: {
					"simpleName": true,
					required: true
				},
				orderTel: {
					required : true,
					telephone : true
				},
				orderEmail: {
					required: true,
					email: true
				},
				orderMessage: {
					required: true
				}
			},
			messages: {
				orderName: {
					required: "Введите Ваше имя"
				},
				orderTel: {
					required: "Введите номер телефона"
				},
				orderEmail: {
					required: "Введите свой email",
					email: "Введите существующий email"
				},
				orderMessage: {
					required: "Введите Ваше сообщение"
				}
			}
		});
	}


	function validatePopupContact(form) {
		$(form).validate({
			rules: {
				contactName: {
					"simpleName": true,
					required: true
				},
				contactTel: {
					required : true,
					telephone : true
				},
				contactEmail: {
					required: true,
					email: true
				},
				contactMessage: {
					required: true
				}
			},
			messages: {
				contactName: {
					required: "Введите Ваше имя"
				},
				contactTel: {
					required: "Введите номер телефона"
				},
				contactEmail: {
					required: "Введите свой email",
					email: "Введите существующий email"
				},
				contactMessage: {
					required: "Введите Ваше сообщение"
				}
			}
		});
	}


	function validateContact(form) {
		$(form).validate({
			rules: {
				contactName: {
					"simpleName": true,
					required: true
				},
				contactEmail: {
					required: true,
					email: true
				},
				contactMessage: {
					required: true
				}
			},
			messages: {
				contactName: {
					required: "Введите Ваше имя"
				},
				contactEmail: {
					required: "Введите свой email",
					email: "Введите существующий email"
				},
				contactMessage: {
					required: "Введите Ваше сообщение"
				}
			}
		});
	}

	validateContact("#contactForm");


	var $popupError = $("#contactFile-error");

	$('#contactForm').submit(function() {
		var $this = $(this);
		var isValid = $this.valid();

		if (!isValid) {
			$popupError.html("Пожалуйста, заполните все поля.").css("display", "block").removeClass("error-single_green");
		} else {
			$popupError.html("Выполняется отправка.").css("display", "block").addClass("error-single_green");

			$this.ajaxSubmit({
				data: {action: 'submit'},
				success: function(data) {
					//nginx only
					var outputString = data.split(".");
					var outputString = outputString[0] + ".";
	
					$popupError.html(outputString);
					if (outputString.indexOf("Ваше сообщение отправлено.") !== -1) {
						$this[0].reset();
						$popupError.addClass("error-single_green");

						fbq('track', 'Lead', {
							content_category: "form", 
						});
					} else {
						$popupError.removeClass("error-single_green");
					}
				},
				error: function() {
					$popupError.html("Произошла ошибка. Пожалуйста, попробуйте ещё раз.").removeClass("error-single_green");
				}
			});
			return false;
		}
	});





	//smooth scroll
	$(document).on('click', 'a', function(event){
		event.preventDefault();

		var href = $.attr(this, 'href');

		if (href === undefined || href === "") {
			return false;
		}

		if (href === "javascript:;") {
			return;
		}

		if (href !== "#" && !(/(assets)/.test(href))
			&& !(/(http)|(https)/.test(href)) && !(/(mailto)/.test(href))) {
				$('html, body').animate({
					scrollTop: $( $.attr(this, 'href') ).offset().top
				}, 600);
				return;
		}

		if (href === "#") {
			$('html, body').animate({
				scrollTop: 0
			}, 600);
		}

		if (/(mailto:)/.test(href)) {
			location.href = href;
			return;
		}

		if (!(/(assets)/.test(href))) {
			window.open(href,'_blank');
		}
	});





	// convert targeted .svg to inline svg
	jQuery('img.replace-svg[src$=".svg"]').each(function(){	
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);
		}, 'xml');
	});





	//initialize Sliiide
	var settings = {
		toggle: ".mobile-header-menu-a", // the selector for the menu toggle, whatever clickable element you want to activate or deactivate the menu. A click listener will be added to this element.
		exit_selector: ".slider-exit", // the selector for an exit button in the div if needed, when the exit element is clicked the menu will deactivate, suitable for an exit element inside the nav menu or the side bar
		animation_duration: "0.5s", //how long it takes to slide the menu
	 	place: "top", //where is the menu sliding from, possible options are (left | right | top | bottom)
		animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)", //animation curve for the sliding animation
		body_slide: false, //set it to true if you want to use the effect where the entire page slides and not just the div
	 	no_scroll: true, //set to true if you want the scrolling disabled while the menu is active
		auto_close: true //set to true if you want the slider to auto close everytime a child link of it is clicked
	};

	var mobileMenu = $("#mobile-menu").sliiide(settings); //initialize sliiide


	//toggle menu button
	$(".mobile-header-menu-a").on("click", function() {
		var $this = $(this);

		$this.children().toggle();
	});

	$(".mobile-header-logo-a").on("click", function() {
		if ($(".mobile-header-menu-burger").css("display") === "none") {
			mobileMenu.deactivate();
			$(".mobile-header-menu-a").children().toggle();
		}
	});

	$("#mobile-menu a").on("click", function() {
		$(".mobile-header-menu-a").children().toggle();
	});





	//adjust height of h2 wrapper line
	function adjustH2WrapperLines() {
		var $h2Wrapper = $(".h2-wrapper");

		$h2Wrapper.each(function() {
			var $this = $(this);
			var $h2Line = $this.children().first();
			var $h2TextWrapper = $this.children().last();

			$h2Line.height($h2TextWrapper.height());
		});
	}

	adjustH2WrapperLines();
	
	$(window).on("resize", debounce(function() {
		adjustH2WrapperLines();
	}, 150));





	//position portfolio animation circles
	function positionPortfolioCircles(that) {
		var $this = $(that);

		var $portfolioContainer = $("#portfolio>.container-1200");
		var $portfolioH2Wrapper = $(".portfolio-h2-wrapper");
		var $portfolioImg = $this || $(".portfolio-img");
		var $portfolioCircles = ($this && $this.siblings()) || $(".portfolio-animation-circle-wrapper");
		var windowWidth = $(window).width();

		
		if (windowWidth > 800) {
			var imgCenterY = $portfolioImg.height() / 2 + $portfolioImg.parent().position().top;
			var imgCenterX = $portfolioImg.width() / 2 + $portfolioImg.offset().left
				- parseInt($portfolioContainer.css("margin-left"));

			$portfolioCircles.width($portfolioImg.width() * 1.05).height($portfolioImg.width() * 1.05);
			$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2 + 5);
			$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 58);

		} else if (windowWidth > 420) {
			var imgCenterY = $portfolioImg.height() / 2;
			var imgCenterX = $portfolioImg.width() / 2 + $portfolioImg.position().left;

			$portfolioCircles.width($portfolioImg.width() * 1.1).height($portfolioImg.width() * 1.1);
			$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2 + 10);
			$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 15);

		} else {
			var imgCenterY = $portfolioImg.height() / 2;
			var imgCenterX = $portfolioImg.width() / 2 + $portfolioImg.position().left;

			$portfolioCircles.width($portfolioImg.width() * 1.1).height($portfolioImg.width() * 1.1);
			$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2);
			$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 15);
		}
	}

	$(window).on("resize", debounce(function() {
		$(".portfolio-img").each(function () {
			positionPortfolioCircles(this);
		});
	}, 125));

	// function positionPortfolioCircles() {
	// 	var $portfolioContainer = $("#portfolio>.container-1200");
	// 	var $portfolioH2Wrapper = $(".portfolio-h2-wrapper");
	// 	var $portfolioImg = $(".portfolio-img");
	// 	var $portfolioCircles = $(".portfolio-animation-circle-wrapper");
	// 	var windowWidth = $(window).width();

	// 	var imgCenterY = $portfolioImg.height() / 2 + $portfolioImg.parent().position().top
	// 		+ $portfolioH2Wrapper.outerHeight(true);
	// 	var imgCenterX = $portfolioImg.width() / 2 + $portfolioImg.offset().left
	// 		- parseInt($portfolioContainer.css("margin-left"));

		
	// 	if (windowWidth > 768) {
	// 		$portfolioCircles.width($portfolioImg.width() * 1.1).height($portfolioImg.width() * 1.1);
	// 		$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2);
	// 		$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 35);
	// 	} else if (windowWidth > 420) {
	// 		$portfolioCircles.width($portfolioImg.width() * 1.1).height($portfolioImg.width() * 1.1);
	// 		$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2 + 20);
	// 		$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 30);
	// 	} else {
	// 		$portfolioCircles.width($portfolioImg.width() * 1.1).height($portfolioImg.width() * 1.1);
	// 		$portfolioCircles.css("top", imgCenterY - $portfolioCircles.height() / 2 + 25);
	// 		$portfolioCircles.css("left", imgCenterX - $portfolioCircles.width() / 2 - 20);
	// 	}
	// }





	//resize banner background
	function resizeBannerBackground() {
		var $window = $(window);

		if ($window.width() > 1000) {
			var $window = $(window);
			var $banner = $("#banner");
			var $bannerDecorations = $(".banner-decorations");
			var $bannerTextContainer = $(".banner-text-container");
	
			var availableSpaceOffsetLeft = 80;
			var decorationsOffsetRight = -57;
	
			var availableWidth = $window.width() - ($bannerTextContainer.width()
				+ $bannerTextContainer.offset().left) + availableSpaceOffsetLeft;
			var availableHeight = $banner.outerHeight();
	
			var contentWidth = $bannerDecorations.outerWidth();
			var contentHeight = $bannerDecorations.outerHeight();
	
			var scale = Math.min( 
				availableWidth / contentWidth, 
				availableHeight / contentHeight 
			);
			scale = scale.toFixed(3);
	
			$bannerDecorations.css("transform", "translateY(-50%)" + "scale(" + scale + ")");
			$bannerDecorations.css("right", decorationsOffsetRight * scale);
		
		} else if ($window.width() > 768) {
			var $bannerDecorations = $(".banner-decorations");

			$bannerDecorations.css("transform", "translateY(-50%) scale(0.348)");
			$bannerDecorations.css("right", "-19.836px");
		}
	}

	$(window).on("resize", debounce(function() {
		resizeBannerBackground();
	}, 125));





	//change active menu item on scroll
	function changeActiveMenuItemOnScroll() {
		var scrollPos = $(document).scrollTop();
		$('.header-menu-a').each(function () {
				var $currLink = $(this);
				var refElement = $($currLink.attr("href"));
				if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight(true) > scrollPos) {
					$('.header-menu-a').removeClass("header-menu-a_active");
					$currLink.addClass("header-menu-a_active");

					paginationUnderlineTransition(
						$(".header-menu-nav"),
						".header-pagination-underline",
						$(".header-menu-a_active"),
						0.99
					);

				} else {
					$currLink.removeClass("header-menu-a_active");
				}
		});
	}

	$(window).on("scroll", debounce(function() {
		changeActiveMenuItemOnScroll();
	}, 50));




	//fire resize event for the document
	$(window).trigger('resize');





	//animations
	if ($(window).width() >= 768) {
		$(".banner-scroll-btn").hover( 
			//hover in
			function() {
				TweenMax.to($(".banner-scroll-img-wrapper"), 0.7, {y:30});
			},
			// hover out
			function() {
				TweenMax.to($(".banner-scroll-img-wrapper"), 0.7, {y:0});
			}
		);

		// $(".filled-btn").hover(
		// 	//hover in
		// 	function() {
		// 		TweenMax.to($(".filled-btn"), 0.1, {backgroundImage: "linear-gradient(360deg, #37a836, #246d2f)"});
		// 	},
		// 	// hover out
		// 	function() {
		// 		TweenMax.to($(this), 0.2, {backgroundImage: "linear-gradient(290deg, #37a836, #246d2f)"});
		// 	}
		// );

		
	// 	$(".programs-elem").hover(
	// 		//hover in
	// 		function() {
	// 			TweenMax.to($(this).find(".programs-btn"), 0.2, {backgroundImage: "linear-gradient(290deg, #37a836, #246d2f)"});
	// 		},
	// 		// hover out
	// 		function() {
	// 			TweenMax.to($(this).find(".programs-btn"), 0.2, {backgroundImage: "linear-gradient(0deg, rgba(43, 130, 49, 0), rgba(43, 130, 49, 0))"});
	// 		}
	// 	);

	// 	$(".popular-elem").hover(
	// 		//hover in
	// 		function() {
	// 			TweenMax.to($(this).find(".popular-btn"), 0.2, {backgroundImage: "linear-gradient(290deg, #37a836, #246d2f)"});
	// 		},
	// 		// hover out
	// 		function() {
	// 			TweenMax.to($(this).find(".popular-btn"), 0.2, {backgroundImage: "linear-gradient(0deg, rgba(43, 130, 49, 0), rgba(43, 130, 49, 0))"});
	// 		}
	// 	);
	}



	//animations on scroll
	var controller = new ScrollMagic.Controller();


	$(".h2-line").each(function() {
		//tween
		var tween = TweenMax.from($(this), 1.15, { autoAlpha: 0, height: 0,
			ease: Sine.easeInOut });

		//scene
		var scene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.9,
			reverse: false
		})
		.setTween(tween)
		.addTo(controller);
	});


	$(".banner-break").each(function() {
		//tween
		var tween = TweenMax.from($(this), 1.15, { autoAlpha: 0, width: 0,
			ease: Sine.easeInOut });

		//scene
		var scene = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0.9,
			reverse: false
		})
		.setTween(tween)
		.addTo(controller);
	});



	if ($(window).width() >= 768) {

		$(".note-wrapper").each(function() {
			//tween
			var tween = TweenMax.from($(this), 1.15, { autoAlpha: 0, x:-200,
				skewX:"10deg", ease:Back.easeOut.config(0.5) });

			//scene
			var scene = new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: 0.9,
				reverse: false
			})
			.setTween(tween)
			.addTo(controller);
		});



		$("#proofs").each(function() {
			//tween
			var tween = TweenMax.staggerFrom($(".proofs-p"), 1.15, { autoAlpha: 0, y:50,
				ease:Back.easeOut.config(0.5) }, 0.1);

			//scene
			var scene = new ScrollMagic.Scene({
				triggerElement: $(".proofs-p").first()[0],
				triggerHook: 1,
				reverse: false
			})
			.setTween(tween)
			.addTo(controller);
		});
	}
});


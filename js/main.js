$(document).ready(function(){
	////index.html
	//s_slider
	if($('.s_main').length){
		if(Modernizr.mq('only screen and (min-width: 1790px)')){
			var offsetContainer = {left:$('.header .container').offset().left};
			$('.s_main__slider_itemContainer, .s_main__pager').css({
				'padding-left': offsetContainer.left+'px'
			});
		}
		var mainSlider = new Swiper('.s_main__slider_wrp',{
			slidesPerView: 1,
			loop: true,
			autoHeight: true,
			autoplay: {
				delay: 4000
			},
			on:{
				slideChange: function(){
					var n = this.realIndex;
					setTimeout(function(){
						$('.s_main__img_item').eq(n).addClass('_current').siblings('._current').removeClass('_current');
					},150);
				}
			},
			pagination:{
				el: '.s_main__pager',
				type: 'bullets',
				clickable: true
			},
			breakpoints:{
				768: {
					autoplay: false
				}
			}
		});
		$('.s_slider__pager p span').click(function(){
			swipeSlider.slideTo($(this).index());
		});
	}
	////.compare.html
	//s_compare
	if($('.s_compare__slider').length){
		var compareSlider = new Swiper('.s_compare__slider_wrp',{
			slidesPerView: 3,
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				dragSize: 30
			},
			breakpoints:{
				1180:{
					slidesPerView: 2
				},
				850:{
					slidesPerView: 1
				}
			}
		});
	}

	////faq.html
	//questions toggle
	$('.s_faq__item').click(function(){
		$(this).toggleClass('_active');
	});

	////profile.html
	//profile item toggle
	$('.s_profile__item_head').click(function(){
		var item = $(this).closest('.s_profile__item');
		if(item.hasClass('_active')){
			item.addClass('_back');
			setTimeout(function(){
				item.removeClass('_back _active');
			},370);
		}else{
			item.addClass('_active');
		}
	});


	//coockie
	if(Cookies.get('was')==undefined){
		setTimeout(function(){
			$('.overlay, .popup_coockie').addClass('_visible');
		},1000);
		Cookies.set('was','true');
	}

	////events
	//hamb
	$('.header__hamb').click(function(){
		$(this).toggleClass('_active');
		$('.header__nav').toggleClass('_active');
	});
	//cart
	$('.header__cart').click(function(e){
		$('.popup_pay').removeClass('_visible');
		$('.popup_cart, .overlay2').addClass('_visible');
		$('.header').addClass('_white');
	});
	$('.popup_cart__close').click(function(){
		$('.popup_cart, .overlay2').removeClass('_visible');
		$('.header').removeClass('_white');
	});
	//payment
	$('.s_cart__buy').click(function(e){
		e.preventDefault();
		$('body,html').stop().animate({scrollTop:0},500);
		$('.popup_cart').removeClass('_visible');
		$('.popup_pay, .overlay2').addClass('_visible');
		$('.header').addClass('_white');
	});
	$('.popup_pay__close').click(function(){
		$('.popup_pay, .overlay2').removeClass('_visible');
		$('.header').removeClass('_white');
	});
	//selects
	$('.g_select__head').click(function(e){
		$(this).closest('.g_select').toggleClass('_active');
	});
	$('.g_select__body a').click(function(e){
		e.preventDefault();
		var a = $(this),
			txt = a.text(),
			select = a.closest('.g_select'),
			input = select.find('input'),
			head = select.find('.g_select__head span');
		a.addClass('_current').siblings().removeClass('_current');
		input.val(txt);
		head.text(txt);
		select.removeClass('_error _active');
	});

	//g_txt
	if($('.g_txt table').length){
		$('.g_txt table').wrap('<div class="g_txt__table"></div>');
	}


	////cart
	//input number
	$('.g_num__next').click(function(){
		var arr = $(this),
			input = arr.closest('.g_num').find('input');
		input.val(Number(input.val())+1);
	});
	$('.g_num__prev').click(function(){
		var arr = $(this),
			input = arr.closest('.g_num').find('input'),
			val = input.val();
		if(val>1){
			input.val(Number(input.val())-1);
		}
	});
	//prevent only numbers
	$('.g_num__input').on('keydown',function(e){
		-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()
	});
	$('.popup_cart__itemColors a').click(function(){
		$(this).addClass('_current').siblings().removeClass('_current');
	});

	//inputs
	$('input,textarea').change(function(){
		if($(this).val()==''){
			$(this).removeClass('_active');
		}else{
			$(this).addClass('_active');
		}
	});

	//popups
	$('.popup').each(function(){
		var popup = $(this),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
	});
	$('._open_pop').click(function(e){
		e.preventDefault();
		var visible = $('.popup._visible');
		visible.addClass('_back');
		setTimeout(function(){
			visible.removeClass('_visible _back');
		},450);
		var name = $(this).data('name'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth(),
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
		popup.find('form').trigger( 'reset' );
		var itemName = $(this).data('item');
		if(itemName){
			itemName = itemName.replace(/<\/?[^>]+(>|$)/g, "");
			popup.find('.popup_add__item p').text(itemName);
		}
		if ($("body").height() > $(window).height() && !popup.hasClass('_absolute')){
			$('body,html').css({'overflow-y':'hidden','padding-right':'5px'});
		}
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});
	$('.overlay, ._close_pop').click(function(e){
		e.preventDefault();
		$('.popup._visible').addClass('_back');
		$('.overlay').removeClass('_visible');
		setTimeout(function(){
			$('.popup._visible').removeClass('_visible _back');
			$('body,html').css({'overflow-y':'visible','padding-right':'0'});
		},450);
	});
	$('.overlay2').click(function(e){
		e.preventDefault();
		$('.overlay2, .popup_cart, .popup_pay').removeClass('_visible');
	});

	//mask
//	$('input[name="phone"]').mask("+7 (999) 999-99-99");
	//validate
	$("._log").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				pass: {required: true},
				pass_rep: {required: true},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				var data = new FormData(it[0]);
				$('.popup').removeClass('_visible');
				var name = 'thnx'
				popup = $('.popup_'+name),
					popup_h = popup.outerHeight(),
					popup_w = popup.outerWidth(),
					h = $(window).height(),
					px = window.pageYOffset + h/2 - popup_h/2;
				popup.css({
					'top': px+'px',
					'margin-left': '-'+ popup_w/2 +'px',
				});
				$('.popup.popup_'+name+', .overlay').addClass('_visible');
				setTimeout(function () {
					if ($('.popup_thnx').hasClass('_visible')) {
						$('.popup_thnx, .overlay').removeClass('_visible');
					}
				}, 2000);
				$("form").trigger( 'reset' );
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});
	$("._validate").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: false},
				phone: {required: true},
				mail: {required: true},
				city: {required: false},
				name: {required: true},
				comment: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				var data = new FormData(it[0]);
				$.ajax({
					url: 'mail.php',
					type: 'POST',
					data: data,
					cache: false,
					processData: false,
					contentType: false,
					success: function( respond, textStatus, jqXHR ){
						$('.popup').removeClass('_visible');
						var name = 'thnx'
						popup = $('.popup_'+name),
							popup_h = popup.outerHeight(),
							popup_w = popup.outerWidth(),
							h = $(window).height(),
							px = window.pageYOffset + h/2 - popup_h/2;
						popup.css({
							'top': px+'px',
							'margin-left': '-'+ popup_w/2 +'px',
						});
						$('.popup.popup_'+name+', .overlay').addClass('_visible');
						setTimeout(function () {
							if ($('.popup_thnx').hasClass('_visible')) {
								$('.popup_thnx, .overlay').removeClass('_visible');
							}
						}, 2000);
						$("form").trigger( 'reset' );
					},
					error: function( jqXHR, textStatus, errorThrown ){
						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
					}
				});
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});
	(function (){
		var it = $('.s_reviews__form');
		it.validate({
			rules: {
				form: {required: false},
				review: {required: true},
				review_rate: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {

			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	}());
	(function (){
		var it = $('.s_cart__bot_form');
		it.validate({
			rules: {
				form: {required: false},
				promo: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {

			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	}());
	(function (){
		var it = $('.popup_pay__form');
		it.validate({
			rules: {
				form: {required: false},
				pay_method: {required: true},
				delivery_method: {required: true},
				name: {required: true},
				index: {required: true},
				phone: {required: true},
				address: {required: true},
				comment: {required: false},
				mail: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {

			},
			success: function () {},
			highlight: function (element, errorClass) {
				if($(element).parent('.g_select__head').length){
					$(element).closest('.g_select').addClass('_error');
				}else if($(element).parent('.g_radio').length){
					var name = $(element).attr('name');
					$('.g_radio input[name="'+name+'"]').addClass('_error');
				}else{
					$(element).addClass('_error');
				}
			},
			unhighlight: function (element, errorClass, validClass) {
				if($(element).parent('.g_select__head').length){
					$(element).closest('.g_select').removeClass('_error');
				}else if($(element).parent('.g_radio').length){
					var name = $(element).attr('name');
					$('.g_radio input[name="'+name+'"]').removeClass('_error');
				}else{
					$(element).removeClass('_error');
				}
			}
		});
	}());
	(function (){
		var it = $('.popup_edit__form');
		it.validate({
			rules: {
				form: {required: false},
				name: {required: true},
				old_pass: {required: false},
				mail: {required: true},
				new_pass: {required: false},
				phone: {required: true},
				retype_pass: {required: false}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {

			},
			success: function () {},
			highlight: function (element, errorClass) {
				if($(element).parent('.g_select__head').length){
					$(element).closest('.g_select').addClass('_error');
				}else if($(element).parent('.g_radio').length){
					var name = $(element).attr('name');
					$('.g_radio input[name="'+name+'"]').addClass('_error');
				}else{
					$(element).addClass('_error');
				}
			},
			unhighlight: function (element, errorClass, validClass) {
				if($(element).parent('.g_select__head').length){
					$(element).closest('.g_select').removeClass('_error');
				}else if($(element).parent('.g_radio').length){
					var name = $(element).attr('name');
					$('.g_radio input[name="'+name+'"]').removeClass('_error');
				}else{
					$(element).removeClass('_error');
				}
			}
		});
	}());

	$('._scroll').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var el = $(this).attr('href');
		$('body,html').stop().animate({scrollTop:$('.'+el).offset().top},500);
	});

	////thnx.html
	//custom share btns
	var url = "http://geizer.com/";
	$("#fb").click(function(){
		myPopup('https://www.facebook.com/sharer/sharer.php?u=' + url);
	});
	$("#tw").click(function(){
		myPopup('https://twitter.com/intent/tweet?text=Los mejores filtros de purificación de agua basados en el innovador material ARAGON '+ url);
	});
	$("#gg").click(function(){
		myPopup('https://plus.google.com/share?url=' + url);
	});
	function myPopup(url) {
		var ancho = $(window).width();
		var alto = $(window).height();
		window.open( url, "Compartir", "status = yes, height = 360, width = 500, resizable = yes, left ="+(ancho/2)+", top =" +(alto/2) );
		return false;
	}

	//contacts.html
	if($('.s_map').length){
		mapInitialize('s_map');
	}
});

//gmap init
function mapInitialize(el_id) {
	var center = $('#'+el_id).data('center').split(',');
	var kz = new google.maps.LatLng(center[0],center[1]);
	var mapOptions = {
		zoom: 18,
		center: kz,
		mapTypeControl: false,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false
	};
	var mapElement = document.getElementById(el_id);
	var map = new google.maps.Map(mapElement, mapOptions);

	var ico_img = {
		path: 'M8 0C3.6 0 0 3.63 0 8.1c0 1.16.24 2.28.7 3.3 2 4.44 5.83 9.1 6.96 10.44.1.1.2.16.34.16.13 0 .25-.06.34-.16 1.13-1.33 4.96-6 6.96-10.44.46-1.02.7-2.14.7-3.3C16 3.63 12.4 0 8 0zm0 12.3c-2.3 0-4.16-1.88-4.16-4.2C3.84 5.78 5.7 3.9 8 3.9s4.15 1.88 4.15 4.2c0 2.32-1.86 4.2-4.15 4.2z',
		fillColor: '#ff7200',
		fillOpacity: 1,
		scale: 1.95,
		strokeOpacity: 0
	};

	var points = $('#'+el_id).data('points').split(';');
	points.forEach(function(feature) {
		var ico = ico_img,
			dot_info = feature.split('['),
			dot = dot_info[0].split(','),
			content = dot_info[1];
		var marker = new google.maps.Marker({
			position: {
				lat: Number(dot[0]),
				lng: Number(dot[1])
			},
			icon: ico,
			map: map,
			title: "Мы находимся тут!",
			optimized: false
		});
		var infowindow = new google.maps.InfoWindow({
			content: content
		});
		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});
	});
}

"use strict";
(function(){
	var lastClickDiv;

	function animWelcome(){
		var heightWel = $('#welcome').height();
		if(heightWel > 0){
			$('#welcome').animate({height: '0px', opacity: 0}, 500);
		}; 
	};

	function animLang(){
		var heightWel = $('#lang').height();
		if(heightWel > 0){
			$('#lang').animate({height: '0px', paddingTop: '0px', opacity: 0}, 500);
		};
	};

	function animPaddingNav(){
		var paddingNav = parseInt($('.container').css('padding-top'));
		if(paddingNav > 0){
			$('.container').animate({paddingTop: '0px'}, 500);
		};
	};

	function animIdDiv(idDiv){
		$('.' + lastClickDiv).removeClass('active');
		$('#' + lastClickDiv).animate({height: 'hide', opacity: 'hide'}, 500);
		$('.' + idDiv).addClass('active');
		$('#' + idDiv).delay(450).animate({height: 'show', opacity: 'show'}, 500);
	};

	function getSetLocalStorage(name, str){
		if(str){
			localStorage.setItem(name, str);
		}else{
			return localStorage.getItem(name);
		};
	};

	function changeLanguageButton(){
		if($('#myonoffswitch:checked').length == 1){
	    	$('.en').animate({opacity:'hide'}, 300).css('display','none');
	    	$('.uk').animate({opacity:'show'}, 300).css('display','block');
	    	if(lastClickDiv){lastClickDiv[1] = 'uk'};
	    }else{
	    	$('.uk').animate({opacity:'hide'}, 300).css('display','none');
	    	$('.en').animate({opacity:'show'}, 300).css('display','block');
	    	if(lastClickDiv){lastClickDiv[1] = 'en'};
	    };
	}

	function changeLanguage(language){
		if(language === 'uk'){
			$('.en').css('display','none');
	    	$('.uk').css('display','block');
		}else{
			$('.uk').css('display','none');
	    	$('.en').css('display','block');
		}
	}

	function inner_logical(tClass, name, str){
		animWelcome();
		animLang();
		animPaddingNav();
		animIdDiv(tClass);
		getSetLocalStorage(name, str);
	}

	$('.nav').on('click', function(event){
		var target = event.target;
		var targClass = $(target).attr('class').split(' ');
		var classToString = targClass[0] + ' ' + targClass[1];
		switch(targClass[0]){
			case 'about': 
						inner_logical(targClass, 'works', '0');
			break;
			case 'works': 
						inner_logical(targClass, 'works', '1');
						getSetLocalStorage('lastClick', classToString);
			break;
			case 'contact': 
						inner_logical(targClass, 'works', '0');
			break;
		};
		lastClickDiv = targClass;
	});

	$('.onoffswitch-label').on('click', changeLanguageButton);

    window.onkeydown = function(event){
    	if(event.key === 'F5'){
    		localStorage.clear();
    		window.onbeforeunload = function() {
    			localStorage.clear();
		    };
    	}
    };


	if(getSetLocalStorage('works') === '1'){
		var stringTpClass = getSetLocalStorage('lastClick');
		lastClickDiv = stringTpClass.split(' ');
		changeLanguage(lastClickDiv[1]);
		animWelcome();
		animLang();
		animPaddingNav();
		animIdDiv('works');
	};

}());
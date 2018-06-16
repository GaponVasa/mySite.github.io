"use strict";
(function(){
	var lastClickDiv;

	function anim(){
		var heightWel = $('#welcome').height();
		if(heightWel > 0){
			$('#welcome').animate({height: '0px', opacity: 0}, 500);
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

	$('.nav').on('click', function(event){
		var target = event.target;
		var targClass = $(target).attr('class').split(' ');
		var classToString = targClass[0] + ' ' + targClass[1];
		switch(targClass[0]){
			case 'about': anim();
				animIdDiv(targClass);
				getSetLocalStorage('works', '0');
			break;
			case 'works': anim();
				animIdDiv(targClass);
				getSetLocalStorage('works', '1');
				getSetLocalStorage('lastClick', classToString);
			break;
			case 'contact': anim();
				animIdDiv(targClass);
				getSetLocalStorage('works', '0');
			break;
		};
		lastClickDiv = targClass;
	});

	$('.onoffswitch-label').on('click', changeLanguageButton);

    window.onkeydown = function(event){
    	console.log(event)
    	if(event.key === 'F5'){
    		window.onbeforeunload = function() {
    			localStorage.clear();
		    };
    	}
    };

	if(getSetLocalStorage('works') === '1'){
		var stringTpClass = getSetLocalStorage('lastClick');
		lastClickDiv = stringTpClass.split(' ');
		changeLanguage(lastClickDiv[1]);
		anim();
		animIdDiv('works');
	};

	
}());
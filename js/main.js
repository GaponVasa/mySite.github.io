$(function(){
	(function(){
		var lastClickDiv;

		function anim(){
			var heightWel = $('#welcome').height();
			if(heightWel > 0){
				$('#welcome').animate({height: '0px', opacity: 0}, 500);
			};
		};

		function animIdDiv(idDiv){
			if(lastClickDiv != idDiv){
				if(idDiv == 'works'){
					localStorage.setItem('works', 1);
					localStorage.setItem('lastClickDiv', lastClickDiv);
				};
				$('.' + lastClickDiv).removeClass('active');
				$('#' + lastClickDiv).animate({height: 'hide', opacity: 'hide'}, 500);
				$('.' + idDiv).addClass('active');
				$('#' + idDiv).delay(450).animate({height: 'show', opacity: 'show'}, 500);
			};
		};

		$('.nav').on('click', function(event){
			var target = event.target;
			var targClass = $(target).attr('class').split(' ');
			switch(targClass[0]){
				case 'about': anim();
					animIdDiv(targClass);
				break;
				case 'works': anim();
					animIdDiv(targClass);
				break;
				case 'contact': anim();
					animIdDiv(targClass);
				break;
			};
			lastClickDiv = targClass;
		});

		if(localStorage.getItem('works') == '1'){
			lastClickDiv = localStorage.getItem('lastClickDiv');
			anim();
			animIdDiv('works');
			lastClickDiv = 'works';
			localStorage.setItem('works', 0);
		};

		$('.onoffswitch-label').on('click', function(){
		    if($('#myonoffswitch:checked').length == 1){
		    	$('.en').animate({opacity:'hide'}, 300).css('display','none');
		    	$('.uk').animate({opacity:'show'}, 300).css('display','block');
		    }else{
		    	$('.uk').animate({opacity:'hide'}, 300).css('display','none');
		    	$('.en').animate({opacity:'show'}, 300).css('display','block');
		    };
		});
	}());
});
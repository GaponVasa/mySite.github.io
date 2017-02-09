$(document).ready(function(){
	//На главной странице изменяет цвет иконок раздела category
	$('.ladyImg').mouseenter(function(){
		$('.lady .img').css("background" , "url(img/lady.png) no-repeat 0 -143px");
	});
	$('.ladyImg').mouseleave(function(){
		$('.lady .img').css("background" , "url(img/lady.png) no-repeat 0 0");
	});
	$('.gentlemenImg').mouseenter(function(){
		$('.gentlemen .img').css("background" , "url(img/gentlemen.png) no-repeat 0 -143px");
	});
	$('.gentlemenImg').mouseleave(function(){
		$('.gentlemen .img').css("background" , "url(img/gentlemen.png) no-repeat 0 0");
	});
	$('.smallImg').mouseenter(function(){
		$('.small .img').css("background" , "url(img/small.png) no-repeat 0 -143px");
	});
	$('.smallImg').mouseleave(function(){
		$('.small .img').css("background" , "url(img/small.png) no-repeat 0 0");
	});
	//Делает равными размеры двух столбцов individ и msg на странице review
	heightMax();
	function heightMax(){
		var h1, h2;
		var lin = $('.post');
		for(var i = 0; i < lin.length; i++){
			h1 = $(lin[i]).find('.individ').height();
			h2 = $(lin[i]).find('.msg').height();
			if (h1 > h2) {
				$(lin[i]).find('.msg').height($(lin[i]).find('.individ').height());
			}else{ 
				$(lin[i]).find('.individ').height($(lin[i]).find('.msg').height());
			}
		};
	}
	// Валидация
	$('input[type="button"]').bind('click',function() {
		$('.add').css('display','none');
		$('.add p').html('Поле <span></span> не заполнено.');
		$('.row').removeClass('stress');
		$('.emai').css('display','none');
		var name = $('input[name="name"]').val();
		var city = $('input[name="city"]').val();
		var mail = $('input[name="e-mail"]').val();
		var topic = $('input[name="topic"]').val();
		var text = $('textarea').val();
		if(name == ''){
			$('.add').css('display','block').find('span').text('«Имя»');
			$('input[name="name"]').parent('.row').addClass('stress');
			return;
		}
		if(city == ''){
			$('.add').css('display','block').find('span').text('«Город»');
			$('input[name="city"]').parent('.row').addClass('stress');
			return;
		}
		if (mail  == ''){
			$('.add').css('display','block').find('span').text('«Электронный адрес»');
			$('input[name="e-mail"]').parent('.row').addClass('stress');
			return;
		}else{
			var reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
			if(!reg.test(mail)){
				$('.add').css('display','block');
				$('.add p').html('Поле <span>«Электронный адрес»</span> заполнено не верно.');
			}
		} 
		if(topic == ''){
			$('.add p').html('Поле <span></span> не заполнено.');
			$('.add').css('display','block').find('span').text('«Тема»');
			$('input[name="topic"]').parent('.row').addClass('stress');
			return;
		}
		if(text == ''){
			$('.add p').html('Поле <span></span> не заполнено.');
			$('.add').css('display','block').find('span').text('«Сообщение»');
			$('textarea').parent('.row').addClass('stress');
			return;
		}
	});

	
});

$(document).ready(function(){
	// 
	var numSwich = $('.active').closest('li').index();
	$('.statements li a').removeClass('look');
	$('.statements li').eq(numSwich).find('a').addClass('look');
	$('.switcher li a').click(function() {
		$('.statements li a').removeClass('look');
		numSwich = $('.active').closest('li').index();
		$('.statements li').eq(numSwich).find('a').addClass('look');
	});

	$('.column a').click(function(event) {
		var target = event.target;
		var minHeight = "200px", maxHeight = "430px";
		if($(target).siblings('.wrapP').height() == parseInt(minHeight)){
			$(target).siblings('.wrapP').animate({ 
        		height: maxHeight//Высота блока открытого
      		}, 800 );
		}else{
			$(target).siblings('.wrapP').animate({ 
        		height: minHeight//Высота блока закрытого
      		}, 600 );
		};
		return false;
	});


	
});
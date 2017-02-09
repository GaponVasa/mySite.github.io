	
jQuery(document).ready(function($){
	
	$('.wiev').on('click', function(){
		$('.wiev').removeClass('wievAct');
		var src = $(this).find('img').attr('src');
		$('.central img').attr('src', src);
		$(this).addClass('wievAct');
		return false;
	});


	var chid = $('.skills').find('.pie');
	for(var i = 0; i < chid.length; i++){
		var $ppc = $(chid[i]).find('.progress-pie-chart'),
	    percent = parseInt($ppc.data('percent')),
	    deg = 360*percent/100;
	  	if (percent > 50) {
	    	$ppc.addClass('gt-50');
	  	}
	  	$(chid[i]).find('.ppc-progress-fill').css('transform','rotate('+ deg +'deg)');
	  	$(chid[i]).find('.ppc-percents span').html(percent+'%');
	}

	$(".sel").selectbox();
});
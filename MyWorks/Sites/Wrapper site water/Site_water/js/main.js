$(document).ready(function(){

	$('.gallery .list li:eq(0)').css('opacity' ,'1');
	setTimeout(function(){
		startTimer();
	},1000);
	var $linam = 0;
	function startTimer() {
		intervalIDSE = window.setInterval(function() {
				$('.gallery .list li:eq('+$linam+')').animate({opacity: 0.3}, 300, "linear", function(){
					$('.switcher li:eq('+$linam+')').removeClass("active");
					$('.gallery .list li:eq('+$linam+')').removeClass("active");
					$linam++;
					if($linam>4){
						$linam=0;
						$('.switcher li:eq('+$linam+')').addClass("active");
						$('.gallery .list li:eq('+$linam+')').addClass("active");
						$('.gallery .list li:eq('+$linam+')').animate({opacity: 1}, 600, "linear", function(){
							$('.gallery .list li').stop();
						});
						window.clearInterval(intervalIDSE);
					};
					$('.switcher li:eq('+$linam+')').addClass("active");
					$('.gallery .list li:eq('+$linam+')').addClass("active");
					$('.gallery .list li:eq('+$linam+')').animate({opacity: 1}, 600, "linear", function(){
						$('.gallery .list li').stop();
					});
				});

		}, 5000);
	}
	$(".switcher li.active").mouseenter(function(){
		return false;
	});

	$(".switcher li").mouseenter(function(){
		$('.gallery .list li').stop();
		window.clearInterval(intervalIDSE);
		$linam = this.id;
		$('.switcher li').removeClass("active");
		$('.gallery .list li').animate({opacity: 0.3}, 300, "linear", function(){
			$('.gallery .list li').removeClass("active");
			$('.switcher li:eq('+$linam+')').addClass("active");
			$('.gallery .list li:eq('+$linam+')').addClass("active");
			$('.gallery .list li:eq('+$linam+')').animate({opacity: 1}, 600, "linear", function(){
				$('.gallery .list li').stop();
				window.clearInterval(intervalIDSE);
			});
		});
		return false;
	});

	$(".switcher li.active").mouseenter(function(){
		return false;
	});

	$('.commentlist li').click(function(){
		$(this).toggleClass("active");
		return false;
	})

	$(".online-link").click(function(){
		$("#sh_button").trigger('click');
		return false;
	})

});


function hideFormText() {
	var _inputs = document.getElementsByTagName('input');
	var _txt = document.getElementsByTagName('textarea');
	var _value = [];
	
	if (_inputs) {
		for(var i=0; i<_inputs.length; i++) {
			if (_inputs[i].type == 'text' || _inputs[i].type == 'password') {
				
				_inputs[i].index = i;
				_value[i] = _inputs[i].value;
				
				_inputs[i].onfocus = function(){
					if (this.value == _value[this.index])
						this.value = '';
				}
				_inputs[i].onblur = function(){
					if (this.value == '')
						this.value = _value[this.index];
				}
			}
		}
	}
	if (_txt) {
		for(var i=0; i<_txt.length; i++) {
			_txt[i].index = i;
			_value['txt'+i] = _txt[i].value;
			
			_txt[i].onfocus = function(){
				if (this.value == _value['txt'+this.index])
					this.value = '';
			}
			_txt[i].onblur = function(){
				if (this.value == '')
					this.value = _value['txt'+this.index];
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", hideFormText, false);
// запуск галлереи брендов на главной странице
$(document).ready(function(){
		$('div.dd_gallery').galleryScroll({
			btPrev: 'a.link-prev', 
			btNext: 'a.link-next'
		});
		$('.brand-equipment .dd_gallery').fadeOut(25);
		$('.brand-r-products .dd_gallery').fadeOut(25);
		$('.bw-wrapper').css("border","2px solid #0688d5");
		$('.brand-woter').addClass('active');
		$('.brand-woter').on('click', function(){
			$('.brand-woter .dd_gallery').delay(90).fadeIn();
			$('.brand-equipment .dd_gallery').fadeOut(25);
			$('.brand-r-products .dd_gallery').fadeOut(25);

			$('.bw-wrapper').css("border","2px solid #0688d5");
			$('.brand-woter').addClass('active');
			$('.beq-wrapper').css("border","2px solid #fff");
			$('.brand-equipment').removeClass('active');
			$('.brpr-wrapper').css("border","2px solid #fff");
			$('.brand-r-products').removeClass('active');
		});
		$('.brand-equipment').on('click', function(){
			$('.brand-equipment .dd_gallery').delay(90).fadeIn();
			$('.brand-woter .dd_gallery').fadeOut(25);
			$('.brand-r-products .dd_gallery').fadeOut(25);

			$('.beq-wrapper').css("border","2px solid #0688d5");
			$('.brand-equipment').addClass('active');
			$('.bw-wrapper').css("border","2px solid #fff");
			$('.brand-woter').removeClass('active');
			$('.brpr-wrapper').css("border","2px solid #fff");
			$('.brand-r-products').removeClass('active');
		});
		$('.brand-r-products').on('click', function(){
			$('.brand-r-products .dd_gallery').delay(90).fadeIn();
			$('.brand-woter .dd_gallery').fadeOut(25);
			$('.brand-equipment .dd_gallery').fadeOut(25);

			$('.brpr-wrapper').css("border","2px solid #0688d5");
			$('.brand-r-products').addClass('active');
			$('.bw-wrapper').css("border","2px solid #fff");
			$('.brand-woter').removeClass('active');
			$('.beq-wrapper').css("border","2px solid #fff");
			$('.brand-equipment').removeClass('active');
		});
		$('.reviewOpen').hide();
		$('.descriptionOpen').show();
		$('.attributesOpen').hide();

		$('.reviews_tab > a').on('click', function(){
			$('.reviewOpen').toggle();
			$('.descriptionOpen').hide();
			$('.attributesOpen').hide();
		});
		
		$('.description_tab > a').on('click', function(){
			$('.descriptionOpen').toggle();
			$('.reviewOpen').hide();
			$('.attributesOpen').hide();
		});
		
		$('.attributes_tab > a').on('click', function(){
			$('.attributesOpen').toggle();
			$('.descriptionOpen').hide();
			$('.reviewOpen').hide();
		});

	});
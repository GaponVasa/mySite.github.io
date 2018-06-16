

$(function(){//Дожидаемся загрузки всего документа
	//----------------------------объявляем функцию для заполнения дивами--------------------
	var n;
	var m;
	var t;
	function addDiv(n, m, t){
		for(var j=0;j<n;j++){
			for(var i=0;i<m;i++){
				$('<div class="Col1"></div>').appendTo(t);
				$('<div class="Col2"></div>').appendTo(t);
			};
			for(var i=0;i<m;i++){
				$('<div class="Col2"></div>').appendTo(t);
				$('<div class="Col1"></div>').appendTo(t);
			};
			$('.Col1, .Col2').css({"width":"20px","height":"20px","float":"left"});
		};
	};
	//------------------------------Начало----------------------------------
	$('.image').on('click', function(){
		$('#image').slideToggle('slow');
	});
	$('.mainpic').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе мейнпик
		if($(this).val()!=='none'){
			$('.mainpicelement').html('<img src=img/'+$(this).val()+'>')
		}else{
			// $('.mainpicelement').empty();//Убирает все внутри .mainpicelement
			$('.mainpicelement img').remove();//Убирает только img находящийся внутри .mainpicelement
		};

	});

	$('.width').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе width
		$('.mainpicelement').find('img').css({//Выбрали див, в нем нашли рисунок
			"width": $(this).val()+"px"//Рисунку наваляли css свойство ширины из значения текущего инпута, и не забыли к нему прилепить размерность
		}); 
	});
	$('.top').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе top
		$('.mainpicelement').css({//Выбрали див,
			"top": $(this).val()+"px"//div наваляли css свойство top из значения текущего инпута, и не забыли к нему прилепить размерность
		});     
	});
	$('.left').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе left
		$('.mainpicelement').css({//Выбрали див,
			"left": $(this).val()+"px"//div наваляли css свойство left из значения текущего инпута, и не забыли к нему прилепить размерность
		});     
	});
	// -------------------------ТЕКСТ---------------------
	$('.text').on('click', function(){
		$('#text').slideToggle('slow');
	});
	$('.textWr').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе left
		$('.maintext').html('<span>'+$(this).val()+'</span>')
		.css({"font-size": $(this).val()+"px"})
		.css({"top": $(this).val()+"px"})
		.css({"left": $(this).val()+"px"})
		.css({"font-family":$(this).val()})
	});
	$('.sizeText').on('change',function(){
		$('.maintext').find('span').css({//Выбрали див, в нем нашли рисунок
			"font-size": $(this).val()+"px"//Рисунку наваляли css свойство ширины из значения текущего инпута, и не забыли к нему прилепить размерность
		}); 
	});//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе width
		
	$('.topText').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе top
		$('span').css({//Выбрали див,
			"top": $(this).val()+"px"//div наваляли css свойство top из значения текущего инпута, и не забыли к нему прилепить размерность
		});     
	});
	$('.leftText').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе left
		$('span').css({//Выбрали див,
			"left": $(this).val()+"px"//div наваляли css свойство left из значения текущего инпута, и не забыли к нему прилепить размерность
		});
	});

	$('input[name=face]').on('change',function(){//Добавляем событи, которое отслеживаем, не изменился ли выбранный элемент в селектбоксе input[name=face]
		$('span').css({
			"font-family":$(this).val()
		});
	});
	$('.weight').on('change',function(){//ширина тексту
		$('span').css({"font-weight":$(this).val()});
	});
	$('.letter').on('change', function(){//ширина поміж словами
		$('span').css({"letter-spacing":$(this).val()+"px"});
	});
	$('.checkColor').on('click', function(){//вибір кольору тексту
		$('#checkColor').slideToggle('slow');
		$('#writeColor').fadeOut(50);
	});
	$('.writeColor').on('click', function(){
		$('#writeColor').slideToggle('slow');
		$('#checkColor').fadeOut(50);
	});
	$('#checkColor').on('change',function(){
		$('span').css({"color":$(this).val()});
	});
	$('input[name="writeColor"]').on('change',function(){
		if(!/^[a-fA-F0-9]{6}/.test(jQuery('input[name="writeColor"]').val())){
			alert("Цвет некорректен!");
			$('input[name="writeColor"]').val(' ');
			return false;
		}else{
			$('span').css({"color":"#"+$(this).val()});
		};
	});
	$('a').on('click',function(){
		$(this).css({"color":"#CEEA9E", "background-color":"#40600A", "border":"1px solid #68120B"}) ;
	});
	//------------------------низ футболки--------------------------
	$('.bottomRule').on('click', function(){
		$('#bottomRule').slideToggle('slow');
	});
	addDiv(n=2, m=10, t='.bottom');
	$('#bottomColor').on('change',function(){
		$('.bottom .Col1').addClass('Clr1');
		if($(this).val()!=='none'){
			$('.Clr1').css({"background-color":$(this).val()});
		}else{
			$('.Clr1').css({"background-color":"transparent"});
		};
	});
	//------------------------рукава футболки--------------------------
	$('.sleeve').on('click', function(){
		$('#sleeve').slideToggle('slow');
	});
	addDiv(n=3, m=3, t='.sleeveRight');
	addDiv(n=3, m=3, t='.sleeveLeft');
	$('#sleeveColor').on('change',function(){
		$('.sleeveRight .Col1').addClass('Clr2');
		$('.sleeveLeft .Col1').addClass('Clr2');
		if($(this).val()!=='none'){
			$('.Clr2').css({"background-color":$(this).val()});
		}else{
			$('.Clr2').css({"background-color":"transparent"});
		};
    });
});
$(document).ready(function(){
	// Pop up
$(".click-callme").click(function(){ //добавляем на кнопку
  $(".light-callme").show(); //добавляем на окно которое всплывает
  $(".light-box").show();//серая пелена на все окно(делалось для кроссбраузернсти)
  //$('select').customSelect();//нужен для дизайна селекта на первой странице
  return false;//чтобы не было прыжка вверх при клике на пустую сылку
  });
  $('.light-box').css("height", $(document).height()); //серая пелена на все окно
  $(".light-box").click(function(){ //серая пелена на все окно
   $(".hide").css("display","none"); //добавляем на те элементы которые будут прятаться
   });
  $(".close").click(function(){ //добавляем накрестик
   $(".hide").css("display","none"); //добавляем на те элементы которые будут прятаться
   return false;
   });
   $(".btn-callme-submit").click(function(){ //добавляем на кнопку сабмит на первом окне
   $(".thank").show(); //второе окно благодарности
   $(".light-box").show();
   $('select').customSelect();
   return false;
   });
   
//click text

  $(".clickA1").click(function(){
      $(".clickP1").animate({ 
        height: "293px"//Высота блока открытого
      }, 1500 );
      $('.clickA1').fadeOut(0);
      $('.clickA1_1').fadeIn(1500);
    });
  $(".clickA1_1").click(function(){
      $(".clickP1").animate({ 
        height: "119px"//Высота блока закрытого
      }, 1500 );
      $('.clickA1_1').fadeOut(0);
      $('.clickA1').fadeIn(500);
    });

  $(".clickA2").click(function(){
      $(".clickP2").animate({ 
        height: "512px"//Высота блока открытого
      }, 1500 );
      $('.clickA2').fadeOut(0);
      $('.clickA2_1').fadeIn(1500);
    });
  $(".clickA2_1").click(function(){
      $(".clickP2").animate({ 
        height: "119px"//Высота блока закрытого
      }, 1500 );
      $('.clickA2_1').fadeOut(0);
      $('.clickA2').fadeIn(500);
    });

  $(".clickA3").click(function(){
      $(".clickP3").animate({ 
        height: "870px"//Высота блока открытого
      }, 1500 );
      $('.clickA3').fadeOut(0);
      $('.clickA3_1').fadeIn(1500);
    });
  $(".clickA3_1").click(function(){
      $(".clickP3").animate({ 
        height: "119px"//Высота блока закрытого
      }, 1500 );
      $('.clickA3_1').fadeOut(0);
      $('.clickA3').fadeIn(500);
    });
  
});

(function(){
	window.onload = function(){
		var cont = document.getElementById('container');
		var counterStep = 0;//счетчик действий
		var count;//промежуточная переменная используется для расстановки квадратов 
		var startAnimate;//Переменная необходима для остановки анимации перемещения
		var strtMas = {
			cont1:{	dtop: 0,
					dleft: 0	},
			cont2:{	dtop: 0,
					dleft: 90	},
			cont3:{	dtop: 0,
					dleft: 180	},
			cont4:{	dtop: 0,
					dleft: 270	},
			cont5:{	dtop: 90,
					dleft: 0	},
			cont6:{	dtop: 90,
					dleft: 90	},
			cont7:{	dtop: 90,
					dleft: 180	},
			cont8:{	dtop: 90,
					dleft: 270	},
			cont9:{	dtop: 180,
					dleft: 0	},
			cont10:{dtop: 180,
					dleft: 90	},
			cont11:{dtop: 180,
					dleft: 180	},
			cont12:{dtop: 180,
					dleft: 270	},
			cont13:{dtop: 270,
					dleft: 0	},
			cont14:{dtop: 270,
					dleft: 90	},
			cont15:{dtop: 270,
					dleft: 180	},
			cont16:{dtop: 270,
					dleft: 270	}
		};

		function loadGame(){//выстраиваем в соответствии с  объектом strtMas
			for(var j = 1; j < 17; j++){
				count = "cont" + j;
				for(var i in strtMas){
					if(i == count){
						document.getElementById(count).style.top = strtMas[i].dtop + "px";
						document.getElementById(count).style.left = strtMas[i].dleft + "px";
					};
				};
			};
			document.getElementById("hold").style.zIndex = "200";
		};

		function sibling(targ, x, y){//проверяет событие произошло в соседей(1) (по вертикали и горизонтали) или нет(0). Проверяеся расстояние м/у дивами. 
			x = parseInt(x);
			y = parseInt(y);
			var topTarg = parseInt(targ.style.top);
			var leftTarg = parseInt(targ.style.left);
			if(Math.abs(x - leftTarg) == 90 && y - topTarg == 0|| Math.abs(y - topTarg) == 90 && x - leftTarg == 0){
				return 1;
			}else{
				return 0;
			};
		};

		function checkResult(){//проверяет совпадает или нет текущее положение дивов с шаблоном strtMas
			var j = 1, x, y;
			for(var i in strtMas){
				count = "cont" + j;
				y = parseInt(document.getElementById(count).style.top);
				x = parseInt(document.getElementById(count).style.left);
				if(!(i == count && y == strtMas[i].dtop && x == strtMas[i].dleft) ){
					return 0;
				};
				j++;
			};
			document.getElementById("win").style.display = "block";
			return 1;
		};

		function randomTug(){//заполняет игровое поле в соответсвии с произвольно заполненым массивом arrRandom в положения согласно шаблону strtMas
			document.getElementById("win").style.display = "none";
			document.getElementById("anim").style.display = "none";//
			document.getElementById("hold").style.zIndex = "1";
			var arrRandom = randomArray(16, 1, 16);
			var j = 0;
			for(var i in strtMas){ 
				count = "cont" + arrRandom[j];
				document.getElementById(count).style.top = strtMas[i].dtop + "px";
				document.getElementById(count).style.left = strtMas[i].dleft + "px";
				j++;
			};
		};

		function getRandomInt(min, max) {//находит произвольное число от min включно до max включно
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		function randomArray(length, min, max){//создает таблицу чисел от min до max длинной length, заполненую случайным образом
			var arrR = new Array();
			var randomDigit;
			var flag = false;
			do{
				randomDigit = getRandomInt(min, max);
				if(arrR.length != 0){
					for(var i = 0; i < arrR.length; i++){
						if(randomDigit == arrR[i]){
							flag = true;
							i = arrR.length;
						};
					};
					if(!flag){
						arrR.push(randomDigit);
					};
				}else{
					arrR.push(randomDigit);
				};
				flag = false;
			}while(arrR.length < length);
			return arrR;
		};
		
		function startAnimateDiv(targ, prmX, prmY, emp, side){//анимация перемещения блока
			var x = prmX;
			var y = prmY;
			var em = parseInt(emp);
			document.getElementById("anim").style.left = prmX + "px"; 
			document.getElementById("anim").style.top = prmY + "px";
			document.getElementById("anim").style.display = "block";
			if(side){
				startAnimate = setInterval(function(){
					var mark = (prmY > em)? -2 : 2;
					prmY = prmY + mark;
					if(prmY ==  em){
						clearInterval(startAnimate);
						document.getElementById("cont16").style.top = y + "px";
					};
					targ.style.top = prmY + "px";
				}, 5);
			}else{
				startAnimate = setInterval(function(){
					var mark = (prmX > em)? -2 : 2;
					prmX = prmX + mark;
					if(prmX ==  em){
						clearInterval(startAnimate);
						document.getElementById("cont16").style.left = x + "px";
					};
					targ.style.left = prmX + "px";
				}, 5);
			};
		};

		function game(){//запускаем игру
			counterStep = 0;
			document.getElementsByTagName('span')[0].innerHTML = counterStep;
			randomTug();
			document.getElementById("hold").style.zIndex = "1";
		};

		loadGame();

		document.getElementById('startGame').addEventListener('click', game);//событие нажатия на кнопку start

		document.getElementById('container').addEventListener('click', function(event){//обработчик события нажатия на отдаельный див
			var target = event.target;//ссылка на див в котором произошло событие "клик"
			var topEmpty = document.getElementById("cont16").style.top;
			var leftEmpty = document.getElementById("cont16").style.left;
			var promX = parseInt(target.style.left);
			var promY = parseInt(target.style.top);

			if(target != cont && target != document.getElementById("cont16") && target != document.getElementById("hold")){//отсекаем сработку при клике на контейнер и пустой див
				var dig = sibling(target, leftEmpty, topEmpty );//проверяем где прозошол клик(у правильных соседей или нет)
				if(dig){
					if(parseInt(leftEmpty) - parseInt(target.style.left) == 0){//проверяем где произошол клик по вертикали(у)?, если да меняем местами див пустой(cont16) и "кликнутый" 
						startAnimateDiv(target, promX, promY, topEmpty, 1);
						// target.style.top = topEmpty;
						// document.getElementById("cont16").style.top = promY + "px";
						document.getElementsByTagName('span')[0].innerHTML = ++counterStep;//счетчик действий
					}else{
						startAnimateDiv(target, promX, promY, leftEmpty, 0);
						// target.style.left = leftEmpty;
						// document.getElementById("cont16").style.left = promX + "px";
						document.getElementsByTagName('span')[0].innerHTML = ++counterStep;//счетчик действий
					};
				};
				checkResult();
			};
		});
	};
})();
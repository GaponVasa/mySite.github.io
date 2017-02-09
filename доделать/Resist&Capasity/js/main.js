window.onload = function(){
	var firstSel = document.getElementById('first');
	var secondSel = document.getElementById('second');
	var thirdSel = document.getElementById('third');
	var mulSel = document.getElementById('multipler');
	var limSel = document.getElementById('limit');
	var digit = {
					black: "0",
					brown: "1",
					red: "2",
					orange: "3",
					yellow: "4",
					green: "5",
					blue: "6",
					purple: "7",
					gray: "8",
					white: "9"
				};
	var mult = {	
					silver: -2,
					gold: -1,
					black: 0,
					brown: 1,
					red: 2,
					orange: 3,
					yellow: 4,
					green: 5,
					blue: 6,
					purple: 7,
					gray: 8,
					white: 9
				};
	var limit = {
					silver: 10,
					gold: 5,
					brown: 1,
					red: 2,
					green: 0.5,
					blue: 0.25,
					purple: 0.1,
					gray: 0.05
				};

	function digitRes(obj, x){
		for( var i in obj){
			if(x.options[x.selectedIndex].value == i){
				return obj[i];
			}
		}
	};

	function resWord(a){
		if(a < 1000){
			return a;
		};
		if(a < 1000000){
			return (a / 1000) + "k" ;
		};
		if(a < 1000000000){
			return (a / 1000000) + "M" ;
		};
		if(a < 1000000000000){
			return (a / 1000000000) + "Г" ;
		};
	};

	document.getElementById('resist').addEventListener("change", function(){//Изменяем цвет текста и фона согласно опциям
		var targ = event.target;//ссылаемся на элемент через событе
		var bgc = getComputedStyle(targ.options[targ.selectedIndex]).backgroundColor;//через DOM2 вычисляем стили getComputedStyle
		var clr = getComputedStyle(targ.options[targ.selectedIndex]).color;
		targ.style.backgroundColor = bgc;//присваеваем стили селекту
		targ.style.color = clr;
	});

	document.getElementById('resButton').addEventListener("click", function(){
		var resBlock = document.getElementById('reult');
		var promRes = parseInt(digitRes(digit, firstSel) + digitRes(digit, secondSel) + digitRes(digit, thirdSel)) * Math.pow(10, digitRes(mult, mulSel));
		var limRes = digitRes(limit, limSel);
		var valRes = resWord(promRes);
		resBlock.style.display = "block";
		resBlock.getElementsByTagName('p')[0].innerHTML = valRes + "Ом  +/-" + limRes +"%";
	});
};
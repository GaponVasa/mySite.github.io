window.onload = function(){
	function resWord(a, m){//функция для расчета мк и нано Фарад
		if(m == "nF"){
			return a / 1000;
		};
		if(m == "mkF"){
			return a / 1000000;
		};
	};

	document.getElementById('resButton').addEventListener("click", function(){
		var pattern = /[0-9]{3}/;//регулярное вырважение ищущее 3-и цифры подряд
		var resBlock = document.getElementById('reult')
        var input = document.getElementById('textEnter').value;

        if (pattern.test(input) && input.length == 3) {
            var d = parseInt(input[0] + input[1]);//значение первых двух чисел
            var mul = Math.pow(10, parseInt(input[2]));//множитель в пикоФарадах
            var resCap = d * mul;//результат
            var wordRes;//переменная по которой определяются выходные данные ф-ции  resWord
            // console.log("result - " + (d * mul) + "pF");
            resBlock.style.display = "block";
            document.getElementsByTagName('table')[0].style.display = "block";
            if(resBlock.getElementsByTagName('h2')[1]){
            	resBlock.getElementsByTagName('h2')[1].style.display = "none"
            };
            document.getElementsByTagName('td')[2].innerHTML = resCap;
            wordRes = "nF";
            document.getElementsByTagName('td')[1].innerHTML = resWord(resCap, wordRes);
            wordRes = "mkF";
            document.getElementsByTagName('td')[0].innerHTML = resWord(resCap, wordRes);
        }
        else {
            resBlock.style.display = "block";
            document.getElementsByTagName('table')[0].style.display = "none";
            if(!resBlock.getElementsByTagName('h2')[1]){
            	var el = document.createElement('h2');
                var textWarning =  document.createTextNode("неправильно введены данные");
                el.appendChild(textWarning);
                var node = resBlock.appendChild(el);
            }else{
            	resBlock.getElementsByTagName('h2')[1].style.display = "block"
            };
            
        }
	});
	
};
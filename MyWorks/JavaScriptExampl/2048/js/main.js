(function(){
	window.onload = function(){

		var container = document.getElementById('container');
		var count = "cont";
		var gO = "";
		var allDiv = container.getElementsByTagName('div');
		var empty;
		var gameClick = false;

		function emptyContainer(){
			var i = allDiv.length;
			for(var j = allDiv.length - 1; j >= 0; j--){
				allDiv[j].style.display = "block";
			};
			while(i--){
				if(allDiv[i].className !== ""){
					allDiv[i].className = "";
					allDiv[i].innerHTML = "";
				};
			};
		};

		function emptyDiv(){//счетчик пустых ячеек, необходим при уменьшении кол-ва пустых ячеек меньше 3 изменяет правила добавления новых ячеек
			var j = 0;
			for(var i = allDiv.length - 1; i >= 0; i--){
				if(allDiv[i].className == ""){ j++};
			};
			if(j == 0){return 'gameOver'};
			return j <= 3 ? true : false;
		};

		function randomNumber(max, min){
			return parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
		};

		function addCell(d, rN){
			var divOpacity = 0;
			document.getElementById(count + rN).style.opacity = divOpacity;
			var mark = 10;
			var timer;
			var timer = setInterval(function(){
				divOpacity = divOpacity + (mark/100);
				if(divOpacity >  1){
					clearInterval(timer);
				}else{
					document.getElementById(count + rN).style.opacity = divOpacity;
				};
			}, 30);
			document.getElementById(count + rN).className = "cell_" + d;
			document.getElementById(count + rN).innerHTML = d;
		};

		function randomAdd(){
			var randNum1 = randomNumber(16, 1);
			var randNum2 = randomNumber(16, 1);
			var lable = document.getElementById(count + randNum2).className == "" ? true : false;
			if(emptyDiv() == "gameOver"){//если пустых ячеек нет, запускает ф-цию changeSpanDiv которая скрывает все ячейки и отображает заставку
				gO = "gameOver";
				changeSpanDiv("none", "block");
				gameClick = false;
				return;
			};
			while(document.getElementById(count + randNum1).className == "" ? false : true){//проверяет занята или нет ячейка
				randNum1 = randomNumber(16, 1);
			};
			if(!emptyDiv()){
				while(!(randNum1 != randNum2) || !lable){//проверяет занята или нет ячейка и обязательно randNum1 != randNum2
					randNum2 = randomNumber(16, 1);
					lable = document.getElementById(count + randNum2).className == "" ? true : false;
				};
			};
			if(emptyDiv()){//если пустых ячеек меньше 3, добавляет только одну ячейку
				addCell(2, randNum1);
			}else{
				if(Math.random() <= 0.8){
					addCell(2, randNum1);
				}else{
					if(Math.random() >= 0.7){
						addCell(2, randNum1);
						addCell(4, randNum2);
					}else{
						addCell(2, randNum1);
						addCell(2, randNum2);
					};
				};
			};
		};

		function changeSpanDiv(divDisplay, spanDisplay){
			for(var i = allDiv.length - 1; i >= 0; i--){
				allDiv[i].style.display = divDisplay;
			};
			container.getElementsByTagName('span')[0].style.display = spanDisplay;
		};

		function changeDiv(i, j){
			var clN = document.getElementById(count + j).className;
			var inHtml = document.getElementById(count + j).innerHTML;
			document.getElementById(count + i).className = clN;
			document.getElementById(count + i).innerHTML = inHtml;
			document.getElementById(count + j).className = "";
			document.getElementById(count + j).innerHTML = "";
		};

		function sumCell(i, j){
			var sumIJ = parseInt(allDiv[i].innerHTML) + parseInt(allDiv[j].innerHTML);
			document.getElementById(count + (i + 1)).className = "cell_" + sumIJ;
			document.getElementById(count + (i + 1)).innerHTML = sumIJ;
			document.getElementById(count + (j + 1)).className = "";
			document.getElementById(count + (j + 1)).innerHTML = "";
			document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + sumIJ;
		};

		function moveUp(){
			for(var i = 0; i <= 3; i++){
				for(var j = i + 4; j <= (i + 12); ){
					allDiv[j - 4].className == "" ? empty = true : empty = false;
					if(allDiv[j].className != "" &&  empty){
						changeDiv(findEmptyUp(i, j), j + 1);
						empty = true;
					};
					j += 4;
				};
			};
		};

		function findEmptyUp(iMin, iMax){
			for(var i = iMin; i <= iMax; ){
				if(allDiv[i].className == ""){
					return i + 1;
				};
				i += 4;
			};
		};

		function matchingUp(){
			for(var i = 0; i <= 3; i++){
				for(var j = i + 4; j <= (i + 12); ){
					if(allDiv[i].className == ""){break};
					if(allDiv[j - 4].className == allDiv[j].className &&  allDiv[j - 4].className != ""){
						sumCell(j - 4, j);
					};
					j += 4;
				};
			};
		};

		function moveDown(){
			for(var i = 12; i <= 15; i++){
				for(var j = i - 4; j >= (i - 12); ){
					allDiv[j + 4].className == "" ? empty = true : empty = false;
					if(allDiv[j].className != "" &&  empty){
						changeDiv(findEmptyDown(j, i), j + 1);
						empty = true;
					};
					j -= 4;
				};
			};
		};

		function findEmptyDown(iMin, iMax){
			for(var i = iMax; i >= iMin; ){
				if(allDiv[i].className == ""){
					return i + 1;
				};
				i -= 4;
			};
		};

		function matchingDown(){
			for(var i = 12; i <= 15; i++){
				for(var j = i - 4; j >= (i - 12); ){
					if(allDiv[i].className == ""){break};
					if(allDiv[j + 4].className == allDiv[j].className &&  allDiv[j + 4].className != ""){
						sumCell(j + 4, j);
					};
					j -= 4;
				};
			};
		};

		function moveLeft(){
			for(var i = 0; i <= 12; ){
				for(var j = i + 1; j <= (i + 3); ){
					allDiv[j - 1].className == "" ? empty = true : empty = false;
					if(allDiv[j].className != "" &&  empty){
						changeDiv(findEmptyLeft(i, j), j + 1);
						empty = true;
					};
					j++;
				};
				i += 4;
			};
		};

		function findEmptyLeft(iMin, iMax){
			for(var i = iMin; i <= iMax; ){
				if(allDiv[i].className == ""){
					return i + 1;
				};
				i++;
			};
		};

		function matchingLeft(){
			for(var i = 0; i <= 12; ){
				for(var j = i + 1; j <= (i + 3); ){
					if(allDiv[i].className == ""){break};
					if(allDiv[j - 1].className == allDiv[j].className &&  allDiv[j - 1].className != ""){
						sumCell(j - 1, j);
					};
					j++;
				};
				i += 4;
			};
		};

		function moveRight(){
			for(var i = 3; i <= 15; ){
				for(var j = i - 1; j >= (i - 3); ){
					allDiv[j + 1].className == "" ? empty = true : empty = false;
					if(allDiv[j].className != "" &&  empty){
						changeDiv(findEmptyRight(i, j), j + 1);
						empty = true;
					};
					j--;
				};
				i += 4;
			};
		};

		function findEmptyRight(iMin, iMax){
			for(var i = iMin; i >= iMax; ){
				if(allDiv[i].className == ""){
					return i + 1;
				};
				i--;
			};
		};

		function matchingRight(){
			for(var i = 3; i <= 15; ){
				for(var j = i - 1; j >= (i - 3); ){
					if(allDiv[i].className == ""){break};
					if(allDiv[j + 1].className == allDiv[j].className &&  allDiv[j + 1].className != ""){
						sumCell(j + 1, j);
					};
					j--;
				};
				i += 4;
			};
		};

		function is_touch_device() {
		    return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
		};

		function game(){
			emptyContainer();
			if(gO == "gameOver"){
				emptyContainer();
				changeSpanDiv("block", "none");
				gO = "";
			};
			randomAdd();
			randomAdd();
			gameClick = true;
		};
		
		document.getElementById('startGame').addEventListener('click', game);
		
		if(is_touch_device){
			var initialPoint;
			var finalPoint;

			document.getElementById('startGame').addEventListener('touchstart', function(event) {
				event.preventDefault();
				event.stopPropagation();
				if (event.targetTouches.length == 1){game()};
			});

			document.addEventListener('touchstart', function(event) {
				event.preventDefault();
				event.stopPropagation();
				initialPoint=event.changedTouches[0];
			}, false);

			document.addEventListener('touchend', function(event) {
				event.preventDefault();
				event.stopPropagation();
				finalPoint=event.changedTouches[0];
				var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
				var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
				if ((xAbs > 20 || yAbs > 20) && gameClick) {
					if (xAbs > yAbs) {
						if (finalPoint.pageX < initialPoint.pageX){
						/*СВАЙП ВЛЕВО*/
							moveLeft();
							matchingLeft();
							moveLeft();
							randomAdd();
						}else{
						/*СВАЙП ВПРАВО*/
							moveRight();
							matchingRight();
							moveRight();
							randomAdd();
						};
					}else {
						if (finalPoint.pageY < initialPoint.pageY){
						/*СВАЙП ВВЕРХ*/
							moveUp();
							matchingUp();
							moveUp();
							randomAdd();
						}else{
						/*СВАЙП ВНИЗ*/
							moveDown();
							matchingDown();
							moveDown();
							randomAdd();
						};
					};
				};
			}, false);
		};

		document.addEventListener('keydown',function(event){
			if(gameClick && event.keyCode == 37){//left
				moveLeft();
				matchingLeft();
				moveLeft();
				randomAdd();
			};
			if(gameClick && event.keyCode == 38){//top
				moveUp();
				matchingUp();
				moveUp();
				randomAdd();
			};
			if(gameClick && event.keyCode == 39){//right
				moveRight();
				matchingRight();
				moveRight();
				randomAdd();
			};
			if(gameClick && event.keyCode == 40){//bottom
				moveDown();
				matchingDown();
				moveDown();
				randomAdd();
			};
		});
	};
})();
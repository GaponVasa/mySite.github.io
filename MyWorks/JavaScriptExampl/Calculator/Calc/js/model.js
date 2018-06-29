"use strict";
class Model{
	constructor(module){
		this._addModule = module;
		this.firstDigit = "";
		this.secondDigit = "";
		this.sign = "";
	};

	setGetFirstDigit(digit){
		if(digit){
			this.firstDigit = digit;
		}else{
			return this.firstDigit;
		};
		//console.log("Model this.firstDigit", this.firstDigit);
	};

	setSecondDigit(digit){
		if(digit){
			this.secondDigit = digit;
		}else{
			this.secondDigit = this.firstDigit;
		};
		//console.log("Model this.secondDigit", this.secondDigit);
	};

	setSign(sign){
		this.sign = sign;
		//console.log("Model this.sign", this.sign);
	};

	changeSignDigit(number){
		let first = parseFloat(this.firstDigit);
		let second = parseFloat(this.secondDigit);
		if(number === "first"){
			first = -first;
			this.firstDigit = first.toString();
			//console.log("Model changeSignDigit() this.firstDigit", this.firstDigit);
		}else{
			second = -second;
			this.secondDigit = second.toString();
			//console.log("Model changeSignDigit() this.secondDigit", this.secondDigit);
		};
	};

	toCalculate(){
		let first = parseFloat(this.firstDigit);
		let second = parseFloat(this.secondDigit);
		let sign = this.sign;
		//перевірка: введені всі параметри
		let flagAction = (!isNaN(first) && sign !== "" && !isNaN(second));
		// перевірка коли введено - число і нажато Enter
		let flag = (isNaN(first) && sign === '-' && !isNaN(second));
		// перевірка коли після завантаження програми першим нажато Enter
		let flagFirstEnter = (isNaN(first) && sign === '' && isNaN(second));
		// console.log("Model toCalculate() flagFirstEnter", flagFirstEnter);
		// console.log("Model toCalculate() flagAction", flagAction);
		// console.log("Model toCalculate() flag", flag);
		// console.log("Model toCalculate() first", first);
		// console.log("Model toCalculate() second", second);
		// console.log("Model toCalculate() sign", sign);
		if(flagAction){
			switch(sign){
				case "+":
					first = this._addModule.start(first, second, sign);
				break;
				case "-":
					first = this._addModule.start(first, second, sign);
				break;
				case "*":
					first = first * second;
				break;
				case "/":
					first = first / second;
				break;
			};
		}else if(flag){
			first = sign + second;
		}else if(flagFirstEnter){
			first = "0";
		};
		this.firstDigit = first.toString();
		//console.log("Model toCalculate() this.firstDigit", this.firstDigit);
	};

	getResult(){
		//console.log("Model getResult() this.firstDigit", this.firstDigit);
		return this.firstDigit;
	};
};
"use strict";
class View{
	constructor(model){
		this._model = model;
		this.sourceElement = document.querySelector(".calc");
		this.display = document.querySelector(".window .text");
		this.digit = "0";//для зберігання введеного числа
		this.pointFlag = true;//щоб ввести лише одну крапку в цифрі
		this.chain = {
			firstDigit : false,
			sign : false,//вводилась чи ні будь-яка математична дія
			secondSign : false,/*для події коли вводиться число знак знак і після багатократним натсканням = здобуваеться рез-т*/
			secondDigit : false,
			equals : false//вводився чи ні знак дорівнює
		};//флаг для ланцюга обчислень
	};

	init(){
		function is_touch_device() {//Перевіряємо, пристрій має тач екран. В тому числі і в IE.
		    return ('ontouchstart' in window) || ('onmsgesturechange' in window);
		};
		if(is_touch_device()){
			this.sourceElement.addEventListener('touchstart', this.clickSourceElement.bind(this), false);
			this.changeClass();
		}else{
			this.sourceElement.addEventListener('click', this.clickSourceElement.bind(this), false);
		};
		document.addEventListener('keydown', this.keyboardInput.bind(this), true);
	};

	//Змінюємо клас кнопок для того щоб при тач пристрої правильно відображався момент натискання на кнопку.
	changeClass(){
		let buttons = document.querySelectorAll('.buttons');
		buttons.forEach(el =>{
			el.classList.add('buttonsActive');
			el.classList.remove('buttons');
		});
	};

	clickSourceElement(event, targetElement){
		//console.log("------------start clickSourceElement(event)--------------");
		let target, value;
		//console.log("clickSourceElement(event) event =", event, ", targetElement =", targetElement);
		if(event){
			/*
			* Перевірка if(event.screenX !== 0 && event.screenY !== 0) потрібна для того щоб відрізнити 
			* подію натиснення enter(в button type="button" та input type="button" запускається подія
			* "click" з параметрами screenX, screenY та інш. які дорівнюють нуль) та клік на кнопці. 
			*/
			
			if(event.screenX !== 0 && event.screenY !== 0){
				target = event.target;
				value = target.value;
				//event.preventDefault();
				event.stopPropagation();
			}else{
				return;
			};
			//console.log("clickSourceElement(event) if(event)value =", value);
		}else{
			value = targetElement;
			//console.log("clickSourceElement(event) else value =", value);
		};
		//console.log("clickSourceElement(event) start sign ", this.chain.sign ,"firstDigit ", this.chain.firstDigit, "secondDigit ", this.chain.secondDigit, ", equals ", this.chain.equals );
		//console.log("clickSourceElement(event, targetElement) value =", value);
		//console.log("clickSourceElement(event, targetElement) target =", target);

		this.switcher(value);
		//console.log("clickSourceElement(event) end sign ", this.chain.sign ,"firstDigit ", this.chain.firstDigit, "secondDigit ", this.chain.secondDigit, ", equals ", this.chain.equals );
		//console.log("------------end clickSourceElement(event)--------------");
	};

	switcher(value){
		//console.log('switcher()')
		//console.log('switcher()  value', value)
		if(value !== ""){
			if(/\d/.test(value)){
				if(!this.chain.firstDigit){
					this.chain.firstDigit = true;
				}else if(this.chain.firstDigit && this.chain.sign){
					this.chain.secondDigit = true;
				};
				this.addDigit(value);
			}else if(/\./.test(value) && this.pointFlag){
				this.addPoint(value);
			}else if(/\/|\*|-|\+/.test(value)){
				this.addSign(value);
			}else if(/=/.test(value)){
				this.equals();
			}else if(/Clear/.test(value)){
				this.clear();
			}else if(/changeSign/.test(value)){
				//console.log("switcher()  if(/changeSign/.test(value))")
				this.changeSign();
			};
		};
	};

	addDigit(value){
		//console.log("addDigit(value) = ", value);
		let equalsFlag = this.chain.equals;
		let signFlag = this.chain.sign;
		let pointFlag = this.pointFlag;
		if(equalsFlag){
			//console.log("addDigit(value) sign ", this.chain.sign ,",secondSign ", this.chain.secondSign ,",firstDigit ", this.chain.firstDigit ,",secondDigit ", this.chain.secondDigit,",equals ", this.chain.equals, ",pointFlag", this.pointFlag);
			if(!pointFlag){
				this.addDigitAfterDigit(value);
			}else{
				this.addDigitAfterZero(value);
				//console.log("addDigit(value), addDigitAfterZero, equalsFlag");
			};
			// console.log("addDigit(value), addDigitAfterZero, equalsFlag");
		}else{
			if(this.digit === "0"){
				//console.log("addDigit(value), addDigitAfterZero2, this.digit === 0");
				this.addDigitAfterZero(value);
			}else{
				//console.log("addDigit(value), addDigitAfterDigit");
				this.addDigitAfterDigit(value);
			};
		};
		this.chain.equals = false;
	};

	addDigitZeroPoint(value){
		this.display.innerText = "0.";
		this.digit = "0.";
	};

	addDigitAfterZero(value){
		this.display.innerText = "";
		this.display.innerText = value;
		this.digit = value;
	};

	addDigitAfterDigit(value){
		this.display.innerText += value;
		this.digit += value;
	};

	addPoint(value){
		let equalsFlag = this.chain.equals;
		let signFlag = this.chain.sign;
		const arr = this.digit.split("");
		//console.log("ok point");
		if(arr.length === 1){
			//console.log("addPoint(value) arr.length = ", arr.length);
			//console.log("addPoint(value) equalsFlag = ", equalsFlag, "signFlag =", signFlag);
			if(!equalsFlag && !signFlag){
				this.addDigitAfterDigit(value);
				//console.log("addPoint(value) arr.length = 1, this.addDigitAfterDigit(value), !equalsFlag && !signFlag");
			}else if((!equalsFlag && signFlag) || (equalsFlag && !signFlag)){
				this.addDigitZeroPoint(value);
				//console.log("addPoint(value) arr.length = 1, this.addDigitZeroPoint(value), (!equalsFlag && signFlag) || (equalsFlag && !signFlag)");
			};
		}else{
			//console.log("addPoint(value) equalsFlag = ", equalsFlag, "signFlag =", signFlag);
			if(equalsFlag && !signFlag){
				this.addDigitZeroPoint(value);
			}else{
				this.addDigitAfterDigit(value);
			};
		};
		this.pointFlag = false;
		this.chain.equals = false;
	};

	addSign(value){
		let sign = this.chain.sign;
		let secondSign = this.chain.secondSign;
		let firstDigit = this.chain.firstDigit;
		let secondDigit = this.chain.secondDigit;
		let equals = this.chain.equals;
		//console.log("addSign(value) start sign ", sign ,",secondSign ", secondSign ,",firstDigit ", firstDigit ,",secondDigit ", secondDigit,",equals ", equals);
		if(equals){this.chain.equals = false};
		//коли введено дію перед цифрою. Пропускає лише мінус.
		if(!firstDigit && value !== "-"){
			//console.log("ok sign !-");
			return;
		};
		if(firstDigit && !sign  && !equals){//перший раз
			this._model.setGetFirstDigit(this.digit);
			//console.log("addSign(value), firstDigit && !sign  && !equals перший раз");
		}else if(firstDigit && sign && !secondDigit){//випадок коли після цифри і знака вводиться ще знак
			//console.log("addSign(value), firstDigit && sign && !secondDigit випадок коли після цифри і знака вводиться ще знак");
			if(this.display.innerText  === value){
				this.chain.secondSign = true;
			};
		}else if(firstDigit && secondDigit && !equals){//коли після введеня другої цифри вводиться знак
			this.equals();
			this.chain.equals = false;
			this.chain.firstDigit = true;
			this.chain.secondDigit = false;
			//console.log("addSign(value), firstDigit && secondDigit && !equals коли після введеня другої цифри вводиться знак");
		}else if(firstDigit && equals){//перший раз after =
			this._model.setGetFirstDigit();
			//console.log("addSign(value), firstDigit && equals перший раз after");
		}

		this.display.innerText = value;
		this._model.setSign(value);
		this.chain.sign = true;
		this.pointFlag = true;
		this.digit = "0";
		//console.log("addSign(value) end sign ", this.chain.sign ,",secondSign ", secondSign ,",firstDigit ", firstDigit ,",secondDigit ", secondDigit,",equals ", equals);
	};

	equals(){
		let sign = this.chain.sign;
		let secondSign = this.chain.secondSign;
		let firstDigit = this.chain.firstDigit;
		// console.log("equals() sign ", sign, " firstDigit ", firstDigit);
		if(firstDigit && secondSign){
			this._model.setSecondDigit();
		}else if(firstDigit && sign && !secondSign){
			this._model.setSecondDigit(this.digit);
		};
		this._model.toCalculate();
		this.display.innerText = this._model.getResult();
		this.chain.equals = true;
		this.chain.secondDigit = false;
		this.chain.sign = false;
		this.chain.secondSign = false;
		this.pointFlag = true;
		this.digit = "0";
		//console.log("equals() this.chain.equals", this.chain.equals);
	};

	clear(){
		this.display.innerText = "0";
		this.pointFlag = true;
		this.chain.firstDigit = false;
		this.chain.sign = false;
		this.chain.secondSign = false;
		this.chain.secondDigit = false;
		this.chain.equals = false;
		this.digit = "0";
		this._model.setGetFirstDigit("0");
		this._model.setSecondDigit("");
		this._model.setSign("");
	};

	changeSign(){
		//console.log('--------------changeSign() start-----------------')
		let firstDigit = this.chain.firstDigit;
		let secondDigit = this.chain.secondDigit;
		let sign = this.chain.sign;
		//console.log("changeSign()   this.chain", this.chain);
		if(firstDigit && !secondDigit){
			//console.log("changeSign() firstDigit && !secondDigit");
			if(!sign){
				this.digit = -this.digit;
				this._model.setGetFirstDigit(this.digit);
				//console.log("changeSign() firstDigit && !secondDigit, !sign");
				this._model.changeSignDigit("first");
			};
		}else if(firstDigit && secondDigit){
			//console.log("changeSign() firstDigit && secondDigit");
			this.digit = -this.digit;
			this._model.setSecondDigit(this.digit);
			this._model.changeSignDigit();
		};
		//!sign && (firstDigit || secondDigit)
		if( (!sign && firstDigit )||(sign && firstDigit && secondDigit)){
		//if(!sign && (firstDigit || secondDigit)){
			//console.log("changeSign() if(!sign && (firstDigit || secondDigit))");
			this.display.innerText = -this.display.innerText;
		}
	};

	keyboardInput(event){
		const objExample = [
    	{
    		key: "0",
    		keyCode: 96
    	},
    	{
    		key: "0",
    		keyCode: 48
    	},
    	{
    		key: "1",
    		keyCode: 97
    	},
    	{
    		key: "1",
    		keyCode: 49
    	},
    	{
    		key: "2",
    		keyCode: 50
    	},
    	{
    		key: "2",
    		keyCode: 98
    	},
    	{
    		key: "3",
    		keyCode: 99
    	},
    	{
    		key: "3",
    		keyCode: 51
    	},
    	{
    		key: "4",
    		keyCode: 100
    	},
    	{
    		key: "4",
    		keyCode: 52
    	},
    	{
    		key: "5",
    		keyCode: 101
    	},
    	{
    		key: "5",
    		keyCode: 53
    	},
    	{
    		key: "6",
    		keyCode: 102
    	},
    	{
    		key: "6",
    		keyCode: 54
    	},
    	{
    		key: "7",
    		keyCode: 103
    	},
    	{
    		key: "7",
    		keyCode: 55
    	},
    	{
    		key: "8",
    		keyCode: 104
    	},
    	{
    		key: "8",
    		keyCode: 56
    	},
    	{
    		key: "9",
    		keyCode: 105
    	},
    	{
    		key: "9",
    		keyCode: 57
    	},
    	{
    		key: ".",
    		keyCode: 110
    	},
    	{
    		key: "+",
    		keyCode: 107
    	},
    	{
    		key: "-",
    		keyCode: 109
    	},
    	{
    		key: "*",
    		keyCode: 106
    	},
    	{
    		key: "/",
    		keyCode: 111
    	},
    	{
    		key: "Enter",
    		keyCode: 13
    	},
    	{
    		key: "backspace",
    		keyCode: 8
    	},
    	{
    		key: "delete",
    		keyCode: 46
    	}
    ];
    const keyCodeEnter = 13;
    const keyCodeDelete = 46;
    const keyCodeBackspace = 8;
        if (event.key !== undefined && event.keyCode !== undefined) {
            let keyCode = event.keyCode;
            let key = event.key;
            let data = objExample.some(el =>{
                if(keyCode === el.keyCode){return true} 
            });
            //console.log("keyboardInput data =",data);
            if(data){
                //console.log("keyboardInput event.keyCode =", event.keyCode);
                //console.log("keyboardInput event.key =", event.key);
                if(keyCode === keyCodeEnter){key = "="};
                if(keyCode === keyCodeBackspace || keyCode === keyCodeDelete){key = "Clear"};
                this.clickSourceElement(undefined, key);
            };
        };
	};
};
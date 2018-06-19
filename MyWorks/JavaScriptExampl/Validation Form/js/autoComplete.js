"use strict";
/*
	Модуль autoComplete призначений для автоматичного заповнення форми. Ключовим елементом з допомогою якого проходить
	пошук елементів - атрибут name.
	buttonLink - елемент на який встановлюється обробка події 'click';
	formLink - форма яку треба автоматично заповнити
	obj - обєкт в який заносяться імена атрибутів name та бажані value в вигляді {name1:value1, name2:value2, ...}
*/
let objGood ={
	addressCity:"Kharkiv",
	addressCountry:"UA",
	addressLine1:"Jasminova",
	addressLine2:"100/4",
	addressPostalCode:"123434",
	addressRegion:"Kharkivska",
	birthdayDay:"1",
	birthdayMonth:"January",
	birthdayYear:"2017",
	contact:"email",
	email:"hapon.vasa@ukraine.com",
	firstName:"Vasyl",
	flag:false,
	gender:"male",
	lastName:"Hapon",
	password:"DFR45ty7",
	telephone:"+1234567890"
};

let autoComplete = (function(){
	let startAutoComplete = (buttonLink, formLink, obj) =>{
		let elementsName = formLink.querySelectorAll('[name]');
		let keys = Object.keys(objGood);

		buttonLink.addEventListener('click', function(){
			elementsName.forEach(el =>{
				let name = el.name;
				let key;
				keys.some((el,ind) =>{
					if(el === name){
						key = ind;
						return true;
					};
				});

				if(el.tagName === 'INPUT'){
					if(el.type === 'radio' || el.type === 'checkbox'){
						if(name === keys[key] && el.value === obj[name]){
							el.checked = true;
						};
					}else{
						if(name === keys[key]){
							el.value = obj[name];
						};
					}
				}else if(el.tagName === 'SELECT'){
					if(name === keys[key]){
						el.value = obj[name];
					};
				};
			});
			console.log('End autoComplete formName => ', formLink.name);
		});
	};
	return{
		start: startAutoComplete
	}
})();

//console.log('');
let button = document.getElementById('auto');
let formMy = document.forms.firstForm;
autoComplete.start(button, formMy, objGood);

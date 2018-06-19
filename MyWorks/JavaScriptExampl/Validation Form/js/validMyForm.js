"use strict";
/*
	Модуль validMyForm призначений для форми після повного заповнення.
	-setObj - функція яка встановлює обєкт validObj в який записуються дані після валідації
	-getObj - функція яка віддає заповнений обєкт validObj.
	-inputText - функція яка призначена для валідації input з текстовою начинкою.
		*link - посилання на input
		*pattern - регулярний вираз для переввірки input
		*errorLink - посилання на тег в якому буде повідомлення про помилку заповнення input
		*errorMessage - повідомлення про помилку заповнення форми для input
	-inputRadio - функція яка призначена для валідації radio button та checkbox
		*sourceElement - посилання на radio button
		*errorLink - посилання на тег в якому буде повідомлення про помилку заповнення radio button та checkbox
		*errorMessage - повідомлення про помилку заповнення форми для radio button та checkbox
	-inputPassword - функція яка призначена для валідації input password та passwordConfirm
		*link1 - посилання на input password
		*link2 - посилання на input passwordConfirm
		*pattern - посилання на тег в якому буде повідомлення про помилку заповнення input password
		*errorLink1 - посилання на тег в якому буде повідомлення про помилку заповнення форми для password 
		*errorLink2 - посилання на тег в якому буде повідомлення про помилку заповнення форми для passwordConfirm
		*errorMessage1 - повідомлення про помилку заповнення форми password
		*errorMessage2 - повідомлення про помилку заповнення форми passwordConfirm
	-select - функція яка призначена для валідації select
		*link - посилання на select один або масив select-ів
		*errorLink - посилання на тег в якому буде повідомлення про помилку заповнення select
		*errorMessage - повідомлення про помилку заповнення форми для select
*/
let validMyForm = (function() {
	let validObj;
	const TRUE = true;
	const FALSE = false;
	const WARNING = 'red';
	const GREY = '#ced4da';

	let setValidObj = (obj)=>{
		let keys = Object.keys(obj);
		if(keys.length === 1){
			validObj = obj
		}else{
			validObj = {flag:false};
			console.error('Object.length > 1!!!');
		};
	};

	let getValidObj = ()=>{return validObj};

	let addRemoveErrorMessage = (link, message)=>{
		if(message === " " && link.firstChild){		
			link.removeChild(link.firstChild);
		}else{
			link.textContent = message;
		};
	};

	let addErrorStyle = (link)=>{
		if(Array.isArray(link)){
			link.forEach(el =>{
				el.style.borderColor = WARNING;
			});
		}else{
			link.style.borderColor = WARNING;
		};
	};

	let removeErrorStyle = (link)=>{
		if(Array.isArray(link)){
			link.forEach(el =>{
				el.style.borderColor = GREY;
			});
		}else{
			link.style.borderColor = GREY;
		};
	};

	let addToObj = function(link){
		let add = function(linkOne, ind){
			let name = linkOne.name;
			let type = linkOne.type;
			let value = linkOne.value;
			let keys = Object.keys(validObj);
			if(ind === undefined){ind = ''};
			let flag = keys.some(el => {return el === `${name}${ind}`});
			if(type === 'checkbox' || type === 'radio'){
				if(linkOne.checked && !flag){
					validObj[`${name}${ind}`] = value;
				};
			}else{
				if(!flag){validObj[`${name}`] = value};
			};
		};
		if(typeof link === 'boolean'){
			validObj.flag = link;
		}else{
			if(Array.isArray(link)){
				link.forEach((el, ind) =>{
					add(el, ind);
				});
			}else{
				add(link);
			};
		};
	};

	let validInputText = function([link, pattern, errorLink, errorMessage]){
		if(pattern === ' '){
			if(link.value === ''){
				addToObj(FALSE);
				addRemoveErrorMessage(errorLink, errorMessage);
				addErrorStyle(link);
			}else{
				addToObj(TRUE);
				addToObj(link);
				addRemoveErrorMessage(errorLink, ' ');
				removeErrorStyle(link);
			};
		}else{
			if(!pattern.test(link.value)){
				addToObj(FALSE);
				addRemoveErrorMessage(errorLink, errorMessage);
				addErrorStyle(link);
				return false;
			}else{
				addToObj(TRUE);
				addToObj(link);
				addRemoveErrorMessage(errorLink, ' ');
				removeErrorStyle(link);
				return true;
			};
		};
	};

	let validSelect = function([link, errorLink, errorMessage]){
		let flag;
		if(Array.isArray(link)){
			flag = link.some(el => { if(el.value === '')return true});
			if(flag){
				addToObj(FALSE);
				addRemoveErrorMessage(errorLink, errorMessage);
				link.forEach(el =>{
					if(el.value === ''){
						addErrorStyle(el);
					}else{
						removeErrorStyle(el);
					};
				});
			}else{
				addToObj(TRUE);
				addToObj(link);
				addRemoveErrorMessage(errorLink, ' ');
				link.forEach(el =>{
					removeErrorStyle(el);
				});
			};
		}else{
			if(link.value === ''){
				addToObj(FALSE);
				addRemoveErrorMessage(errorLink, errorMessage);
				addErrorStyle(link);
			}else{
				addToObj(TRUE);
				addToObj(link);
				addRemoveErrorMessage(errorLink, ' ');
				removeErrorStyle(link);
			};
		};
	};
	
	let validChecked =function([sourceElement, errorLink, errorMessage]){
		let arrRadio = Array.prototype.slice.call(sourceElement);
		let flag;
		flag = arrRadio.some(el =>{return el.checked === true});
		if(!flag){
			addToObj(FALSE);
			addRemoveErrorMessage(errorLink, errorMessage);
		}else{
			addToObj(TRUE);
			addToObj(arrRadio);
			addRemoveErrorMessage(errorLink, ' ');
		};
	};

	let validPassword = function([link1, link2, pattern, errorLink1, errorLink2, errorMessage1, errorMessage2]){

		function validOnePassword (link, pattern, errorLink, errorMessage){
			if(pattern.test(link.value)){
				addRemoveErrorMessage(errorLink, ' ');
				removeErrorStyle(link);
				return true;
			}else{
				addRemoveErrorMessage(errorLink, errorMessage);
				addToObj(FALSE);
				addErrorStyle(link);
				return false;
			};
		}

		let onePass = validOnePassword(link1, pattern, errorLink1, errorMessage1);
		let twoPass = validOnePassword(link2, pattern, errorLink2, errorMessage2);

		if(onePass && twoPass){
			if(link1.value !== link2.value){
				addRemoveErrorMessage(errorLink1, errorMessage1);
				addRemoveErrorMessage(errorLink2, errorMessage2);
				addToObj(FALSE);
				addErrorStyle([link1, link2]);
			}else{
				addToObj(TRUE);
				addToObj(link1);
				addRemoveErrorMessage(errorLink1, ' ');
				addRemoveErrorMessage(errorLink2, ' ');
				removeErrorStyle([link1, link2]);
			};
		}

	};

	return {
		setObj: setValidObj,
		getObj: getValidObj,
		inputText: validInputText,
		inputRadio: validChecked,
		inputPassword: validPassword,
		select: validSelect
	};
})();
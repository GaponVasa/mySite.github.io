"use strict";
console.log('validation.js');
let validationMyForm = (function(){
	let validObj;//обєкт в який будуть заноситься дані з форми 
	let formLink;//посилання на елемент форми
	let elementsObject;//масиві обєктів в якому зібрані посилання на елементи валідації і правила валідації
	let currentLink;//посилання на функцію для обробки обєкту validObj після вдалої валідації
	//константа - назва класу, який добавляється до ul для відображення вимог валідації окремого елементу
	const VALUE_ERROR = 'value-error';
	
	//отримуємо посилання на обєкт в який будуть заноситься дані з форми 
	let setValidObj = (obj)=>{
		if(!obj){
			console.error('Object!!!');
			return false;
		}else{
			 validObj = obj;
			 return true;
		};
	};

	//передаємо посилання на обєкт в якому є дані з форми
	let getValidObj = ()=>{	return validObj};

	//отримуємо посилання на функцію, яка буде запущена після успішної валідації форми 
	let feedback = function(link){currentLink = link};

	//функція запуску початку валідації
	let startValidation = (link, arr) =>{
		formLink = link;
		elementsObject = arr;
		erorSetUp();
		registerListeners();
	};

	
	//ця функція вставляє elem після refElem
	let insertAfter = function(elem, refElem) {
		var parent = refElem.parentNode;
		var next = refElem.nextSibling;
		if (next) {
			return parent.insertBefore(elem, next);
		} else {
			return parent.appendChild(elem);
		};
	};


	//formSetUp - ця функція вставляє правила заповнення форми для кожного елементу згідно масиву formElementsObj
	let erorSetUp = function() {
		elementsObject.forEach(el =>{
			let ul = document.createElement('ul');
			let errorIdName = el.name + '-error';
			ul.setAttribute('id', errorIdName);
			ul.setAttribute('class', VALUE_ERROR);
			let li;
            el.rules.forEach(el1 =>{
            	li = document.createElement('li');
            	li.innerHTML += el1.messege;
            	ul.appendChild(li);
            });
            insertAfter(ul, el.siblingErrorElement);
		});
	};

	//функція створення обробки подій
	let registerListeners = () =>{

		formLink.addEventListener('keyup',function(event){
			let target = event.target;
			if(target.tagName === 'INPUT' && target.type !== 'radio' || target.type !== 'checkbox'){
				validation(target)
			};
		}, true);

		formLink.addEventListener('click',function(event){
			let target = event.target;
			if(target.type === 'radio' || target.type === 'checkbox'){
				if(target.type === 'radio'){
					validation(target);
				}else if(target.type === 'checkbox'){
					validation(target);
				};
			};
		}, true);

		formLink.addEventListener('blur',function(event){
			let target = event.target;
			if(target.tagName === 'SELECT'){
				validation(target);
			};
		}, true);

		formLink.addEventListener('submit',function(event){
			elementsObject.forEach((el,ind) =>{
				validation(el.element);
			});
			event.preventDefault();
			currentLink();
		});
	};

	//функія пошуку елемету targetName в масиві обєктів elementsObject. Повертає знайдений обєкт.
	let findArrElement = (targetName) =>{
		let index;
		elementsObject.some((el, ind) =>{
			if(el.name === targetName){
				index = ind;
				return true;
			};
		});
		return elementsObject[index];
	};

	//функція перевірки окремого елементу згідно правил в масиві elementsObject.
	let validation = (inputElement)=>{
		let nameElement;
		if(Array.isArray(inputElement)){
			nameElement = inputElement[0].name
		}else{
			nameElement = inputElement.name;
		};
		let linkToObj = findArrElement(nameElement);
		let ruleElement;
		let flag = true;
		linkToObj.rules.forEach((el,ind) =>{
			ruleElement = el.ruleElement();
			if(el.isValid(inputElement)){
				ruleElement.classList.add('valid');
				ruleElement.classList.remove('invalid');
				flag = flag & true;
			}else{
				ruleElement.classList.add('invalid');
				ruleElement.classList.remove('valid');
				flag = flag & false;
			};
		});
		if(flag){
			if(linkToObj.name === 'birthday'){
				addToObj(Array.prototype.slice.call(document.querySelectorAll('select[name=birthday]')), flag);
			}else{
				addToObj(linkToObj.element, flag);
			};
		};
	};

	//функція яка додає дані до обєкту validObj
	let addToObj = function(link, flag){
		let add = function(linkOne, ind){
			let name = linkOne.name;
			let type = linkOne.type;
			let value = linkOne.value;
			if(ind === undefined){ind = ''};
			if(type === 'checkbox' || type === 'radio' || (ind !== undefined && type === 'select-one')){
				if(linkOne.checked || type === 'select-one'){
					validObj[`${name}${ind+1}`] = value;
				};
			}else{
				if(flag){
					validObj[`${name}`] = value;
				};
			};
		};
		if(Array.isArray(link)){
			link.forEach((el, ind) =>{
				add(el, ind);
			});
		}else{
			add(link);
		};
	};


    return{
    	setObj: setValidObj,
		getObj: getValidObj,
		setFeedback: feedback,
    	start: startValidation
    }
})();
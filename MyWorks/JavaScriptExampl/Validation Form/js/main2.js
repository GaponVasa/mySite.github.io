"use strict";
console.log('main.js');

(function(){
	const MY_FORM = document.forms.firstForm;
	const VALID_OBJ_NAME = 'myValidFormInfo';
	let myObject = {};

	let isEmpty = function(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key)){
	            return false;//не пустий
	        };
	    };
	    return true;//пустий
	};

	let runGetObj = ()=>{
		myObject = validationMyForm.getObj();
		if(!isEmpty(myObject)){
			getSetLocalStorage.setLS(myObject, VALID_OBJ_NAME);
			window.location.href = 'result.html';
		};
	};

	validationMyForm.setObj(myObject);
	validationMyForm.setFeedback(runGetObj);
	validationMyForm.start(MY_FORM, formElementsObj);
	mouseOverOut.start(document.querySelectorAll('input[type=password]')[0]);
	mouseOverOut.start(document.querySelectorAll('input[type=password]')[1]);
})();


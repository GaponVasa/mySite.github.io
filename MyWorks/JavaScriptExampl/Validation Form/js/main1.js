"use strict";

(function(){
	let validObj;
	let linkBtn = document.getElementById('btn');
	const REG_PATTERN_EMAIL = /([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2,3}))/;
	const REG_PATTERN_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	const REG_PATTERN_POST_CODE = /\d/;
	const REG_PATTERN_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/m;
	const VALID_OBJ_NAME = 'myValidFormInfo';
	let arrFirstName = [document.querySelector('input[name=firstName]'),
						' ',
						document.getElementById('myForm-firstName-error'),
						'Error. Enter First Name'];
	let arrSecondName = [document.querySelector('input[name=lastName]'),
						' ',
						document.getElementById('myForm-lastName-error'),
						'Error. Enter Last Name'];
	let arrEmail = [document.querySelector('input[name=email]'),
					REG_PATTERN_EMAIL,
					document.getElementById('myForm-email-error'),
					'Error. Enter yours E-mail.'];
	let arrPhone = [document.querySelector('input[name=telephone]'),
					REG_PATTERN_PHONE,
					document.getElementById('myForm-telephone-error'),
					'Error. Enter yours telephone number.'];
	let arrGender = [document.querySelectorAll('input[name=gender]'),
					document.getElementById('myForm-gender-error'),
					'Error. Check gender.'];
	let arrLinks = [document.querySelector('select[name=birthdayDay]'),
						document.querySelector('select[name=birthdayMonth]'),
						document.querySelector('select[name=birthdayYear]')]
	let arrBithday = [arrLinks,
					document.getElementById('myForm-birthday-error'),
					'Error. Select yours birthday.'];
	let arrAddressline1 = [document.querySelector('input[name=addressLine1]'),
					' ',
					document.getElementById('myForm-addres-addressLine1'),
					'Error. Enter street.'];
	let arrAddressline2 = [document.querySelector('input[name=addressLine2]'),
					' ',
					document.getElementById('myForm-addres-addressLine2'),
					'Error. Enter apartment.'];
	let arrCity = [document.querySelector('input[name=addressCity]'),
					' ',
					document.getElementById('myForm-addres-city'),
					'Error. Enter city.'];
	let arrRegion = [document.querySelector('input[name=addressRegion]'),
					' ',
					document.getElementById('myForm-addres-region'),
					'Error. Enter region.'];
	let arrPostalCode = [document.querySelector('input[name=addressPostalCode]'),
					REG_PATTERN_POST_CODE,
					document.getElementById('myForm-addres-postalCode'),
					'Error. Enter Postal Code.'];
	let arrCountry = [document.querySelector('select[name=addressCountry]'),
					document.getElementById('myForm-addres-country'),
					'Error. Select country.'];
	let arrContact = [document.querySelectorAll('input[name=contact]'),
					document.getElementById('myForm-check-contact'),
					'Error. Check contact.'];
	let arrPassword = [document.querySelector('input[name=password]'),
					document.querySelector('input[name=passwordConfirmation]'),
					REG_PATTERN_PASSWORD,
					document.getElementById('myForm-password-error'),
					document.getElementById('myForm-passwordConfirmation-error'),
					'Error. Check password.',
					'Error. Check password confirm.'];

	let validation = () =>{
		validObj = {flag:false};
		validMyForm.setObj(validObj);
		validMyForm.inputText(arrFirstName);
		validMyForm.inputText(arrSecondName);
		validMyForm.inputRadio(arrGender);
		validMyForm.select(arrBithday);
		validMyForm.inputText(arrEmail);
		validMyForm.inputText(arrPhone);
		validMyForm.inputText(arrAddressline1);
		validMyForm.inputText(arrAddressline2);
		validMyForm.inputText(arrCity);
		validMyForm.inputText(arrRegion);
		validMyForm.inputText(arrPostalCode);
		validMyForm.select(arrCountry);
		validMyForm.inputRadio(arrContact);
		validMyForm.inputPassword(arrPassword);
		validObj = validMyForm.getObj();
		if(!isEmpty(validObj) && validObj.flag){
			getSetLocalStorage.setLS(validObj, VALID_OBJ_NAME);
			window.location.href = 'result.html';
			// console.dir(validObj);
		};
	};	

	function isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key)){
	            return false;
	        };
	    };
	    return true;
	};

	linkBtn.addEventListener('click', validation, true);
	mouseOverOut.start(document.querySelectorAll('input[type=password]')[0]);
	mouseOverOut.start(document.querySelectorAll('input[type=password]')[1]);
})();

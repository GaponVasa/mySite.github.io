"use strict";

let getSetLocalStorage = (function(){

	let setLocalStorage = function(obj, name){
		if(obj){
			localStorage.setItem(name, JSON.stringify(obj));
		};
	};

	let getLocalStorage = function(name){
		return JSON.parse(localStorage.getItem(name));
	};

	let toDisplayLocalStorage = function(name){
		let obj = getLocalStorage(name);
		if(obj === null){
			console.log("Local Storage not created");
		}else{
			console.log("Get Local Storage", obj);
		};
	};

	let deleteLocalStorage = function(name){
		localStorage.removeItem(name);
		console.log("Dlete Local Storage");
	};

	return{
		getLS: getLocalStorage,
		setLS: setLocalStorage,
		displayLS: toDisplayLocalStorage,
		deleteLS: deleteLocalStorage
	}
})();
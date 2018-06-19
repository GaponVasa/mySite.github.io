"use strict";
console.info('mouseOverOut.js');

let mouseOverOut = (function(){
	let init = (link)=>{
		link.addEventListener('mouseover',function(){link.type = 'text'});
		link.addEventListener('mouseout',function(){link.type = 'password'});
	}
	return{
		start: init
	}
})();
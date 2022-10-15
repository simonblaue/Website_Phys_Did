import {c} from './canvas.js';


const left_side = document.getElementById("left_side");

const sliders = [document.getElementById("x0"), document.getElementById("y0"), document.getElementById("vx0"), document.getElementById("vy0"), document.getElementById("w"), document.getElementById("Cm"), document.getElementById("Cr"),]

var phys_param = [x0, y0, vx0, vy0, w, Cm, Cr];



function rescale(num){
	return (num-50)/5
}


export function update(event, which){
	phys_param[which] = rescale(Number(event.srcElement.value));
	console.log("x0, y0, vx0, vy0, w, Cm, Cr: ", phys_param);
}
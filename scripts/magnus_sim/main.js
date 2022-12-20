
import { explicitEuler } from "./physics.js";

const plot_div = document.getElementById('plotly-object');
const sliders = [document.getElementById("x0"), document.getElementById("y0"), document.getElementById("vx0"), document.getElementById("vy0"), document.getElementById("w"), document.getElementById("Cm"), document.getElementById("Cr"),]

var physParam = [x0, y0, vx0, vy0, w, Cm, Cr];
const testParams = [0,0,1,10,3,0.5,0.2]

function initPhysParam(){
	let i = 0
	sliders.forEach(s=>{
		physParam[i] = Number(s.value)
		i += 1
	})
}

export function update(event, which){
	physParam[which] = Number(event.srcElement.value);
	console.log("x0, y0, vx0, vy0, w, Cm, Cr: ", physParam);
	updatePlot()
}

// Physics

function magnusODE(Y, params){
    let [cm, cr, w] = params
	let g=9.81
    let vx = Y[2]
	let vy = Y[3]
    let ax = -cr*Math.sqrt(vx**2+vy**2)*vx-cm*w*vy
    let ay = -g-cr*Math.sqrt(vx**2+vy**2)*vx-cm*w*vx
    return [vx, vy, ax, ay]
}

/// PLOTTING


function initPlot(){
	let Y0 = physParam.slice(undefined,4)
	let params = physParam.slice(4,undefined)
	
	Y0 = testParams.slice(undefined,4)
	params = testParams.slice(4,undefined)
	
	let values = explicitEuler(magnusODE, Y0, 0.01, 10,params )
	
	let data = {
			x: values[0],
			y: values[1],
		}

	let layout = {
		xaxis: {range: [-10, 10]},
		yaxis: {range: [-10, 10]},
	}
	
	Plotly.newPlot(plot_div, [data], layout);
}

function updatePlot(){
	let Y0 = physParam.slice(undefined,4)
	let params = physParam.slice(4,undefined)

	console.log(Y0,params)
	
	let values = explicitEuler(magnusODE, Y0, 0.01, 10,params )
	
	let update = {
			x: [values[0]],
			y: [values[1]],
		}
	
	Plotly.restyle(plot_div, update, );
}


// MAIN //

initPhysParam()
initPlot()
console.log("x0, y0, vx0, vy0, w, Cm, Cr: ", physParam);
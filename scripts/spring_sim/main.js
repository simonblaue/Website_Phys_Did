import { spring_physics2d } from "./physics.js"
import { Coordinateline_Euklidian2d } from "./coordinates.js"
import { drawablevVector } from "./drawablevector.js"


// Global Canvas
const canvas = document.getElementById("canvas")
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientWidth;
canvas.style.background = "white";
const c = canvas.getContext("2d")
const canvasSize = {x:canvas.width, y:canvas.height}

c.fillStyle = "black"
c.translate(canvas.width/2, canvas.height/2)

// Global Sliders
const mass_slider = document.getElementById("mass_slider")
const tension_slider = document.getElementById("tension_slider")
const friction_slider = document.getElementById("friction_slider")

// Global Spring
const boundaries = {x0: -10, x1:10, y0:-10, y1:10}

let spring = new spring_physics2d(canvasSize,boundaries, tension_slider.value/100, mass_slider.value/10, friction_slider.value/100)

// for stoping the animation
var stop_animation = false

// Div for Plotting
const plot_div = document.getElementById('plotly-object');

// Global Coordinates
const euclid_coords = new Coordinateline_Euklidian2d(boundaries)

// For Vectors apering where spring dragged
var vectors = []


 // Events
 var dragging = false
 
// ------- INIT END HERE ------- //
main()
// plot()
// ------- INIT END HERE ------- //

function addVector(event){
	let event_pos = getMouesPosition(event.offsetX, event.offsetY)
	let p = spring.canvas_to_physics(event_pos.x, event_pos.y)
	let F = spring.field_at(p.x, p.y)
	let canvasF = spring.physics_to_canvas(F.x,F.y)
	let v = new drawablevVector(event_pos, canvasF)
	vectors.push(v)
}


// ------- Canvas looking -------

function clear_canvas(){
	c.save()
	c.resetTransform()
	c.fillStyle= "white"
	c.clearRect(0,0,canvas.width, canvas.height)
	c.restore()
}


function redrawCanvas(){
	clear_canvas()
	vectors.forEach((v) => {
		v.draw(c)
	})
	spring.draw(c)
	euclid_coords.draw(canvas, c)
}

// ------- Animation stuff -------

export function toggleAnimation(){
	stop_animation = !stop_animation
	animate()
}


function animate(){
	let animationID
	if (stop_animation){
		animationID = 0
	}
	else{
		if (!dragging)
		animationID = requestAnimationFrame(animate)
		spring.update(c)
		redrawCanvas()
	}
}


// ------- Plot stuff -------

function plot(){
	let plotly_stuff = spring.plot_potential(canvas.width, canvas.height)
	Plotly.newPlot(plot_div, plotly_stuff.data, plotly_stuff.layout);
}

function update_plot(){
	let new_value = 0
	Plotly.restyle(plot_div, 'data_p',  [[new_value]] )
}



// ------- Event functions -------

function moveSpring(e) {
	if (dragging) {
		let mousePoint = getMouesPosition(e)
		let p = spring.canvas_to_physics(mousePoint.x, mousePoint.y)
		spring.endpoint = p
		redrawCanvas()
	}
}

export function resetSpring(e){
	spring = new spring_physics2d(canvasSize,boundaries, endpoint=spring.endpoint, k=tension_slider.value/100, m=mass_slider.value/10, friction=friction_slider.value/100)
	console.log(spring)
	redrawCanvas()
}

// ------- Canvas Event Handeling -------

function getMouesPosition(e) {
	const transform = c.getTransform();
	const transformedX = e.offsetX - transform.e;
	const transformedY = e.offsetY - transform.f;
	return { x: transformedX, y: -transformedY };
 }

function engage(e) {
	let mousePoint = getMouesPosition(e)
	let p = spring.canvas_to_physics(mousePoint.x, mousePoint.y);
	if (spring.near_end(p.x, p.y)) {
		dragging = true;
		moveSpring(e)
	}
};

function disengage() {
	dragging = false;
	document.body.style.cursor = "default";
	animate()
};

function CanvasMouseMove(e){
	let mousePoint = getMouesPosition(e);
	let p = spring.canvas_to_physics(mousePoint.x, mousePoint.y);
	if (dragging){
		moveSpring(e);
	}
	else if (spring.near_end(p.x, p.y)) {
		document.body.style.cursor = "pointer";
	}
	else {
		document.body.style.cursor = "default";
	}
}

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', CanvasMouseMove);
canvas.addEventListener('mouseup', disengage);
document.addEventListener('mouseup', disengage);

// ------- Slider Event Handeling -------

mass_slider.addEventListener('mouseup', resetSpring)


// ---------- Call on load --------


function main(){
	redrawCanvas()
	// animate()
}
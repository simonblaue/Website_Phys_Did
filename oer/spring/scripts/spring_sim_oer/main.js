import {spring_physics2d} from "./physics.js"
import {Coordinateline_Euklidian2d} from "./coordinates.js"
import {drawablevVector} from "./drawablevector.js"


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
const massSlider = document.getElementById("mass_slider")
const tensionSlider = document.getElementById("tension_slider")
const frictionSlider = document.getElementById("friction_slider")
const lengthSlider = document.getElementById("length_slider")

// Global Spring
const boundaries = {x0: -10, x1:10, y0:-10, y1:10}
const spring_base_length = 5

const init_spring_leng = lengthSlider.value/100 * spring_base_length

var spring = new spring_physics2d(canvasSize,boundaries,{x:init_spring_leng,y:0}, tensionSlider.value/100, massSlider.value/10, frictionSlider.value/100)
spring.vis = true
// for stoping the animation
var stop_animation = false


// Global Coordinates
const euclid_coords = new Coordinateline_Euklidian2d(boundaries)

// For Vectors apering where spring dragged
var vectors = []


 // Events
 var dragging = false
 

redrawCanvas()
requestAnimationFrame(animate)


// ------- INIT END HERE ------- //

function addVector(e){
	let event_pos = getMouesPosition(e)
	let p = spring.canvas_to_physics(event_pos.x, event_pos.y)
	let F = spring.field_at(p.x, p.y)
	let canvasF = spring.physics_to_canvas(F.x,F.y)
	let v = new drawablevVector(event_pos, canvasF)
	vectors.push(v)
}



// ------- Spring looks -------

export function toggleSpring(){
	spring.vis = !spring.vis
	redrawCanvas()
}

export function resetSpring(){
	clearCanvas()
	let new_spring_length = spring_base_length * lengthSlider.value/100
	let scale = new_spring_length / spring.l()
	let new_endpoint = {x: spring.endpoint.x*scale, y: spring.endpoint.y*scale}
	spring = new spring_physics2d(canvasSize,boundaries,new_endpoint, tensionSlider.value/100, massSlider.value/10, frictionSlider.value/100)
	redrawCanvas()
}


// ------- Canvas looks -------

export function clearCanvas(){
	c.save()
	c.resetTransform()
	c.clearRect(0,0,canvas.width, canvas.height)
	vectors = []
	c.restore()
	spring.draw(c)
	euclid_coords.draw(canvas, c)
}

export function showField(){
	vectors = []
	for (let i = -canvas.width; i < canvas.width; i+=2*canvas.width/22) {
		for (let j = -canvas.height; j < canvas.height; j+=2*canvas.height/22) {
			let p = spring.canvas_to_physics(i,j)
			let F = spring.field_at(p.x, p.y)
			let canvasF = spring.physics_to_canvas(F.x,F.y)
			let v = new drawablevVector({x:i,y:j}, canvasF)
			vectors.push(v)
		}
		
	}
}

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
		let p = spring.canvas_to_physics(v.pos.x, v.pos.y)
		let F = spring.field_at(p.x, p.y)
		let canvasF = spring.physics_to_canvas(F.x,F.y)
		v.s = canvasF
		v.draw(c)
	})
	spring.draw(c)
	euclid_coords.draw(canvas, c)
}

// ------- Animation  -------

export function toggleAnimation(){
	stop_animation = !stop_animation
	animate()
}

let previousTimeStamp
function animate(timeStamp){
	if (!dragging){
		
		if (previousTimeStamp !== timeStamp) {
			var ms = 1000; //1 second
			setTimeout(function(){}, ms);
			spring.update(c)
			redrawCanvas()
	}

		previousTimeStamp = timeStamp
		if (!stop_animation)
			requestAnimationFrame(animate)
	}
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

export function resetSpringafterSettingchange(e){
	let new_spring_length = spring_base_length * lengthSlider.value/100
	let scale = new_spring_length / spring.l()
	let new_endpoint = {x: spring.endpoint.x*scale, y: spring.endpoint.y*scale}
	spring = new spring_physics2d(canvasSize,boundaries,new_endpoint, tension_slider.value/100, mass_slider.value/10, friction_slider.value/100, spring.dr, spring.vis)
	redrawCanvas()
	animate()
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
	animate()
};

function disengage(e) {
	dragging = false;
	addVector(e)
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
// document.addEventListener('mouseup', disengage);

// ------- Slider Event Handeling -------

massSlider.addEventListener('mouseup', resetSpringafterSettingchange)
frictionSlider.addEventListener('mouseup', resetSpringafterSettingchange)
tensionSlider.addEventListener('mouseup', resetSpringafterSettingchange)
lengthSlider.addEventListener('mouseup', resetSpringafterSettingchange)


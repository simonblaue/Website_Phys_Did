import { spring_physics2d } from "./physics.js"
import { Coordinateline_Euklidian2d } from "./coordinates.js"
import { drawablevVector } from "./drawablevector.js"


// Global Canvas
const canvas = document.getElementById("canvas")
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientWidth;
const c = canvas.getContext("2d",  { alpha: false })
const canvasSize = {x:canvas.width, y:canvas.height}

c.fillStyle = "black"
c.translate(canvas.width/2, canvas.height/2)

// Global Spring
const boundaries = {x0: -10, x1:10, y0:-10, y1:10}

const default_k=1
const spring = new spring_physics2d(canvasSize,boundaries)

// Variables for handeling drawing
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

// for stoping the animation
var stop_animation = false
const btn_anim = document.getElementById("stop_anim")

// Div for Plotting
const plot_div = document.getElementById('plotly-object');

// Global Coordinates
const euclid_coords = new Coordinateline_Euklidian2d(boundaries)


// For Vectors apering where spring dragged
var vectors = []


main()

/////////// MAIN //////////////////

function getTransformedPoint(x, y) {
	const transform = c.getTransform();
	const transformedX = x - transform.e;
	const transformedY = y - transform.f;
	return { x: transformedX, y: -transformedY };
 }


function addVector(event){
	let event_pos = getTransformedPoint(event.offsetX, event.offsetY)
	let p = spring.canvas_to_physics(event_pos.x, event_pos.y)
	let F = spring.field_at(p.x, p.y)
	let canvasF = spring.physics_to_canvas(F.x,F.y)
	let v = new drawablevVector(event_pos, canvasF)
	console.log(event_pos)
	console.log(F, canvasF);
	vectors.push(v)
}



 // Events
 var drag = false
 
canvas.addEventListener('mousemove', (event) => {
	let event_pos = getTransformedPoint(event.offsetX, event.offsetY)
	let p = spring.canvas_to_physics(event_pos.x, event_pos.y)
	if (spring.near_end(p.x, p.y)) {
		document.body.style.cursor = "pointer"
		if (mouseDown){
			drag = true
			spring.endpoint = p
			redraw_canvas()
		}
	}
	else if (drag){
		spring.endpoint = p
	}
	else{
		document.body.style.cursor = "default"
	}
})

canvas.addEventListener("click", (event)=>{
	animate()
	if (drag) {
		addVector(event)
	}
	drag = false
})


//// Canvas looking

function clear_canvas(){
	c.save()
	c.resetTransform()
	c.clearRect(0,0,canvas.width, canvas.height)
	c.restore()
}


function redraw_canvas(){
	clear_canvas()
	vectors.forEach((v) => {
		v.draw(c)
	})
	spring.draw(c)
	euclid_coords.draw(canvas, c)
}

export function toggleAnimation(){
	stop_animation = !stop_animation
}


function animate(){
	let animationID
	if (stop_animation){
		animationID = 0
	}
	else{
		if (!mouseDown)
		animationID = requestAnimationFrame(animate)
		spring.update(c)
		redraw_canvas()
	}
}


function main(){
	redraw_canvas()
	animate()
}

import { spring_physics2d } from "./physics.js"

export const canvas = document.getElementById("canvas")
var c
var drawing = false

var spring_pos = {x:50, y:50}

const plot_div = document.getElementById('plotly-object');

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}


window.onload = (event) => {
	console.log(canvas)
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	Plotly.newPlot(plot_dic, surface_plot.data, surface_plot.layout)
	c = canvas.getContext("2d",  { alpha: false })
	c.fillStyle = "black"
	c.translate(canvas.width/2, canvas.height/2)

	main()
}



function draw_spring(){
	clear_canvas()
	c.beginPath()
	c.moveTo(0,0)
	c.lineTo(spring_pos.x,-spring_pos.y)
	c.stroke()
	c.closePath()
}

function clear_canvas(){
	c.save()
	c.resetTransform()
	c.clearRect(0,0,canvas.width, canvas.height)
	c.restore()
}

function getTransformedPoint(x, y) {
	const transform = c.getTransform();
	const transformedX = x - transform.e;
	const transformedY = y - transform.f;
	return { x: transformedX, y: -transformedY };
 }


function near_spring_end(p_phys){
		return Math.abs(spring_pos.x-p_phys.x) < 5 && Math.abs(spring_pos.y-p_phys.y) < 5
}


// canvas.addEventListener('mousedown', (event) =>{
// 	MouseDown = true
// })

// canvas.addEventListener('mouseup', (event)=>{
// 	MouseUp = false
// })

canvas.addEventListener('mousemove', (event) => {
	phys_pos = getTransformedPoint(event.offsetX, event.offsetY)
	if (near_spring_end(phys_pos)) {
		document.body.style.cursor = "pointer"
		if (mouseDown){
			drawing = true
		}
		else {
			drawing = false
		}
	}
	else{
		document.body.style.cursor = "default"
	}
	if (drawing){
		spring_pos = phys_pos
		draw_spring()
	}
})







		

function main(){
	draw_spring(spring_pos)
	
}
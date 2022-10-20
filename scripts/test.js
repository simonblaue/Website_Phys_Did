
const canvas = document.getElementById(`canvas`)
canvas.width = canvas.clientWidth
canvas.height = canvas.clientWidth
const ctx = canvas.getContext("2d",  { alpha: false })

ctx.translate(canvas.width/2, canvas.height/2)
//ctx.fillStyle = `black`

let n = 10 // number of windings

var endpoint = {x:10 ,y:-40}
var length = Math.sqrt(endpoint.x**2 + endpoint.y**2)

var l = length/(2*n)
var theta = Math.acos(endpoint.y/length)


ctx.save()
ctx.rotate(theta)

ctx.beginPath()
ctx.arc(0, 0, 2, 0, 2 * Math.PI)
ctx.moveTo(0, 0)


for (let i = 0; i <= n; i++) {
	ctx.lineTo(10,-l*(2*i))
	ctx.moveTo(10,-1*l*2*i)
	
	ctx.lineTo(-10,-l*(2*i+1))
	ctx.moveTo(-10,-l*(2*i+1))
}

ctx.stroke()
ctx.closePath()
ctx.restore()

ctx.beginPath()
ctx.lineTo(endpoint.x, -endpoint.y)
ctx.arc(endpoint.x, -endpoint.y,2,0,2*Math.PI)
ctx.stroke()
ctx.closePath()
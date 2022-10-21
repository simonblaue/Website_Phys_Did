
// const canvas = document.getElementById(`canvas`)
// canvas.width = canvas.clientWidth
// canvas.height = canvas.clientWidth
// const ctx = canvas.getContext("2d",  { alpha: false })

// ctx.translate(canvas.width/2, canvas.height/2)
// //ctx.fillStyle = `black`

// let n = 10 // number of windings

// var endpoint = {x:10 ,y:-40}
// var length = Math.sqrt(endpoint.x**2 + endpoint.y**2)

// var l = length/(2*n)
// var theta = Math.acos(endpoint.y/length)


// ctx.save()
// ctx.rotate(theta)

// ctx.beginPath()
// ctx.arc(0, 0, 2, 0, 2 * Math.PI)
// ctx.moveTo(0, 0)


// for (let i = 0; i <= n; i++) {
// 	ctx.lineTo(10,-l*(2*i))
// 	ctx.moveTo(10,-1*l*2*i)
	
// 	ctx.lineTo(-10,-l*(2*i+1))
// 	ctx.moveTo(-10,-l*(2*i+1))
// }

// ctx.stroke()
// ctx.closePath()
// ctx.restore()

// ctx.beginPath()
// ctx.lineTo(endpoint.x, -endpoint.y)
// ctx.arc(endpoint.x, -endpoint.y,2,0,2*Math.PI)
// ctx.stroke()
// ctx.closePath()

import { spring_physics2d } from "./spring_sim/physics.js"

const spring = new spring_physics2d({x:600, y:600}, {x0:-10,x1:10,y0:-10,y1:10})

var plotly_stuff = spring.plot_potential(600, 600)

const myDiv = document.getElementById("myDiv")

Plotly.newPlot('myDiv', plotly_stuff.data, plotly_stuff.layout);

// d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){

// function unpack(rows, key) {
//   return rows.map(function(row) { return row[key]; });
// }

// var z_data=[ ]
// for(i=0;i<24;i++)
// {
//   z_data.push(unpack(rows,i));
// }

// console.log(z_data)

// var data = [{
//            z: z_data,
//            type: 'surface'
//         }];

// var layout = {
//   title: 'Mt Bruno Elevation',
//   autosize: false,
//   width: 500,
//   height: 500,
//   margin: {
//     l: 65,
//     r: 50,
//     b: 65,
//     t: 90,
//   }
// };
// Plotly.newPlot('myDiv', data, layout);
// });
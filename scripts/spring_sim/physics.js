
export class spring_physics2d{
	tension // spring coeffiient
	mass // 
	friction //
	x_left // left x boundary
	x_right // right x boundary
	y_left // left y boundary
	y_right // right y boundary
	dr // gridsize
	base_l // spring defualt length
	n // number of windings
	endpoint
	potential_data = []
	field_data = [] // Vector field of strength of spring if pulled up to this point

	
	constructor(canvasSize,boundaries, k=0.2, m=5, friction=0.5, endpoint={x:6,y:6}, dr=0.1){
		// Init vatrs
		this.tension = k
		this.mass = m
		this.friction = friction
		this.n = 10
		this.base_l = Math.sqrt(endpoint.x**2+endpoint.y**2)
		this.endpoint = endpoint
		this.v = {x:0, y:0}
		this.a = {x:0,y:0}
		this.dr = dr
		this.x_left = boundaries.x0
		this.x_right = boundaries.x1
		this.y_left = boundaries.y0
		this.y_right = boundaries.y1
		this.scaleX = Math.abs(this.x_right-this.x_left)/canvasSize.x
		this.scaleY = Math.abs(this.y_right-this.y_left)/canvasSize.y
	
	}

	l(){ return Math.sqrt(this.endpoint.x**2+this.endpoint.y**2) } // actual length
	
	canvas_to_physics(x,y){
		return {x: x*this.scaleX, y: y*this.scaleY}
	}

	physics_to_canvas(x,y){
		return {x: x/this.scaleX, y: y/this.scaleY}
	}

	near_end(x,y){
		return Math.abs(this.endpoint.x - x) <= 0.5 &&  Math.abs(this.endpoint.y - y) <= 0.5
	}

	potential_at(x,y){
		var r = this.base_l - Math.sqrt(x**2+y**2) 
		return 1/2*this.tension*r**2
	}

	field_at(x,y){
		let v_norm = {x: x/this.l(), y: y/this.l()} // normalized spring vec
		let u = {x:this.base_l*v_norm.x, y: this.base_l*v_norm.y} // spring vector for base length in direction of its current orientation
		var Fx = -this.tension*(x-u.x)-this.friction*this.v.x
		var Fy = -this.tension*(y-u.y)-this.friction*this.v.y
		return {x: Fx, y:Fy}
	}



	create_field(){
		for (var x=this.x_left; x<=this.x_right; x+=this.dr){
			for (var y=this.y_left; y<=this.y_right; y+=this.dr){
				this.field_data.push(this.field_at(x,y))
			}
		}
	}

	plot_potential(width, height){
		this.potential_data = [ ]


		for (var x=this.x_left; x<=this.x_right; x+=this.dr){
			var row = []
			for (var y=this.y_left; y<=this.y_right; y+=this.dr){
				row.push(this.potential_at(x,y))
			}
			this.potential_data.push(row)
		}

		var data_z = {
			z: this.potential_data,
			type: 'surface',
			showscale: false,
			
		};

		var data_p = {
			x: [this.endpoint.x/this.scaleX],
			y: [this.endpoint.y/this.scaleY],
			z: [this.potential_at(this.endpoint.x, this.endpoint.y)],
			marker: {
				color: 'rgb(255, 0, 0)',
				size: 5,
				symbol: 'x-thin-open',
				line: {
				color: 'rgb(255, 0, 0)',
				width: 1},
				opacity: 0.8},
			type: 'scatter3d',
		};
	
		var layout = {
			scene: {camera: {eye: {x: 1.87, y: 0.88, z: 0.64}}},
			autosize: false,
			width: width,
			height: height,
			margin: {
			l: 65,
			r: 50,
			b: 65,
			t: 90,
			},
			xaxis: {range: [-10, 10]},
  			yaxis: {range: [-10, 10]}
		};

		let data = [data_p, data_z]
	
		return  {data:data, layout:layout}
	}

	update(){
		let F = this.field_at(this.endpoint.x, this.endpoint.y)
		this.a.x = F.x/this.mass
		this.a.y = F.y/this.mass
		this.v.x += this.a.x
		this.v.y += this.a.y 
		this.endpoint.x += this.v.x
		this.endpoint.y += this.v.y
	}



	draw(ctx){
	let canvas_endpoint = this.physics_to_canvas(this.endpoint.x, this.endpoint.y)
	let sl = Math.sqrt(canvas_endpoint.x**2+ canvas_endpoint.y**2)/(2*this.n)
	let theta = Math.acos(canvas_endpoint.y/Math.sqrt(canvas_endpoint.x**2+ canvas_endpoint.y**2))
	if (canvas_endpoint.x<0){ theta *= -1 }
	ctx.save()
	ctx.rotate(theta)

	ctx.beginPath()
	ctx.arc(0, 0, 2, 0, 2 * Math.PI)
	ctx.moveTo(0, 0)


	for (let i = 0; i <= this.n; i++) {
		ctx.lineTo(10,-sl*(2*i))
		ctx.moveTo(10,-1*sl*2*i)
		
		ctx.lineTo(-10,-sl*(2*i+1))
		ctx.moveTo(-10,-sl*(2*i+1))
	}

	ctx.stroke()
	ctx.closePath()
	ctx.restore()

	ctx.beginPath()
	ctx.lineTo(canvas_endpoint.x, -canvas_endpoint.y)
	ctx.arc(canvas_endpoint.x, -canvas_endpoint.y,2,0,2*Math.PI)
	ctx.stroke()
	ctx.closePath()
	}
};


 
 
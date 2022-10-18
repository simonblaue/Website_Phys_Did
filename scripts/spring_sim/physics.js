
export class spring_physics2d{
	tension // spring coeffiient
	mass // 
	friction //
	x_left // left x boundary
	x_right // right x boundary
	y_left // left y boundary
	y_right // right y boundary
	dr // gridsize
	l // spring defualt length
	end_position
	potential_data = []
	field_data = [] // Vector field of strength of spring if pulled up to this point

	
	constructor(boundaries, k=1, end_position={x:50,y:0}, dr=0.1){
		// Init vatrs
		this.tension = k
		this.mass = 50
		this.friction = 0
		this.l = Math.sqrt(end_position.x**2+end_position.y**2)
		this.end_position = end_position
		this.dr = dr
		this.x_left = boundaries.x0
		this.x_right = boundaries.x1
		this.y_left = boundaries.y0
		this.y_right = boundaries.y1
		
		console.log(this)
	}
	
	near_end(x,y){
		return Math.abs(this.end_position.x - x) <= 5 &&  Math.abs(this.end_position.y - y) <= 5
	}

	potential_at(x,y){
		var r = this.l - Math.sqrt(x**2+y**2)
		return 1/2*this.tension*r**2
	}

	field_at(x,y){
		var Fx = -this.tension*(x-this.l)
		var Fy = -this.tension*(y-this.l) 
		return {x: Fx, y:Fy}
	}



	create_field(){
		for (var x=this.x_left; x<=this.x_right; x+=this.dr){
			for (var y=this.y_left; y<=this.y_right; y+=this.dr){
				this.field_data.push(this.field_at(x,y))
			}
		}
	}

	plot_potential(width, height, dr){
		this.potential_data = [ ]

		for (var x=this.x_left; x<=this.x_right; x+=this.dr){
			for (var y=this.y_left; y<=this.y_right; y+=this.dr){
				this.potential_data.push(this.potential_at(x,y))
			}
		}

		var data = [{
			z: this.potential_data,
			type: 'surface',
			contours: {
			z: {
				show:true,
				usecolormap: true,
				highlightcolor:"#42f462",
				project:{z: true}
			}
			}
		}];
	
		var layout = {
			scene: {camera: {eye: {x: 1.87, y: 0.88, z: -0.64}}},
			autosize: false,
			width: width,
			height: height,
			margin: {
			l: 65,
			r: 50,
			b: 65,
			t: 90,
			}
		};
	
		return  {data:data, layout:layout}
	}

	update(c){
		var F = this.field_at(this.end_position.x, this.end_position.y)
		this.end_position.x += F.x/this.mass
		this.end_position.y += F.y/this.mass
		// console.log(F.x, F.y)
	}

	draw(c){
		c.beginPath()
		c.moveTo(0,0)
		c.lineTo(this.end_position.x,-this.end_position.y)
		c.stroke()
		c.closePath()
	}
};


 
 
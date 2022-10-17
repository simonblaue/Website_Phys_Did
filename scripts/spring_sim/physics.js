
export class spring_physics2d{
	k // spring coeffiient
	x_left // left x boundary
	x_right // right x boundary
	y_left // left y boundary
	y_right // right y boundary
	dr // gridsize
	l // spring defualt length
	potential_data = [ ] // Potential scalar field in a meshgrid datastruct
	field_data = [] // Vector field of strength of spring if pulled up to this point

	
	constructor(x_left, x_right, y_left, y_right,l, k, dr=0.01){
		// Init vatrs
		this.k = k
		this.l = l
		this.dr = dr
		this.x_left = x_left
		this.x_right = x_right
		this.y_left = y_left
		this.y_right = y_right
		
		
		for (x=this.x_left; x<=this.x_right; x++){
			for (y=this.y_left; y<=this.y_right; y++){
				z.push(spring_potential(x,y))
			}
		}
	}
	
	potential_at(x,y){
		var r = this.l - Math.sqrt(x**2+y**2)
		return 1/2*k*r**2
	}

	field_at(x,y){
		var Fx = -this.k*(x-this.l)
		var Fy = -this.k*(y-this.l) 
		return {x: Fx, y:Fy}
	}


	create_potential(){
		return -1
	}

	create_field(){
		return -1
	}

	plot_potential(){
		data = [{
			z: z_data,
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
	
		layout = {
			title: 'Mt Bruno Elevation With Projected Contours',
			scene: {camera: {eye: {x: 1.87, y: 0.88, z: -0.64}}},
			autosize: false,
			width: 500,
			height: 500,
			margin: {
			l: 65,
			r: 50,
			b: 65,
			t: 90,
			}
		};
	
		return  {data:data, layout:layout}
	}
};


 
 
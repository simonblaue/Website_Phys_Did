
export class drawablevVector{
	pos
	s
	color

	constructor(position, strength, c="black"){
		this.pos = position
		this.pos.y *= -1
		this.s = strength
		this.s.y *= -1
		this.c = c
	}

	len(){
		return Math.abs(this.s.x**2+this.s.y**2)
	}

	draw(ctx){

		var headlen = 8; // length of head in pixels
      var dx = this.s.x - this.pos.x;
      var dy = this.s.y - this.pos.y;
      var angle = Math.atan2(dy, dx);

		ctx.beginPath()
		ctx.moveTo(this.pos.x, this.pos.y)
		ctx.lineTo(this.s.x, this.s.y)
		ctx.moveTo(this.s.x, this.s.y)
		ctx.lineTo(this.s.x - headlen * Math.cos(angle - Math.PI / 6), this.s.y - headlen * Math.sin(angle - Math.PI / 6));
		ctx.moveTo(this.s.x, this.s.y);
		ctx.lineTo(this.s.x - headlen * Math.cos(angle + Math.PI / 6), this.s.y - headlen * Math.sin(angle + Math.PI / 6));
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}
}
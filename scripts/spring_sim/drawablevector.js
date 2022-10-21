
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

		var fromx = this.pos.x;
   	var fromy = this.pos.y;
   	var tox = (fromx + this.s.x);
   	var toy = (fromy +this.s.y);
   	var headlen = 8; // length of head in pixels
   	var dx = tox - fromx;
   	var dy = toy - fromy;

   	var angle = Math.atan2(dy, dx);
   	ctx.save()
   	ctx.beginPath();
   	ctx.moveTo(fromx, fromy);
   	ctx.lineTo(tox, toy);
   	ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
   	ctx.moveTo(tox, toy);
   	ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
   	ctx.strokeStyle = this.color;
   	ctx.stroke();
   	ctx.closePath()
   	ctx.restore();
	}
}
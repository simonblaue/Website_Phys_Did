export class Paddlewheel {

   visible;
   position;

   constructor(field){
      this.visible = true
      this.field = field
      this.position = {x:0, y:0} // In field coordinates centered at the middle (0,0)
      this.angle = 0
      this.speed = this.field.curl_at(this.position)
   }

   draw(c){
      c.save()
      c.translate(canvas.width/2,canvas.height/2);
      c.rotate(this.angle*Math.PI/180);

      c.beginPath()
      c.arc(this.position.x, this.position.y, 3.5, 0, 2*Math.PI)
      c.fillStyle = 'white'
      c.fill()
      c.moveTo(this.position.x, this.position.y+15)
      c.lineTo(this.position.x, this.position.y-15)

      c.moveTo(this.position.x-15, this.position.y)
      c.lineTo(this.position.x+15, this.position.y)
      
      c.moveTo(this.position.x-10, this.position.y-10)
      c.lineTo(this.position.x+10, this.position.y+10)

      c.moveTo(this.position.x-10, this.position.y+10)
      c.lineTo(this.position.x+10, this.position.y-10)
      c.strokeStyle = 'white'
      c.lineWidth = 1
      c.stroke() 
      c.restore();
   }

   update(c){
      console.log(this.speed)
      if (this.visible){
         this.angle -= 2 //this.speed
      }
   }

   move(event){
      // Change position based on event
      this.speed = this.field.curl_at(this.position)
   }
}





export class Paddlewheel {

   visible;
   position;

   constructor(){
      this.visible = true
      this.position = {x:100, y:100}
      this.angle = 0
      this.speed = 0
   }

   draw(c){
      c.save()
      c.translate(this.position.x, this.position.y);
      c.rotate(this.angle*Math.PI/180);

      c.beginPath()
      c.arc(0,0, 3.5, 0, 2*Math.PI)
      c.fillStyle = 'white'
      c.fill()
      c.moveTo(0,15)
      c.lineTo(0,-15)

      c.moveTo(-15, 0)
      c.lineTo(15, 0)
      
      c.moveTo(-10, -10)
      c.lineTo(10, 10)

      c.moveTo(-10, 10)
      c.lineTo(10, -10)
      c.strokeStyle = 'white'
      c.lineWidth = 1
      c.stroke() 
      c.restore();
   }

   update(c){
      if (this.visible){
         this.angle -= this.speed
      }
   }

   move_to(p,field){
      // Change position based on event
      this.position = p
      this.speed = field.curl_at(this.position)
   }
}





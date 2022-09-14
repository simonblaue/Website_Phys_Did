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
      // Save for rotateing
      c.save()
      c.translate(this.position.x, this.position.y);
      c.rotate(this.angle*Math.PI/180);
      // Acctual Path of Paddlewhee, one circle and four lines
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
      // White coloring
      c.strokeStyle = 'white'
      c.lineWidth = 1
      c.stroke() 
      
      c.restore();
   }

   near(p){
      return (this.visible && Math.abs(this.position.x-p.x) < 10 && Math.abs(this.position.y-p.y)<10)
      if (this.visible){
         if (Math.abs(this.position.x-p.x) < 10 && Math.abs(this.position.y-p.y)<10){
            return true
         }
      }
      return false
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





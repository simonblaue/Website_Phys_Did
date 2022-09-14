export class Paddlewheel {

   visible;
   position;
   img;
   animationID

   constructor(field){
      this.visible = false
      this.field = field
      this.position = this.field.canvas_middle
      this.angle = 0
   }

   draw(context,rect,F1,coordinates){
      
      var img = new Image();
      img.onload = () => {
         // save the unrotated context of the canvas so we can restore it later
         // the alternative is to untranslate & unrotate after drawing
         c.save();
         // move to the center of the canvas
         c.translate(canvas.width/2,canvas.height/2);
         // rotate the canvas to the specified degrees
         c.rotate(this.angle*Math.PI/180);
         c.drawImage(img,-img.width/2,-img.height/2);
         c.restore();
      }
      img.src = '/res/paddlewheel.svg';
   }

   update(){
      if (this.visible){
         this.draw()
         this.angle += this.field.curl_at(this.position)
      }
      }
   }





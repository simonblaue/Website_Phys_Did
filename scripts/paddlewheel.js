export class Paddlewheel {

   visible;
   position;
   img;

   constructor(field){
      this.visible = false
      this.field = field
      this.position = this.field.canvas_middle
      this.img = document.getElementById("paddlewheel_img")
   }

   draw(canvas_context){
      canvas_context.drawImage(this.img, this.position.x, this.position.y);
   }

   animate(){
      if (this.visible){
         // do some animation stuff
      }
   }

} 


// function loadImage(url) {
//    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
// }
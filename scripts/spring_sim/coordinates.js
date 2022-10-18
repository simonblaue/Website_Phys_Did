// This is an euklidian coordinate system 2d
export class Coordinateline_Euklidian2d {
   active;
   constructor(boundaries) {
       this.active = true;
       this.x_left = boundaries.x0
       this.x_right = boundaries.x1
       this.y_left = boundaries.y0
       this.y_right = boundaries.y1
       this.color = 'black'
   }

   set_scale(canvas){
    var sx, sy
    sx = (this.x_right-this.x_left)/canvas.width
    sy = (this.y_right-this.y_left)/canvas.height
    return {x:sx, y:sy}
   }

   draw(canvas, canvas_context) {
       if (this.active) {
           var scale = this.set_scale(canvas)
           const canvas_middle = {x:canvas.width/2, y:canvas.height/2}
           const transform = canvas_context.getTransform()
           const tx = transform.e
           const ty = transform.f
           canvas_context.save()
           canvas_context.resetTransform()

           // X-Axis:
           // Make ten marks over the total width
           for (let i = 0; i < canvas.width; i += canvas.width / 10) {
               var x = (i-tx) * scale.x
               canvas_context.fillStyle = this.color;
               canvas_context.textAlign = 'center';
               canvas_context.fillText((x).toFixed(1), i, canvas_middle.y + 10);
           }
           canvas_context.beginPath();
           canvas_context.moveTo(0, canvas_middle.y);
           canvas_context.lineTo(canvas.width, canvas_middle.y);
           canvas_context.strokeStyle = this.color;
           canvas_context.stroke();

           // Y-Axis
           for (let i = 0; i < canvas.height; i += canvas.height / 10) {
               if (i != canvas_middle.y) {
                   var y = -scale.y * (i-ty)
                   canvas_context.fillStyle = this.color;
                   canvas_context.textAlign = 'center';
                   canvas_context.fillText((y).toFixed(1), canvas_middle.x + 10, i);
               }
           }
           canvas_context.beginPath();
           canvas_context.moveTo(canvas_middle.x, 0);
           canvas_context.lineTo(canvas_middle.x, canvas.height);
           canvas_context.strokeStyle = this.color;
           canvas_context.stroke();
           canvas_context.closePath()
           canvas_context.restore();

           // Restore
           canvas_context.restore()
       }
   }
}
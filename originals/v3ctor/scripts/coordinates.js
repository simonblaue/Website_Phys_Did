// This is an euklidian coordinate system
export class Coordinateline_Euklidian {
   active;
   constructor(canvas,field) {
       this.active = false;
       this.field = field;
       this.canvas = canvas
       this.canvas_middle = { x: canvas.width / 2, y: canvas.height / 2 }
   }
   draw(canvas_context) {
       if (this.active) {
           // X-Axis:
           for (let i = 0; i < canvas.width; i += canvas.width / 10) {
               let p = this.field.transform({ x: i, y: i });
               canvas_context.fillStyle = 'black';
               canvas_context.textAlign = 'center';
               canvas_context.fillText((p.x).toFixed(1), i, this.canvas_middle.y + 10);
           }
           canvas_context.beginPath();
           canvas_context.moveTo(0, this.canvas_middle.y);
           canvas_context.lineTo(canvas.width, this.canvas_middle.y);
           canvas_context.strokeStyle = 'black';
           canvas_context.stroke();
           canvas_context.restore();
           // Y-Axis
           for (let i = 0; i < canvas.height; i += canvas.height / 10) {
               if (i != this.canvas_middle.y) {
                   let p = this.field.transform({ x: i, y: i });
                   canvas_context.fillStyle = 'black';
                   canvas_context.textAlign = 'center';
                   canvas_context.fillText((p.y).toFixed(1), this.canvas_middle.x + 10, i);
               }
           }
           canvas_context.beginPath();
           canvas_context.moveTo(this.canvas_middle.x, 0);
           canvas_context.lineTo(this.canvas_middle.x, canvas.height);
           canvas_context.strokeStyle = 'black';
           canvas_context.stroke();
           canvas_context.closePath()
           canvas_context.restore();
       }
   }
}
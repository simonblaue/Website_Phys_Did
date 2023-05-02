// This is a drawable Vectorfield in 2d
// Convention: i,j -> Canvas Coordinates, x,y -> Coordinates with origing in middle
// This could easly be dealt with if I translate the canvas ... work for later
import { Vector2d } from './vector_class.js'
export class Field {
   x;
   y;
   canvas;
   canvas_middle;
   norm_factor;
   max_possible_len;
   vectors = [];
   fieldscanner_vectors = [];
   rec_vectors = [];
   partial_x_vecs = [];
   partial_y_vecs = [];
   p_wheel_partial_x = [];
   p_wheel_partial_y = [];


   constructor(x, y,canvas, amount_of_vectors, coordinate_system) {
    this.x = x;
    this.y = y;
    this.canvas = canvas
    this.max_possible_len = canvas.width / amount_of_vectors;
    this.coordinate_system = coordinate_system;
    if (canvas.height/ amount_of_vectors < this.max_possible_len) {
        this.max_possible_len = canvas.height/ amount_of_vectors
    }
    this.canvas_middle = { x: canvas.width / 2, y: canvas.height / 2 }
    this.create_vectors();
    this.normalize_to(this.max_possible_len)
   }

   /// Math operations //
   value_at(x, y) {
    let Fx = 0
    let Fy = 0
    if (this.coordinate_system == "cartesian") {
        Fx = math.evaluate(this.x, { 'x': x, 'y': y, "xy": x*y, "yx":x*y });
        Fy = math.evaluate(this.y, { 'x': x, 'y': y, "xy": x*y, "yx":x*y  });
    } else if (this.coordinate_system == "polar") {
        let Fr = math.evaluate(this.x, { 'r': Math.hypot(x,y), 'a': Math.atan2(y,x) });
        let Fphi = math.evaluate(this.y, { 'r': Math.hypot(x,y), 'a': Math.atan2(y,x) });
        Fx = Fr*Math.cos(Fphi)
        Fy = Fr*Math.sin(Fphi)
    }
    
    return new Vector2d(Fx, Fy);

   }
   divergence_at(p) {
       var expr_x = math.parse(this.x);
       var expr_y = math.parse(this.y);
       if (this.coordinate_system == "cartesian") {
        var diff_Fx_x = math.derivative(expr_x, "x");
        var diff_Fy_y = math.derivative(expr_y, "y");
        var divergence = diff_Fx_x.evaluate({ 'x': p.x, 'y': p.y }) + diff_Fy_y.evaluate({ 'x': p.x, 'y': p.y });
       }else if (this.coordinate_system == "polar"){
        var diff_Fx_x = math.derivative(expr_x, "r");
        var diff_Fy_y = math.derivative(expr_y, "a");
        var divergence = diff_Fx_x.evaluate({ 'r': Math.hypot(p.x,p.y), 'a': Math.atan2(p.y, p.x) }) + diff_Fy_y.evaluate({'r': Math.hypot(p.x,p.y), 'a': Math.atan2(p.y, p.x)});
       }
       return divergence;
   }
   curl_at(p) {
       var expr_x = math.parse(this.x);
       var expr_y = math.parse(this.y);
       if (this.coordinate_system == "cartesian") {
        var diff_Fx_y = math.derivative(expr_x, "y");
        var diff_Fy_x = math.derivative(expr_y, "x");
        var curl = diff_Fy_x.evaluate({ 'x': p.x, 'y': p.y }) - diff_Fx_y.evaluate({ 'x': p.x, 'y': p.y });
       }else if (this.coordinate_system == "polar") {
        var diff_Fx_y = math.derivative(expr_x, "r");
        var diff_Fy_x = math.derivative(expr_y, "a");
        var curl = diff_Fy_x.evaluate({ 'r': Math.hypot(p.x,p.y), 'a': Math.atan2(p.y, p.x) }) - diff_Fx_y.evaluate({ 'r': Math.hypot(p.x,p.y), 'a': Math.atan2(p.y, p.x) });
       }
       return curl;
   }
   
   // Creating it beautiful //
   create_vectors() {
       for (let i = 0; i < canvas.width; i += this.max_possible_len) {
           for (let j = 0; j < canvas.height; j += this.max_possible_len) {
            var z = this.transform({ x: i, y: j });
            var v = this.value_at(z.x, z.y);
            // v.x *= this.norm_factor;
            // v.y *= this.norm_factor;
            this.vectors.push({ p: { x: i, y: j }, v: v });
        }
    }
   }
   
   normalize_to(possible_size){
    var longest = 0
    this.vectors.forEach((p_and_v)=>{
        var v = p_and_v.v
        if (v.len > longest){ longest = v.len }
    })
    this.norm_factor = possible_size/(longest+1)
    this.vectors.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.fieldscanner_vectors.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.rec_vectors.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.partial_x_vecs.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.partial_y_vecs.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.p_wheel_partial_x.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
    this.p_wheel_partial_y.forEach((p_and_v)=>{
        var v = p_and_v.v
        v.x *= this.norm_factor
        v.y *= this.norm_factor
        v.recalc_len()
    })
   }

   draw(canvas_context) {
       this.vectors.forEach((p_and_v) => {
           var p = p_and_v.p;
           var v = p_and_v.v;
           v.draw_at(p,canvas_context);
       })
       if (this.rec_vectors.length != 0) {
           this.rec_vectors.forEach((p_and_v) => {
               var p = p_and_v.p;
               var v = p_and_v.v;
               v.draw_at(p,canvas_context);
           });
       }
       if (this.partial_x_vecs.length != 0) {
           this.partial_x_vecs.forEach((p_and_v) => {
               var p = p_and_v.p;
               var v = p_and_v.v;
               v.draw_at(p,canvas_context);
           });
       } 
       if (this.partial_y_vecs.length != 0) {
           this.partial_y_vecs.forEach((p_and_v) => {
               var p = p_and_v.p;
               var v = p_and_v.v;
               v.draw_at(p,canvas_context);
           });
       }
       if (this.fieldscanner_vectors.length != 0) {
           this.fieldscanner_vectors.forEach((p_and_v) => {
               var p = p_and_v.p;
               var v = p_and_v.v;
               v.draw_at(p,canvas_context);
           });
       }
       if (this.p_wheel_partial_x.length != 0){
            this.p_wheel_partial_x.forEach((p_and_v)=>{
                var p = p_and_v.p;
                var v = p_and_v.v;
                v.draw_at(p,canvas_context);
            })
       }
       if (this.p_wheel_partial_y.length != 0){
        this.p_wheel_partial_y.forEach((p_and_v)=>{
            var p = p_and_v.p;
            var v = p_and_v.v;
            v.draw_at(p,canvas_context);
        })
   }
   }

    add_partial_x_vectors(list){
         this.partial_x_vecs.splice(0, this.partial_x_vecs.length);
         list.forEach((p_and_v)=>{
             var v  = new Vector2d(p_and_v.v.x,0,'blue') 
             this.partial_x_vecs.push({p:p_and_v.p, v:v})
         })
         if (this.partial_x_vecs.length == 0){
             this.partial_x_vecs = []
         }
    }

    add_partial_y_vectors(list){
        this.partial_y_vecs.splice(0, this.partial_y_vecs.length);
        list.forEach((p_and_v)=>{
            var v  = new Vector2d(0, p_and_v.v.y, 'orange')
            this.partial_y_vecs.push({p:p_and_v.p, v:v})
        })
        if (this.partial_y_vecs.length == 0){
            this.partial_y_vecs = []
        }
}  


    transform(point) {
        let x = (point.x - this.canvas_middle.x) / (this.canvas.width/2) * 10 /// this.canvas_middle.x;
        let y = (this.canvas_middle.y - point.y)/ (this.canvas.height/2) * 10 /// this.canvas_middle.y;

        return {x: x, y: y};
    }
}
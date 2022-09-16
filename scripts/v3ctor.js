import {Field} from './field_class.js'
import { Rectangle } from './rect_class.js';
import { Coordinateline_Euklidian } from './coordinates.js';
import { Paddlewheel } from './paddlewheel.js';

// Variable to chek if mouse button is pressed
var mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};



// HTML OBJECTS //

// Canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

//Field defeinition
const x_component_entry = document.querySelector('#x-component');
const y_component_entry = document.querySelector('#y-component');

//Vectoramount
const vector_amount_entry = document.querySelector('#vector-amount');
// Coordinate System
const coordinate_checkbox = document.querySelector('#coordinatesystem');
const btn_gauss = document.querySelector('#Btn-Gauss');
const btn_stokes = document.querySelector('#Btn-Stokes');
//Fieldscanner
const fieldscanner_checkbox = document.querySelector('#fieldscanner');
//Partial x and y
const partial_x_checkbox = document.querySelector('#xcomponentview');
const partial_y_checkbox = document.querySelector('#ycomponentview');
//Projections
const projections_checkbox = document.querySelector('#projection');
// Output Labels
const div_rot_label = document.querySelector('#div-rot-value');
const integral_label = document.querySelector('#integral-value');
//Changing between Gauss and Stokes
const div_rot_header = document.querySelector('#div_rot_header');
const flux_header = document.querySelector('#flux_header');
const projection_label = document.querySelector('#projection_label');
const latex_image = document.querySelector('#latex_img')
const paddlewheel_div = document.querySelector('#paddlewheel_div')
paddlewheel_div.style.visibility='hidden' 
const paddlewheel_checkbox = document.querySelector('#paddlewheel')


// Simulation defining vars // 
var amount_of_vectors = vector_amount_entry.value;
let move = 0; // For mouse movement over canvas
let first_clicked_p = {x:0,y:0}
let theorem = 'gauss';
var res 


// Init of rectangle and coordinate lines
let F1 = new Field(x_component_entry.value, y_component_entry.value, canvas, amount_of_vectors);
F1.draw(c);
let coordinates = new Coordinateline_Euklidian(canvas, F1);
let rect = new Rectangle(F1);
rect.draw(c)
let p_wheel = new Paddlewheel(F1)

///////////////////////////////////// INIT ENDs HERE /////////////////////////////////////


// Event Handeling  for Buttons//
export function clickedGauss(event) {
    btn_gauss.setAttribute('class', 'dropdown-item active');
    btn_stokes.setAttribute('class', 'dropdown-item');
    div_rot_header.innerHTML = 'Divergenz';
    flux_header.innerHTML = 'Fluss durch Fläche';
    projection_label.innerHTML = 'Projektion auf die Kurvennormale der Fläche einblenden';
    latex_image.src = '/res/Latex_Gauss.png'
    paddlewheel_div.style.visibility='hidden' 
    theorem = 'gauss';
    set_integral_label()
    c.clearRect(0, 0, canvas.width, canvas.height);
    F1.rec_vectors = []
    if (projections_checkbox.checked){
        rect.draw_surface_vektores()
    }    
    F1.draw(c)
    rect.draw(c)
    coordinates.draw(c)
    p_wheel.draw(c)
}

export function clickedStokes(event) {
    btn_gauss.setAttribute('class', 'dropdown-item');
    btn_stokes.setAttribute('class', 'dropdown-item active');
    div_rot_header.innerHTML = 'Rotation';
    flux_header.innerHTML = 'Zirkulation entlang einer Kurve';
    projection_label.innerHTML = 'Projektion auf das vektorielle Wegelement einblenden';
    latex_image.src = '/res/Latex_Stokes.png'
    paddlewheel_div.style.visibility='visible' 
    theorem = 'stokes';
    set_integral_label()
    c.clearRect(0, 0, canvas.width, canvas.height);
    F1.rec_vectors = []
    if (projections_checkbox.checked){
        rect.draw_line_vectores()
    }    
    F1.draw(c)
    rect.draw(c)
    coordinates.draw(c)
    p_wheel.draw(c)
}

// Pressing enter on field entries
export function clickPressField(event) {
    if (event.keyCode == 13 || event.type == 'click') {
        event.preventDefault();
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        amount_of_vectors = vector_amount_entry.value;
        F1 = new Field(x_component_entry.value, y_component_entry.value, canvas, amount_of_vectors);
        rect = new Rectangle(F1);
        div_rot_label.innerHTML = "NaN";
        integral_label.innerHTML = "NaN"
        F1.draw(c);
        coordinates.draw(c);
        p_wheel.move_to(p_wheel.position, F1)
    }
}

// Event Handeling for checkboxes

paddlewheel_checkbox.addEventListener('change', (event) => {
    if (paddlewheel_checkbox.checked){
        p_wheel.visible = true
        p_wheel.move_to({x:100,y:100}, F1)
        p_wheel.draw(c)
        animate()
    }
    else {
        p_wheel.visible = false
        c.clearRect(0,0,canvas.width, canvas.height)
        rect.draw(c)
        F1.draw(c);
        coordinates.draw(c);
    }
})

// Coordinate checkbox 
coordinate_checkbox.addEventListener('change', (event) => {
    if (coordinate_checkbox.checked) {
        coordinates.active = true;
        coordinates.draw(c);
    }
    else {
        coordinates.active = false;
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);
        F1.draw(c);
        rect.draw(c)
    }
});

// Fieldscanenr checkbox
fieldscanner_checkbox.addEventListener('change', (event)=>{
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (fieldscanner_checkbox.checked){
        F1.rec_vectors = []
        rect.startpoint = {x:0, y:0}
        rect.set_endpoint({x:0, y:0})
    }
    else {
        F1.fieldscanner_vectors = []
    }
    rect.draw(c);
    F1.draw(c);
    coordinates.draw(c);
})

// Projections chheckbox
projections_checkbox.addEventListener('change', (event) => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (projections_checkbox.checked){
        if (theorem == 'gauss') {
            rect.draw_surface_vektores();
        }
        if (theorem == 'stokes'){
            rect.draw_line_vectores()
        }
    }
    else{
        F1.rec_vectors = []
    }
    rect.draw(c);
    F1.draw(c);
    coordinates.draw(c);
})


// Patial checkboxes
partial_x_checkbox.addEventListener('change', (event) =>{
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (partial_x_checkbox.checked){
        if (fieldscanner_checkbox.checked == false){
            F1.add_partial_x_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel))
        }
    }
    else{
        F1.partial_x_vecs = [];
        F1.add_partial_x_vectors([])
    }
    rect.draw(c);
    F1.draw(c);
    coordinates.draw(c);
} )

partial_y_checkbox.addEventListener('change', (event) =>{
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    if (partial_y_checkbox.checked){
        if (fieldscanner_checkbox.checked == false){
            F1.add_partial_y_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel))
        }
    }
    else{
        F1.partial_y_vecs = [];
        F1.add_partial_y_vectors([])
    }
    rect.draw(c);
    F1.draw(c);
    coordinates.draw(c);
} )



//// Interactivity Handling on Canvas ////

// When mousebutton is released:
canvas.addEventListener('click', (event) => {
    move = 0;
    c.clearRect(0, 0, canvas.width, canvas.height);
    rect.draw(c);

    const p_canvas = { x: event.layerX, y: event.layerY };
    const p_coord = F1.transform(p_canvas);


    if (fieldscanner_checkbox.checked) {
        var v = F1.value_at(p_coord.x, p_coord.y);
        v.x *= F1.norm_factor;
        v.y *= F1.norm_factor;
        v.recalc_len()
        F1.fieldscanner_vectors.push({ p: p_canvas, v: v });
        set_div_rot_label(p_coord)
    }
    if (partial_x_checkbox.checked) {
        if (fieldscanner_checkbox.checked) {
            var v = F1.value_at(p_coord.x, p_coord.y);
            v.x *= F1.norm_factor;
            v.y = 0;
            v.recalc_len()
            v.color = 'blue';
            F1.fieldscanner_vectors.push({ p: p_canvas, v: v });
        }
    }
    if (partial_y_checkbox.checked) {
        if (fieldscanner_checkbox.checked) {
            var v = F1.value_at(p_coord.x, p_coord.y);
            v.x *= 0;
            v.y *= F1.norm_factor;
            v.recalc_len()
            v.color = 'orange';
            F1.fieldscanner_vectors.push({ p: p_canvas, v: v });
        }

    }
    if (projections_checkbox.checked) {
        if (theorem == 'gauss') {
            rect.draw_surface_vektores();
        } else {
            rect.draw_line_vectores()
        }
    }
    F1.draw(c);
    coordinates.draw(c);
    // rect.startpoint = 0;
})


// When mouse moves over canvas:
var state = "outside"
var old_startpoint = {x:0,y:0}
var old_width = 0
var old_height = 0

canvas.addEventListener('mousemove', (event) => {
    const p = { x: event.layerX, y: event.layerY }
    if (fieldscanner_checkbox.checked == false) {
        if (mouseDown) {
            if (move == 0){
                first_clicked_p = { x: event.layerX, y: event.layerY };
                Object.assign(old_startpoint, rect.startpoint)
                Object.assign(old_width, rect.width)
                Object.assign(old_height, rect.height)
            }
            move += 1;
            // do something with the rect
                switch (state) {
                    case 'inside': 
                        rect.startpoint.x = old_startpoint.x-(first_clicked_p.x-p.x)
                        rect.startpoint.y = old_startpoint.y-(first_clicked_p.y-p.y)
                    break

                    case 'left':
                        if (rect.width < 0){
                            rect.width = (p.x-first_clicked_p.x)+(first_clicked_p.x-old_startpoint.x) // This works:)
                        }else {
                            rect.width = old_width//+(old_startpoint.x+p.x) // This does not wotk it somehow forgets the old width...   :(
                        rect.startpoint.x = p.x
                        }
                    break

                    case 'bottom':
                    break
                    
                    case 'right':
                    break
                    
                    case 'top':
                    break

                    case 'on_p_wheel':
                        p_wheel.move_to(p,F1)
                    break
                    
                    default :
                    if (move == 1) {
                            rect.startpoint = p
                        }
                        rect.set_endpoint(p)     
                }
                rect.vecs_in_rect = rect.get_vectors_in_rect(F1)
                if (projections_checkbox.checked) {
                if (theorem == 'gauss') {
                        rect.draw_surface_vektores();
                    }
                    if (theorem == 'stokes') {
                        rect.draw_line_vectores()
                    }
                }
                if (partial_x_checkbox.checked) {
                    F1.add_partial_x_vecotrs(rect.vecs_in_rect)
                }
                if (partial_y_checkbox.checked){
                F1.add_partial_y_vectors(rect.vecs_in_rect)
                    }
            set_integral_label()
            redraw_canvas()
            }
        else {
            state = rect.on_outline(p)
            if (state != false){
                document.body.style.cursor = "pointer"

            }
            else if (rect.in_rect(p)){
                state = "inside"
                document.body.style.cursor = "move"
            }
            else if(p_wheel.near(p)){
                state = "on_p_wheel"
                document.body.style.cursor = "move"
                }
            else {
                state = "outside"
                document.body.style.cursor = "default"
            }
        }
    }
})


// Rectangle:
// Output Functions
function set_div_rot_label(point) {
    var value = 0
    if (theorem == 'gauss') {
        value = F1.divergence_at(point);
    } else {
        value = F1.curl_at(point);
    }
    div_rot_label.innerHTML = value.toFixed(2)
}

function set_integral_label(){
    var value = NaN
    var error = NaN
    if (theorem == 'gauss') {
        res = rect.flux()
        value = res.value
        error = res.error
    } else {
        res = rect.circulation()
        value = res.value
        error = res.error
    }
    integral_label.innerHTML = value.toFixed(2) //+ '±' + error.toFixed(2)
}


// Animation

let animationID

function animate(){
    if (paddlewheel_checkbox.checked == false) {return}
    animationID = requestAnimationFrame(animate)
    p_wheel.update(c)
    redraw_canvas()
}

// Updater
function redraw_canvas(){
    c.clearRect(0,0,canvas.width, canvas.height)
    F1.draw(c)
    rect.draw(c)
    coordinates.draw(c)
    p_wheel.draw(c)
}

////////////////////////////////////////////////////////////7


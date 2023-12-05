import {Field} from './field_class.js'
import { Rectangle } from './rect_class.js';
import { Coordinateline_Euklidian } from './coordinates.js';
import { Paddlewheel } from './paddlewheel.js';
import { switch_tooltips, switch_language } from './docs.js'

import { Vector2d } from './vector_class.js';

window.addEventListener('resize', resize);

// Variable to chek if mouse button is pressed
var mouseDown = 0;
document.body.onmousedown = function () {
    ++mouseDown;
};
document.body.onmouseup = function () {
    --mouseDown;
};

switch_tooltips('stokes')

// Popover init from bootstrap for infobox
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map( function(popoverTriggerEl) {
  return  new bootstrap.Popover(popoverTriggerEl, {
  trigger : 'hover'
  });
});

// Tooltips init
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map( function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger : 'hover'
    })
})

var lang = "de"

// HTML OBJECTS //

//Debugging
var debug = false
const debug_btn = document.getElementById("debugger")
debug_btn.setAttribute("style","display:none;")

// Canvas
const canvas_background = 'white'
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d",  { alpha: true });
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
canvas.style.backgroundColor = canvas_background



//Language Button
const btn_lang = document.querySelector('#lang-btn');
// Labels
const btn_reset = document.querySelector('#btn-reset')
const btn_calc = document.querySelector('#btn-recalc')
const subheader = document.querySelector('#subheader')



//Field defeinition
const field_define_label = document.querySelector('#vectorfield_define_label')
const x_component_entry = document.querySelector('#x-component');
const y_component_entry = document.querySelector('#y-component');
const x_component_entry_label = document.querySelector('#x_comp_label')
const y_component_entry_label = document.querySelector('#y_comp_label')

//Vectoramount
const vector_amount_entry = document.querySelector('#vector-amount');
const vector_amount_entry_label = document.querySelector('#vector-amount-label');
// Coordinate System
const coordinate_checkbox = document.querySelector('#coordinatesystem');
const coordinate_checkbox_label = document.querySelector('#coordinatesystem-label');
const btn_gauss = document.querySelector('#Btn-Gauss');
const btn_stokes = document.querySelector('#Btn-Stokes');
const btn_cartesian = document.querySelector('#Btn-Cartesian')
const btn_polar = document.querySelector('#Btn-Polar')
//Fieldscanner
const fieldscanner_checkbox = document.querySelector('#fieldscanner');
const fieldscanner_checkbox_label = document.querySelector('#fieldscanner-label');
//Partial x and y
const partial_x_checkbox = document.querySelector('#xcomponentview');
const partial_x_checkbox_label = document.querySelector('#xcomponentview-label');
const partial_y_checkbox = document.querySelector('#ycomponentview');
const partial_y_checkbox_label = document.querySelector('#ycomponentview-label');
//Projections
const projections_checkbox = document.querySelector('#projection');
// Output Labels
const div_rot_label = document.querySelector('#div-rot-value');
const integral_label = document.querySelector('#integral-value');
const div_rot_label_header = document.querySelector('#div-rot-value-header');
const integral_label_header = document.querySelector('#integral-value-header');

//Changing between Gauss and Stokes
const drop_down_menu = document.querySelector('#dropdown-menu')
const drop_down_menu_label = document.querySelector('#dropdownmenubutton1-label')
const div_rot_header = document.querySelector('#div_rot_header');
const flux_header = document.querySelector('#flux_header');
const projection_label = document.querySelector('#projection_label');
const latex_image = document.querySelector('#latex_img')
const paddlewheel_div = document.querySelector('#paddlewheel_div')
paddlewheel_div.style.visibility='hidden' 
const paddlewheel_checkbox = document.querySelector('#paddlewheel')
const paddlewheel_checkbox_label = document.querySelector('#paddlewheel-label')



// Simulation defining vars // 
var amount_of_vectors = vector_amount_entry.value;
let move = 0; // For mouse movement over canvas
let first_clicked_p = {x:0,y:0}
let theorem = 'gauss';
let coordinate_system = "cartesian"
var res // Result varibale for flux


// Init of rectangle and coordinate lines
let F1 = new Field(x_component_entry.value, y_component_entry.value, canvas, amount_of_vectors, coordinate_system);
F1.draw(c);
let coordinates = new Coordinateline_Euklidian(canvas, F1);
let rect = new Rectangle(F1);
if (debug){
    rect.width = 200
    rect.height = 200
}
rect.draw(c)
let p_wheel = new Paddlewheel(F1)


///////////////////////////////////// INIT ENDs HERE /////////////////////////////////////

// Event Handeling  for Buttons//

export function clickedCartesian(event) {
    coordinate_system = "cartesian"
    x_component_entry_label.innerHTML = "x-Komponente"
    y_component_entry_label.innerHTML = "y-Komponente"
    x_component_entry.value = "x"
    y_component_entry.value = "y"
    btn_cartesian.setAttribute('class', 'dropdown-item active')
    btn_polar.setAttribute('class', 'dropdown-item')
    F1.coordinate_system = coordinate_system
    clickPressField(event)
}

export function clickedPolar(event) {
    coordinate_system = "polar"
    x_component_entry_label.innerHTML = "r-Komponente"
    y_component_entry_label.innerHTML = "Winkel-Komponente-a"
    x_component_entry.value = "r"
    y_component_entry.value = "a"
    btn_cartesian.setAttribute('class', 'dropdown-item')
    btn_polar.setAttribute('class', 'dropdown-item active')
    F1.coordinate_system = coordinate_system
    clickPressField(event)
}

export function clickedLanguage(event) {

    if (lang == "de"){ 
        lang = "en" 
        btn_lang.innerHTML  = 'Zur Deutschen Version'

        field_define_label.innerHTML = "Define the field: "
        x_component_entry_label.innerHTML = "x component"
        y_component_entry_label.innerHTML = "y component"
        vector_amount_entry_label.innerHTML = "Number of vectors"
        coordinate_checkbox_label.innerHTML = "Show coordinate axes"
        fieldscanner_checkbox_label.innerHTML = "Scan field"
        partial_x_checkbox_label.innerHTML  = "Show x component"
        partial_y_checkbox_label.innerHTML = "Show y component"
        div_rot_header.innerHTML = "Divergence"
        flux_header.innerHTML = "Flux through area"
        projection_label.innerHTML = "Show projection on the outer normal of the rectangle curve"
        drop_down_menu_label.innerHTML = "Theorem"
        div_rot_label_header.innerHTML = "Value:"
        integral_label_header.innerHTML = "Value:"
        subheader.innerHTML = "A research-based simulation on vector fields: divergence and curl"
        btn_reset.innerHTML = "Reset all"
        btn_calc.innerHTML = "Recalculate"
        btn_gauss.innerHTML = "Gauss' theorem"
        btn_stokes.innerHTML = "Stokes' theorem"

        if (theorem == "gauss"){
            div_rot_header.innerHTML = "Divergence"
            flux_header.innerHTML = "Flux through area"
            projection_label.innerHTML = "Show projection on the outer normal of the rectangle curve"

        }
        if (theorem == "stokes"){
            div_rot_header.innerHTML = "Curl"
            flux_header.innerHTML = "Circulation along a curve"
            projection_label.innerHTML = "Show projection on the vector path element of the curve"
            paddlewheel_checkbox_label.innerHTML = "Insert paddle wheel"
        }

        switch_language(lang, theorem)
    }
    else if (lang == "en"){
        lang = "de"
        btn_lang.innerHTML  = 'Switch to English'

        field_define_label.innerHTML = "Definiere das Vektorfeld: "
        x_component_entry_label.innerHTML = "x-Komponente"
        y_component_entry_label.innerHTML = "y-Komponente"
        vector_amount_entry_label.innerHTML = "Anzahl der Vektoren"
        coordinate_checkbox_label.innerHTML = "Koordinatenachsen anzeigen"
        fieldscanner_checkbox_label.innerHTML = "Feld abtasten"
        partial_x_checkbox_label.innerHTML  = "x-Komponente anzeigen"
        partial_y_checkbox_label.innerHTML = "y-Komponente anzeigen"
        
        if (theorem == "gauss"){
            div_rot_header.innerHTML = "Divergenz"
            flux_header.innerHTML = "Fluss durch Fläche"
            projection_label.innerHTML = "Projektion auf die Normale der Kurve oder der Oberfläche anzeigen"

        }
        if (theorem == "stokes"){
            div_rot_header.innerHTML = "Rotation"
            flux_header.innerHTML = "Zirkulation entlang einer Kurve"
            projection_label.innerHTML = "Projektion auf das vektorielle Wegelement einblenden"
            paddlewheel_checkbox_label.innerHTML = " Paddlewheel einfügen"
        }
        drop_down_menu_label.innerHTML = "Integralsatz"
        div_rot_label_header.innerHTML = "Wert:"
        integral_label_header.innerHTML = "Wert:"
        subheader.innerHTML = "Eine forschungsbasierte Simulation zu Vektorfeldern: Divergenz und Curl"
        btn_reset.innerHTML = "Zurücksetzen"
        btn_calc.innerHTML = "Neu berechnen"
        
        btn_gauss.innerHTML = 'Satz von Gauss'
        btn_stokes.innerHTML = 'Satz von Stokes'

        switch_language(lang, theorem)
    }

    // Popover init from bootstrap for infobox
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map( function(popoverTriggerEl) {
    return  new bootstrap.Popover(popoverTriggerEl, {
    trigger : 'hover'
    });
    });

    // Tooltips init
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map( function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger : 'hover'
        })
    })

    

}

export function clickedGauss(event) {
    // Looks
    btn_gauss.setAttribute('class', 'dropdown-item active');
    btn_stokes.setAttribute('class', 'dropdown-item');
    if (lang == "de"){
        div_rot_header.innerHTML = 'Divergenz';
        flux_header.innerHTML = 'Fluss durch Fläche';
        projection_label.innerHTML = 'Projektion auf die Kurvennormale der Fläche einblenden';
    }
    if (lang == "en"){
        div_rot_header.innerHTML = "Divergence"
        flux_header.innerHTML = "Flux through area"
        projection_label.innerHTML = "Show projection on the outer normal of the rectangle curve"
    }
    
    latex_image.src = './res/Latex_Gauss.png'
    paddlewheel_div.style.visibility='hidden' 
    // Tooltips
    switch_tooltips('stokes')
    theorem = 'gauss';
    // Background
    set_integral_label()
    F1.rec_vectors = []
    p_wheel.visible = false
    p_wheel.vecs_near_wheel = []
    F1.partial_x_vecs = []
    F1.partial_y_vecs = []
    paddlewheel_checkbox.checked = false

    if (partial_x_checkbox.checked){
        F1.add_partial_x_vectors(rect.vecs_in_rect)
    }
    if (partial_y_checkbox.checked){
        F1.add_partial_y_vectors(rect.vecs_in_rect)
    }
    if (projections_checkbox.checked){
        rect.draw_surface_vektores()
    }    
    redraw_canvas()
    // Tooltips init
    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList = tooltipTriggerList.map( function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger : 'hover'
        })
    })
}

export function clickedStokes(event) {
    btn_gauss.setAttribute('class', 'dropdown-item');
    btn_stokes.setAttribute('class', 'dropdown-item active');
    if(lang == "de")
    {
        div_rot_header.innerHTML = 'Rotation';
        flux_header.innerHTML = 'Zirkulation entlang einer Kurve';
        projection_label.innerHTML = 'Projektion auf das vektorielle Wegelement einblenden';
    }  
    if (lang == "en")
    {
        div_rot_header.innerHTML = 'Curl';
        flux_header.innerHTML = "Circulation along a curve"
        projection_label.innerHTML = "Show projection on the vector path element of the curve"
        paddlewheel_checkbox_label.innerHTML = "Insert paddle wheel"
    }
    latex_image.src = './res/Latex_Stokes.png'
    paddlewheel_div.style.visibility='visible'
    switch_tooltips('gauss')
    theorem = 'stokes';
    set_integral_label()
    F1.rec_vectors = []
    if (projections_checkbox.checked){
        rect.draw_line_vectores()
    }    
    redraw_canvas()
    // Tooltips init
    tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList = tooltipTriggerList.map( function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger : 'hover'
        })
    })
}

// Pressing enter on field entries or Neu berechnen
export function clickPressField(event) {
    if (event.keyCode == 13 || event.type == 'click') {
        event.preventDefault();
        c.fillStyle = canvas_background;
        c.fillRect(0, 0, canvas.width, canvas.height);
        amount_of_vectors = vector_amount_entry.value;
        var old_fieldscann_vecs = F1.fieldscanner_vectors
        F1 = new Field(x_component_entry.value, y_component_entry.value, canvas, amount_of_vectors, coordinate_system);
        F1.fieldscanner_vectors = recalc_fieldscanner_vecs(old_fieldscann_vecs)
        rect.field = F1
        coordinates.field = F1
        rect.set_vectors_in_rect(F1)
        if (partial_x_checkbox.checked){
            F1.add_partial_x_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel).concat(F1.fieldscanner_vectors))
        }
        if (partial_y_checkbox.checked){
            F1.add_partial_y_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel).concat(F1.fieldscanner_vectors))
        }
        if (projections_checkbox.checked){
            if (theorem == 'gauss') {
                rect.draw_surface_vektores();
            }
            if (theorem == 'stokes'){
                rect.draw_line_vectores()
            }
        }
        p_wheel.move_to(p_wheel.position, F1)
        div_rot_label.innerHTML = " "
        set_integral_label()
        redraw_canvas()
    }
}

export function resetPage(event) {
    vector_amount_entry.value = 11;
    amount_of_vectors = vector_amount_entry.value;
    x_component_entry.value = 'x';
    y_component_entry.value = 'y';
    partial_x_checkbox.checked = false
    partial_y_checkbox.checked = false
    projections_checkbox.checked = false
    fieldscanner_checkbox.checked = false
    paddlewheel_checkbox.checked = false
    coordinate_checkbox.checked = false
    F1 = new Field(x_component_entry.value, y_component_entry.value, canvas, amount_of_vectors, coordinate_system);
    p_wheel = new Paddlewheel()
    coordinates = new Coordinateline_Euklidian(canvas, F1)
    coordinates.field = F1
    rect = new Rectangle(F1)

    div_rot_label.innerHTML = " "
    set_integral_label()
    redraw_canvas()
}

// Event Handeling for checkboxes

paddlewheel_checkbox.addEventListener('change', (event) => {
    if (paddlewheel_checkbox.checked){
        p_wheel.visible = true
        p_wheel.move_to({x:100,y:100}, F1)
        p_wheel.set_vectors_near_wheel(F1)
        if (partial_x_checkbox.checked){
            F1.add_partial_x_vectors(p_wheel.vecs_near_wheel)
        }
        if (partial_y_checkbox.checked){
            F1.add_partial_y_vectors(p_wheel.vecs_near_wheel)
        }
        p_wheel.draw(c)
        animate()
    }
    else {
        p_wheel.visible = false
        p_wheel.vecs_near_wheel = []
        F1.partial_x_vecs = []
        F1.partial_y_vecs = []
        if (partial_x_checkbox.checked){
            F1.add_partial_x_vectors(rect.vecs_in_rect)
        }
        if (partial_y_checkbox.checked){
            F1.add_partial_y_vectors(rect.vecs_in_rect)
        }
        redraw_canvas()
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
        redraw_canvas()
    }
});

// Fieldscanenr checkbox
fieldscanner_checkbox.addEventListener('change', (event)=>{
    if (fieldscanner_checkbox.checked){
        F1.rec_vectors = []
        F1.partial_x_vecs = []
        F1.partial_y_vecs = []
        rect.startpoint = {x:0, y:0}
        rect.vecs_in_rect = []
        p_wheel.vecs_near_wheel = []
        rect.set_width_and_height({x:0, y:0})
    }
    else {
        F1.fieldscanner_vectors = []
        F1.rec_vectors = []
        F1.partial_x_vecs = []
        F1.partial_y_vecs = []
    }
    redraw_canvas()
})

// Projections chheckbox
projections_checkbox.addEventListener('change', (event) => {
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
    redraw_canvas()
})


// Patial checkboxes
partial_x_checkbox.addEventListener('change', (event) =>{
    if (partial_x_checkbox.checked){
        F1.add_partial_x_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel).concat(F1.fieldscanner_vectors))
    }
    else{
        F1.add_partial_x_vectors([])
    }
    redraw_canvas()
} )

partial_y_checkbox.addEventListener('change', (event) =>{
    if (partial_y_checkbox.checked){
            F1.add_partial_y_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel).concat(F1.fieldscanner_vectors))
    }
    else{
        F1.add_partial_y_vectors([])
    }
    redraw_canvas()
} )



//// Interactivity Handling on Canvas ////

// When mousebutton is released:
canvas.addEventListener('click', (event) => {
    move = 0;
   
    const bounding = canvas.getBoundingClientRect()
    const p_canvas = { x: event.clientX - bounding.left, y: event.clientY - bounding.top };
    const p_coord = F1.transform(p_canvas);


    if (fieldscanner_checkbox.checked) {
        var v = F1.value_at(p_coord.x, p_coord.y);
        v.x *= F1.norm_factor;
        v.y *= F1.norm_factor;
        v.recalc_len()
        F1.fieldscanner_vectors.push({ p: p_canvas, v: v });
        set_div_rot_label(p_coord)

        if (partial_x_checkbox.checked) {
            F1.add_partial_x_vectors(F1.fieldscanner_vectors)     
        }
        if (partial_y_checkbox.checked) {
            F1.add_partial_y_vectors(F1.fieldscanner_vectors)
        }
    }   

    if (projections_checkbox.checked) {
        if (theorem == 'gauss') {
            rect.draw_surface_vektores();
        } else {
            rect.draw_line_vectores()
        }
    }

    redraw_canvas()
})


// When mouse moves over canvas:
var state = "outside"
var old_startpoint = {x:0,y:0}
var old_width = 0
var old_height = 0

canvas.addEventListener('mousemove', (event) => {
    const bounding = canvas.getBoundingClientRect()
    const p = { x: event.clientX - bounding.left, y: event.clientY - bounding.top };
    if (mouseDown) {
        if (fieldscanner_checkbox.checked == false) {
            if (move == 0){
                first_clicked_p = { x: event.clientX - bounding.left, y: event.clientY - bounding.top };
                Object.assign(old_startpoint, rect.startpoint)
                old_width = rect.width.valueOf()
                old_height = rect.height.valueOf()
            }
            // do something with the rect
                switch (state) {
                    case 'inside': 
                        rect.startpoint.x = old_startpoint.x-(first_clicked_p.x-p.x)
                        rect.startpoint.y = old_startpoint.y-(first_clicked_p.y-p.y)
                    break

                    case 'left':
                        if (rect.width < 0){
                            rect.width = (p.x-first_clicked_p.x)+(first_clicked_p.x-old_startpoint.x)
                        }else if (rect.width > 0){
                            rect.startpoint.x = p.x
                            rect.width = old_width + (first_clicked_p.x-p.x) 
                        }
                        else {break}
                    break
                    
                    case 'right':
                        if (rect.width > 0){
                            rect.width = (p.x-first_clicked_p.x)+(first_clicked_p.x-old_startpoint.x) 
                        }else if (rect.width < 0){
                            rect.startpoint.x = p.x
                            rect.width = old_width + (first_clicked_p.x-p.x) 
                        }
                        else {break}
                    break

                    case 'bottom':
                        if (rect.height > 0){
                            rect.height = (p.y-first_clicked_p.y)+(first_clicked_p.y-old_startpoint.y) 
                        }else if (rect.height < 0){
                            rect.startpoint.y = p.y
                            rect.height = old_height + (first_clicked_p.y-p.y) 
                        }
                        else {break}
                    break
                    
                    
                    case 'top':
                        if (rect.height < 0){
                            rect.height = (p.y-first_clicked_p.y)+(first_clicked_p.y-old_startpoint.y) 
                        }else if (rect.height > 0){
                            rect.startpoint.y = p.y
                            rect.height = old_height + (first_clicked_p.y-p.y) 
                        }
                        else {break}
                    break

                    case 'on_p_wheel':
                        p_wheel.move_to(p,F1)
                    break
                    
                    default :
                    if (move == 1) {
                            rect.startpoint = p
                        }
                        rect.set_width_and_height(p)     
                }
                rect.set_vectors_in_rect(F1)
                if (p_wheel.visible){
                    p_wheel.set_vectors_near_wheel(F1)
                }
                if (projections_checkbox.checked) {
                if (theorem == 'gauss') {
                        rect.draw_surface_vektores();
                    }
                    if (theorem == 'stokes') {
                        rect.draw_line_vectores()
                    }
                }
                if (partial_x_checkbox.checked) {
                    F1.add_partial_x_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel))
                }
                if (partial_y_checkbox.checked){
                F1.add_partial_y_vectors(rect.vecs_in_rect.concat(p_wheel.vecs_near_wheel))
                    }
            set_integral_label()
            var middle_coord = F1.transform(rect.middle())
            set_div_rot_label(middle_coord)
        }
        else {
            if (move%10 == 0){
                var p_coord = F1.transform(p)
                var v = F1.value_at(p_coord.x, p_coord.y);
                v.x *= F1.norm_factor;
                v.y *= F1.norm_factor;
                v.recalc_len()
                F1.fieldscanner_vectors.push({ p: p, v: v });
                set_div_rot_label(p_coord)
    
                if (partial_x_checkbox.checked) {
                    F1.add_partial_x_vectors(F1.fieldscanner_vectors)     
                }
                if (partial_y_checkbox.checked) {
                    F1.add_partial_y_vectors(F1.fieldscanner_vectors)
                }
            }
        }
        redraw_canvas()
        move += 1
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
})


// Fieldscanner

function recalc_fieldscanner_vecs(old_fv){
    var new_fieldscann_vecs =[]
    old_fv.forEach(vec =>{
        var point = F1.transform(vec.p) 
        var new_v = F1.value_at(point.x,point.y)
        new_v.x *= F1.norm_factor;
        new_v.y *= F1.norm_factor;
        new_v.recalc_len()
        new_fieldscann_vecs.push({p:vec.p, v:new_v})
    })
    return new_fieldscann_vecs
}

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
    integral_label.innerHTML = value.toFixed(2) + '±' + error.toFixed(2)
}


// Animation

let animationID

function animate(){
    if (paddlewheel_checkbox.checked == false) {return}
    animationID = requestAnimationFrame(animate)
    p_wheel.update(c)
    redraw_canvas()
}

function resize(){
    redraw_canvas()
}

// Updater
function redraw_canvas(){
    c.clearRect(0,0,canvas.width, canvas.height)
    rect.draw(c)
    F1.draw(c)
    coordinates.draw(c)
    p_wheel.draw(c)
}

////////////////////////////////////////////////////////////7

// Debugging //


function redraw_canvas_debug(){
    c.clearRect(0,0,canvas.width, canvas.height)
    // rect.draw(c)
    F1.draw(c)
    // coordinates.draw(c)
    // p_wheel.draw(c)
}

if (debug){
    canvas.setAttribute("style","background-color: green;")
    debug_btn.setAttribute("style","display:show;")
    console.log(canvas)

    debug_btn.addEventListener('click', (event) =>{
    redraw_canvas_debug()

    console.log("Redrawed Manually", F1)

})

}

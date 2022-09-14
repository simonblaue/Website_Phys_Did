
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


// Setting title for tooltips

const field_creation_text = 'Definiere das Feld über seine Komponenten abhängig von x, y, Skalaren und den Operationen (+, -, *, /). Wurzel-Operationen, Tangensfunktionen, Betragsfunktionen und Exponentialfunktionen sind nicht möglich. Es müssen Operatoren zwischen Zahlen und Variablen verwendet werden.'

const vector_amount_text = 'Veränderung der Anzahl an Vektoren pro Reihe und Zeile. Eine Änderung muss mit Enter bestätigt werden.'

const coordinate_checkbox_text = 'Durch Aktivierung werden die Koordinatenachsen eingeblendet.'

const rectangle_text = 'Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (Fieldscanner muss deaktiviert sein). Dieses kann mit der Maus im Feld bewegt und seine Ränder können beliebig verschoben werden. Der Fluss durch/entlang des Randes der aufgezogenen Rechteckfläche wird angezeigt (Angabe in abitrary units a.u.).'

const fieldscanner_text = 'Mit dem Fieldscanner können durch drückten der Maustaste Vektorern eingezeichnet werden. Für diese Stelle wird der Wert der Divergenz angezeigt.'

const partial_x_text = 'Durch Aktivierung der Box kann die x-Komponente innerhalb eines Rechtecks eingeblendet werden.'
const partial_y_text = 'Durch Aktivierung der Box kann die y-Komponente innerhalb eines Rechtecks eingeblendet werden.'

const projections_text_gauss = 'Die Projektion der Feldkomponenten auf die Normalen an den Rand der Rechteckfläche wird durch Aktivierung der Box eingeblendet.'
const projections_text_stokes = 'Die Projektion der Feldkomponenten auf die vektoriellen Wegelemente der Rechteckkurve wird durch Aktivierung der Box eingeblendet.'

const paddlewheel_text = 'Durch Aktivierung der Box wird ein Schaufelrad in das Feld eingefügt.'


// '  Ein Klick mit der rechten Maustaste an einen beliebigen Ort im Feld gibt die Divergenz an diesem Ort an (in a.u.). '

// Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (Fieldscanner muss deaktiviert sein). Rechteck und Rad können mit der Maus im Feld bewegt und die Ränder des Rechtecks können beliebig verschoben werden. Der Fluss entlang der Randkurve der aufgezogenen Rechteckfläche wird angezeigt (Angabe in abitrary units a.u.). 

// 


x_component_entry.setAttribute('title', field_creation_text)
x_component_entry.previousElementSibling.setAttribute('title', field_creation_text)
y_component_entry.setAttribute('title',field_creation_text)
y_component_entry.previousElementSibling.setAttribute('title', field_creation_text)

vector_amount_entry.setAttribute('title', vector_amount_text)
vector_amount_entry.previousElementSibling.setAttribute('title', vector_amount_text)

coordinate_checkbox.setAttribute('title', coordinate_checkbox_text )
coordinate_checkbox.nextElementSibling.setAttribute('title', coordinate_checkbox_text)

div_rot_header.setAttribute('title', rectangle_text)
flux_header.setAttribute('title', rectangle_text)

fieldscanner_checkbox.setAttribute('title', fieldscanner_text)
fieldscanner_checkbox.nextElementSibling.setAttribute('title', fieldscanner_text)

projections_checkbox.setAttribute('title', projections_text_gauss)
projections_checkbox.nextElementSibling.setAttribute('title', projections_text_gauss)

paddlewheel_checkbox.setAttribute('title', paddlewheel_text)
paddlewheel_checkbox.nextElementSibling.setAttribute('title', paddlewheel_text)
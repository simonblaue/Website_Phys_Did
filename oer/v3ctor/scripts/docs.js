/// Get Elements from DOM


const icon_btn = document.querySelector('#icon-btn')
const info_btn = document.querySelector('#info-btn')
//Theorems
const theorem_button = document.querySelector('#dropdown-menu-tooltip')
const latex_image = document.querySelector('#latex_img')

//Field defeinition
const entry_label = document.querySelector('#vectorfield_define_label')
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
const paddlewheel_div = document.querySelector('#paddlewheel_div')
paddlewheel_div.style.visibility='hidden' 
const paddlewheel_checkbox = document.querySelector('#paddlewheel')


/// Setting the Tooltip strings -> End them with a whitespace for gluing them together
let info_text = "Halte die Maus über den einzelnen Elementen still, um mehr über sie zu erfahren."

let icon_text = "Die Applikation wurde an der Fakultät für Physik der Universität Göttingen in der Didaktik der Physik (Prof. Dr. Pascal Klein) für Lehrzwecke entwickelt. Kontakt für Feedback und Fragen: Simon Blaue, Larissa Hahn (larissa.hahn@uni-goettingen.de)."

let theorem_text = "Wähle zwischen den Theoremen, um zwischen Divergenz und Rotation zu wechseln."

let field_creation_text = 'Definiere das Feld über seine Komponenten abhängig von x, y, Skalaren und den Operationen (+, -, *, /). Es müssen Operatoren zwischen Zahlen und Variablen verwendet werden. Die Änderung muss mit Enter oder <i>Neu berechnen</i> bestätigt werden. '

let vector_amount_text = 'Veränderung der Anzahl an Vektoren. Eine Änderung muss mit Enter oder <i>Neu berechnen</i> bestätigt werden. Mit den Pfeiltasten kann die Anzahl in Einer-Schritten erfolgen. '

let coordinate_checkbox_text = 'Durch Aktivierung werden die Koordinatenachsen in den kartesischen Koordinaten x und y  eingeblendet. '

let rectangle_text_gauss = 'Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (<i>Feld abtasten</i> muss deaktiviert sein). Dieses kann mit der Maus im Feld bewegt und seine Ränder können beliebig verschoben werden. Der Fluss durch/entlang des Randes der aufgezogenen Rechteckfläche wird angezeigt. Die Divergenz wird am Mittelpunkt des Rechtecks berechnet. '

let rectangle_text_stokes = 'Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (<i>Feld abtasten</i> muss deaktiviert sein). Dieses kann mit der Maus im Feld bewegt und seine Ränder können beliebig verschoben werden. Die Zirkulation durch/entlang des Randes der aufgezogenen Rechteckfläche wird angezeigt. Die Rotation wird am Mittelpunkt des Rechtecks berechnet. '

let fieldscanner_text_gauss = 'Bei Aktivierung von <i>Feld abtasten</i> können durch Festhalten der Maustaste Vektorern eingezeichnet werden. Für diese Stelle wird der Wert der Divergenz angezeigt. '

let fieldscanner_text_stokes = 'Bei Aktivierung von <i>Feld abtasten</i> können durch Festhalten der Maustaste Vektorern eingezeichnet werden. Für diese Stelle wird der Wert der Rotation angezeigt. '
let partial_x_text_gauss = 'Durch Aktivierung der x-Komponente kann diese innerhalb eines Rechtecks oder an den eingezeichneten Vektoren eingeblendet werden. '
let partial_y_text_gauss = 'Durch Aktivierung der y-Komponente kann diese innerhalb eines Rechtecks oder an den eingezeichneten Vektoren eingeblendet werden. '

let partial_x_text_stokes = 'Durch Aktivierung der x-Komponente kann diese innerhalb eines Rechtecks, an den eingezeichneten Vektoren und in der nähe des Schaufelrads eingeblendet werden. '
let partial_y_text_stokes = 'Durch Aktivierung der y-Komponente kann diese innerhalb eines Rechtecks, an den eingezeichneten Vektoren und in der nähe des Schaufelrads eingeblendet werden. '

let projections_text_gauss = 'Die Projektion der Feldkomponenten auf die Normalen an den Rand der Rechteckfläche wird durch Aktivierung der Box eingeblendet. '
let projections_text_stokes = 'Die Projektion der Feldkomponenten auf die vektoriellen Wegelemente der Rechteckkurve wird durch Aktivierung der Box eingeblendet. '

let paddlewheel_text = 'Durch Aktivierung der Box wird ein Schaufelrad in das Feld eingefügt. Dieses kann mit der Maus verschoben werden. '



// function for change between stokes and gauss

export function switch_tooltips(old_theorem){

	info_btn.setAttribute('data-bs-content', info_text)
	icon_btn.setAttribute('data-bs-content', icon_text)

	theorem_button.setAttribute('title', theorem_text)
	latex_image.setAttribute('title', theorem_text)

	entry_label.setAttribute('title', field_creation_text)
	x_component_entry.setAttribute('title', field_creation_text)
	x_component_entry.previousElementSibling.setAttribute('title', field_creation_text)
	y_component_entry.setAttribute('title',field_creation_text)
	y_component_entry.previousElementSibling.setAttribute('title', field_creation_text)

	vector_amount_entry.setAttribute('title', vector_amount_text)
	vector_amount_entry.previousElementSibling.setAttribute('title', vector_amount_text)

	coordinate_checkbox.setAttribute('title', coordinate_checkbox_text )
	coordinate_checkbox.nextElementSibling.setAttribute('title', coordinate_checkbox_text)


	if (old_theorem == 'stokes'){
		div_rot_header.setAttribute('title', fieldscanner_text_gauss+partial_x_text_gauss+partial_y_text_gauss)
		
		fieldscanner_checkbox.setAttribute('title', fieldscanner_text_gauss)
		fieldscanner_checkbox.nextElementSibling.setAttribute('title', fieldscanner_text_gauss)

		flux_header.setAttribute('title', rectangle_text_gauss+projections_text_gauss)
		projections_checkbox.setAttribute('title', projections_text_gauss)
		projections_checkbox.nextElementSibling.setAttribute('title', projections_text_gauss)

		partial_x_checkbox.setAttribute('title', partial_x_text_gauss)
		partial_x_checkbox.nextElementSibling.setAttribute('title', partial_x_text_gauss)
		partial_y_checkbox.setAttribute('title', partial_y_text_gauss)
		partial_y_checkbox.nextElementSibling.setAttribute('title', partial_y_text_gauss)
	}
	else {
		div_rot_header.setAttribute('title', fieldscanner_text_stokes+partial_x_text_stokes+partial_y_text_stokes)
		
		fieldscanner_checkbox.setAttribute('title', fieldscanner_text_stokes)
		fieldscanner_checkbox.nextElementSibling.setAttribute('title', fieldscanner_text_stokes)

		flux_header.setAttribute('title', rectangle_text_stokes+projections_text_stokes)
		projections_checkbox.setAttribute('title', projections_text_stokes)
		projections_checkbox.nextElementSibling.setAttribute('title', projections_text_stokes)

		partial_x_checkbox.setAttribute('title', partial_x_text_stokes)
		partial_x_checkbox.nextElementSibling.setAttribute('title', partial_x_text_stokes)
		partial_y_checkbox.setAttribute('title', partial_y_text_stokes)
		partial_y_checkbox.nextElementSibling.setAttribute('title', partial_y_text_stokes)

		paddlewheel_checkbox.setAttribute('title', paddlewheel_text)
		paddlewheel_checkbox.nextElementSibling.setAttribute('title', paddlewheel_text)
	}
	

	var all_with_title = document.querySelectorAll('[title]')

	all_with_title.forEach(elem => {
		elem.setAttribute('data-bs-toggle','tooltip')
		elem.setAttribute('data-bs-delay','{"show":200,"hide":50}')
	});

}


export function switch_language(old_lang, theorem){

	if (old_lang == "en"){

		info_text = "Hold your mouse still over each item to learn more about them."

		icon_text = "The application was developed at the Faculty of Physics of the University of Göttingen in the Didactics of Physics (Prof. Dr. Pascal Klein) for teaching purposes. Contact for feedback and questions: Simon Blaue, Larissa Hahn (larissa.hahn@uni-goettingen.de)."

		theorem_text = "Choose between the theorems to switch between Divergence and Rotation.";

		field_creation_text = 'Define the field over its components depending on x, y, scalars, and operations (+, -, *, /). Operators must be used between numbers and variables. The changes must be confirmed with Enter or <i>Recalculate</i>. ';

		vector_amount_text = 'Change the number of vectors. A modification must be confirmed with Enter or <i>Recalculate</i>. The arrow keys can be used to change the number one step at a time. ';

		coordinate_checkbox_text = 'By activating, the coordinate axes in the Cartesian coordinates x and y will be displayed. ';

		rectangle_text_gauss = 'With the mouse pointer, a rectangle can be drawn into the vector field ( <i>scan field</i> must be deactivated). It can be moved within the field with the mouse, and its borders can be shifted arbitrarily. The flow through/along the boundary of the drawn rectangle area will be shown. The divergence is calculated at the center of the rectangle. ';

		rectangle_text_stokes = 'With the mouse pointer, a rectangle can be drawn into the vector field ( <i>scan field</i> must be deactivated). It can be moved within the field with the mouse, and its borders can be shifted arbitrarily. The circulation through/along the boundary of the drawn rectangle area will be shown. The rotation is calculated at the center of the rectangle. ';

		fieldscanner_text_gauss = 'When activating <i>scan field</i>, vectors can be drawn by holding down the mouse button. The value of divergence will be displayed for that point. ';

		fieldscanner_text_stokes = 'When activating <i>scan field</i>, vectors can be drawn by holding down the mouse button. The value of rotation will be displayed for that point. ';

		partial_x_text_gauss = 'By activating the x-component, it can be displayed within a rectangle or at the drawn vectors. ';
		partial_y_text_gauss = 'By activating the y-component, it can be displayed within a rectangle or at the drawn vectors. ';

		partial_x_text_stokes = 'By activating the x-component, it can be displayed within a rectangle, at the drawn vectors, and near the paddlewheel. ';
		partial_y_text_stokes = 'By activating the y-component, it can be displayed within a rectangle, at the drawn vectors, and near the paddlewheel. ';

		projections_text_gauss = 'The projection of the field components onto the normals at the boundary of the rectangle area is displayed by activating the box. ';
		projections_text_stokes = 'The projection of the field components onto the vectorial path elements of the rectangle curve is displayed by activating the box. ';

		paddlewheel_text = 'By activating the box, a paddlewheel is inserted into the field. It can be moved with the mouse. ';


	} else {

		info_text = "Halte die Maus über den einzelnen Elementen still, um mehr über sie zu erfahren."

		icon_text = "Die Applikation wurde an der Fakultät für Physik der Universität Göttingen in der Didaktik der Physik (Prof. Dr. Pascal Klein) für Lehrzwecke entwickelt. Kontakt für Feedback und Fragen: Simon Blaue, Larissa Hahn (larissa.hahn@uni-goettingen.de)."

		theorem_text = "Wähle zwischen den Theoremen, um zwischen Divergenz und Rotation zu wechseln."

		field_creation_text = 'Definiere das Feld über seine Komponenten abhängig von x, y, Skalaren und den Operationen (+, -, *, /). Es müssen Operatoren zwischen Zahlen und Variablen verwendet werden. Die Änderung muss mit Enter oder <i>Neu berechnen</i> bestätigt werden. '

		vector_amount_text = 'Veränderung der Anzahl an Vektoren. Eine Änderung muss mit Enter oder <i>Neu berechnen</i> bestätigt werden. Mit den Pfeiltasten kann die Anzahl in Einer-Schritten erfolgen. '

		coordinate_checkbox_text = 'Durch Aktivierung werden die Koordinatenachsen in den kartesischen Koordinaten x und y  eingeblendet. '

		rectangle_text_gauss = 'Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (<i>Feld abtasten</i> muss deaktiviert sein). Dieses kann mit der Maus im Feld bewegt und seine Ränder können beliebig verschoben werden. Der Fluss durch/entlang des Randes der aufgezogenen Rechteckfläche wird angezeigt. Die Divergenz wird am Mittelpunkt des Rechtecks berechnet. '

		rectangle_text_stokes = 'Mit dem Mauszeiger kann ein Rechteck in das Vektorfeld gezogen werden (<i>Feld abtasten</i> muss deaktiviert sein). Dieses kann mit der Maus im Feld bewegt und seine Ränder können beliebig verschoben werden. Die Zirkulation durch/entlang des Randes der aufgezogenen Rechteckfläche wird angezeigt. Die Rotation wird am Mittelpunkt des Rechtecks berechnet. '

		fieldscanner_text_gauss = 'Bei Aktivierung von <i>Feld abtasten</i> können durch Festhalten der Maustaste Vektorern eingezeichnet werden. Für diese Stelle wird der Wert der Divergenz angezeigt. '

		fieldscanner_text_stokes = 'Bei Aktivierung von <i>Feld abtasten</i> können durch Festhalten der Maustaste Vektorern eingezeichnet werden. Für diese Stelle wird der Wert der Rotation angezeigt. '
		partial_x_text_gauss = 'Durch Aktivierung der x-Komponente kann diese innerhalb eines Rechtecks oder an den eingezeichneten Vektoren eingeblendet werden. '
		partial_y_text_gauss = 'Durch Aktivierung der y-Komponente kann diese innerhalb eines Rechtecks oder an den eingezeichneten Vektoren eingeblendet werden. '

		partial_x_text_stokes = 'Durch Aktivierung der x-Komponente kann diese innerhalb eines Rechtecks, an den eingezeichneten Vektoren und in der nähe des Schaufelrads eingeblendet werden. '
		partial_y_text_stokes = 'Durch Aktivierung der y-Komponente kann diese innerhalb eines Rechtecks, an den eingezeichneten Vektoren und in der nähe des Schaufelrads eingeblendet werden. '

		projections_text_gauss = 'Die Projektion der Feldkomponenten auf die Normalen an den Rand der Rechteckfläche wird durch Aktivierung der Box eingeblendet. '
		projections_text_stokes = 'Die Projektion der Feldkomponenten auf die vektoriellen Wegelemente der Rechteckkurve wird durch Aktivierung der Box eingeblendet. '

		paddlewheel_text = 'Durch Aktivierung der Box wird ein Schaufelrad in das Feld eingefügt. Dieses kann mit der Maus verschoben werden. '
	}

	info_btn.setAttribute('data-bs-content', info_text)
	icon_btn.setAttribute('data-bs-content', icon_text)

	theorem_button.setAttribute('title', theorem_text)
	latex_image.setAttribute('title', theorem_text)

	entry_label.setAttribute('title', field_creation_text)
	x_component_entry.setAttribute('title', field_creation_text)
	x_component_entry.previousElementSibling.setAttribute('title', field_creation_text)
	y_component_entry.setAttribute('title',field_creation_text)
	y_component_entry.previousElementSibling.setAttribute('title', field_creation_text)

	vector_amount_entry.setAttribute('title', vector_amount_text)
	vector_amount_entry.previousElementSibling.setAttribute('title', vector_amount_text)

	coordinate_checkbox.setAttribute('title', coordinate_checkbox_text )
	coordinate_checkbox.nextElementSibling.setAttribute('title', coordinate_checkbox_text)


	if (theorem == 'gauss'){
		div_rot_header.setAttribute('title', fieldscanner_text_gauss+partial_x_text_gauss+partial_y_text_gauss)
		
		fieldscanner_checkbox.setAttribute('title', fieldscanner_text_gauss)
		fieldscanner_checkbox.nextElementSibling.setAttribute('title', fieldscanner_text_gauss)

		flux_header.setAttribute('title', rectangle_text_gauss+projections_text_gauss)
		projections_checkbox.setAttribute('title', projections_text_gauss)
		projections_checkbox.nextElementSibling.setAttribute('title', projections_text_gauss)

		partial_x_checkbox.setAttribute('title', partial_x_text_gauss)
		partial_x_checkbox.nextElementSibling.setAttribute('title', partial_x_text_gauss)
		partial_y_checkbox.setAttribute('title', partial_y_text_gauss)
		partial_y_checkbox.nextElementSibling.setAttribute('title', partial_y_text_gauss)
	}
	else {
		div_rot_header.setAttribute('title', fieldscanner_text_stokes+partial_x_text_stokes+partial_y_text_stokes)
		
		fieldscanner_checkbox.setAttribute('title', fieldscanner_text_stokes)
		fieldscanner_checkbox.nextElementSibling.setAttribute('title', fieldscanner_text_stokes)

		flux_header.setAttribute('title', rectangle_text_stokes+projections_text_stokes)
		projections_checkbox.setAttribute('title', projections_text_stokes)
		projections_checkbox.nextElementSibling.setAttribute('title', projections_text_stokes)

		partial_x_checkbox.setAttribute('title', partial_x_text_stokes)
		partial_x_checkbox.nextElementSibling.setAttribute('title', partial_x_text_stokes)
		partial_y_checkbox.setAttribute('title', partial_y_text_stokes)
		partial_y_checkbox.nextElementSibling.setAttribute('title', partial_y_text_stokes)

		paddlewheel_checkbox.setAttribute('title', paddlewheel_text)
		paddlewheel_checkbox.nextElementSibling.setAttribute('title', paddlewheel_text)
	}
	

	var all_with_title = document.querySelectorAll('[title]')

	all_with_title.forEach(elem => {
		elem.setAttribute('data-bs-toggle','tooltip')
		elem.setAttribute('data-bs-delay','{"show":200,"hide":50}')
	});

}

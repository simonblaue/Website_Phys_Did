
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d",  { alpha: false });
canvas.width = canvas.clientWidth;
canvas.height = canvas.width;

console.log(canvas)
console.log(window.clientHeight)



TESTER = document.getElementById('plotly-object');
Plotly.newPlot( TESTER, [{
x: [1, 2, 3, 4, 5],
y: [1, 2, 4, 8, 16] }], {
margin: { t: 0 } } );

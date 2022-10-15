
// Canvas handeling// Get Canvas Element:

const canvas = document.querySelector('canvas');
export const c = canvas.getContext("2d",  { alpha: false });
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

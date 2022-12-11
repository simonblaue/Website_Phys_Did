# Here som Todos for javascript and the spring sim

## Better pixels on retina

```javascript
  if (window.devicePixelRatio > 1) {
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    c.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
```

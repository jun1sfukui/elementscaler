# elementscaler
ElementScaler is a Javascript class for scaling a HTML element.

# Usage

```javascript
const es = new ElementScaler({
	selector : "#main", // a selector of the scaling target.
	max : 2,  // a maximum scale
	min : 0.5,  // a minimum scale
	diff : 0.25  // a increase or decrease value for zooming up/down.
});
	
btnZoomUp.addEventListener("click", function(){ es.zoomUp() });
btnZoomDown.addEventListener("click", function(){ es.zoomDown() });
btnReset.addEventListener("click", function(){ es.reset() });
btnZoom.addEventListener("click", function(){ es.zoom(2) });
```

# Sample
https://jun1sfukui.github.io/elementscaler/test.html

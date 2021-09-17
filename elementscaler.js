/******************************************************************
 * ElementScaler : Scaling a HTML element.
 * usage:
 * - const transform = ElementScaler.getTransform(elem)
 * - const ElementScaler.getTransformOrigin(elem)
 * - ElementScaler.setTransformOrigin(elem, origin)
 * - ElementScaler.getScale(elem)
 * - ElementScaler.setScale(elem, scale)
 * - const es = new ElementScaler({selector:"#main"})
 *   es.zoomUp()
 *   es.zoomDown()
 *   es.reset()
 *   es.reset(2.0)
 *****************************************************************/

/**
 * ElementScaler
 * Zooming a target HTML element up/down/reset.
 * @constructor
 * @param options {Object} - options
 * @param options.selector {[string]} - A selector for the target HTML element. Defaults to "body".
 * @param options.origin {[string]} - A scaling origin. The value of the CSS transform-origin property is set to this option. Defaults to "top left"ç¸²‚
 * @param options.min {[number]} - A minimum scale value when zoomDown(). Defaults to 0.1.
 * @param options.max {[number]} - A maximum scale value when zoomUp(). Defaults to 10.0.
 */
function ElementScaler(options) {

    // Initialize private members by options.
    const privates = {
        selector: options.selector || "body",
        origin: options.origin || "top left",
        diff: options.diff || 0.1,
        min: options.min || 0.1,
        max: options.max || 10.0,
        elem: options.elem || null
    }

    // Set the target element
    if (!privates.elem) {
        privates.elem = document.querySelector(privates.selector);
    }
    
    // Set the transform-origin
    ElementScaler.setTransformOrigin(privates.elem, privates.origin);

    // Bind prototype-methods with private variables and set it to instance-methods.
    this.zoomUp = ElementScaler.prototype.zoomUp.bind(this, privates);
    this.zoomDown = ElementScaler.prototype.zoomDown.bind(this, privates);
    this.reset = ElementScaler.prototype.reset.bind(this, privates);
    this.zoom = ElementScaler.prototype.zoom.bind(this, privates);

}
(function () {
    /**
     * zoomUp
     * It can not be greater than options.max.
     * @param {Object} privates - The object of private members.
     * @param {number} [diff] - An adding value to current value.
     */
    ElementScaler.prototype.zoomUp = function (privates, diff) {
        diff = diff || privates.diff;
        const scale = ElementScaler.getScale(privates.elem);
        const newScale = (scale + diff <= privates.max) ? scale + diff : privates.max;
        ElementScaler.setScale(privates.elem, newScale);
    }

    /**
     * zoomDown
     * It can not be smaller than options.min.
     * @param {Object} privates - The object of private members.
     * @param {number} [diff] - A substracting value from current value.
     */
    ElementScaler.prototype.zoomDown = function (privates, diff) {
        diff = diff || privates.diff;
        const scale = ElementScaler.getScale(privates.elem);
        const newScale = (scale - diff >= privates.min) ? scale - diff : privates.min;
        ElementScaler.setScale(privates.elem, newScale);
    }

    /**
     * reset 
     * Set the scaling to 1.0.
     * @param {Object} privates - The object of private members.
     */
    ElementScaler.prototype.reset = function (privates) {
        const newScale = 1.0;
        ElementScaler.setScale(privates.elem, newScale);
    }

    /**
     * Set the scaling to a specified value
     * @param {Object} privates - The object of private members.
     * @param {[number]} [newScale] - An new scaling value. Defaults to 1.0(no scaling).
     */
    ElementScaler.prototype.zoom = function (privates, newScale) {
        newScale = newScale || 1.0;
        ElementScaler.setScale(privates.elem, newScale);
    }

})();

/**
 * ElementScaler.getTransform
 * Getting a CSS transform property value by matrix-format.
 * @param {HTMLElement} elem - A target element.
 * @return { scaleX, rotatep, rotatem, scaleY, translateX, translateY }
 */
ElementScaler.getTransform = function (elem) {
    let css = window.getComputedStyle(elem).getPropertyValue('transform'); // matrix(scaleX, rotate-p, rotate-m, scaleY, translateX, translateY)
    if (!css || css == 'none') {
        css = 'matrix(1,0,0,1,0,0)';
    }
    let arr = css.split('(')[1].split(')')[0].split(',');
    let transform = {
        scaleX: parseFloat(arr[0]),
        rotatep: parseFloat(arr[1]),
        rotatem: parseFloat(arr[2]),
        scaleY: parseFloat(arr[3]),
        translateX: parseFloat(arr[4]),
        translateY: parseFloat(arr[5]),
    }
    return transform;
}

/**
 * ElementScaler.setScale
 * Setting a CSS transform property with "scale(f)" format.
 * @param {HTMLElement} elem - A target element.
 * @param scale {number} - Default to 1.0(no scaling).
 */
ElementScaler.setScale = function (elem, scale) {

    elem.style.transform = 'scale(' + scale + ')';
}

/**
 * Getting a CSS transform.scaleX property value.
 * @param {HTMLElement} elem - A target element.
 * @return {number}
 */
ElementScaler.getScale = function (elem) {
    return ElementScaler.getTransform(elem).scaleX;
}

/**
 * Setting a CSS transform-origin property.
 * @param {HTMLElement} elem - A target element.
 * @param origin {[string]} An origin of scaling.
 */
ElementScaler.setTransformOrigin = function (elem, origin) {
    origin = origin || "top left";
    elem.style.transformOrigin = origin;
}

/**
 * Getting a CSS transform-origin property value.
 * @param {HTMLElement} elem - A target element.
 * @return {string}
 */
ElementScaler.getTransformOrigin = function (elem) {
    return window.getComputedStyle(elem).getPropertyValue('transform-origin');
}
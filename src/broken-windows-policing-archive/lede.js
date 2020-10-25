import scrollama from 'scrollama';
import { select, selectAll } from 'd3-selection'



var container = select('#lede');
var graphic = container.select('.lede-graphic');
var stepContainer = container.select('#steps-container')
var step = stepContainer.select('.lede-step-surrounding-padding .lede-step')
let scroller;

function init() {
    scroller = scrollama(); // Instantiate the scrollama
    scroller // Setup the instance, pass callback functions
        .setup({
            step: '.lede-step-surrounding-padding',
            offset: window.innerWidth < 460 ? 0.95 : 0.65,
            debug: true
        })
        .onStepEnter(onStepEnter)
        .onStepExit(onStepExit);
}


function onStepEnter(response) {
    console.log(response);
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });
}

function onStepExit(response) {
    console.log(response);
}

function handleResize() {
    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    graphic
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");
    scroller.resize();
}

module.exports = { handleResize, init };
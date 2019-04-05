import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/charts/donut-chart';

const pastelLightGreen = '#ccebc5';
const pastelGreen = '#abde9f';
const pastelRed = '#fbb4ae';

// inspiration: https://codepen.io/zakariachowdhury/pen/EZeGJy
// revamp inspiration: https://medium.com/@heyoka/scratch-made-svg-donut-pie-charts-in-html5-2c587e935d72
export default Component.extend({
  layout,

  tagName: 'svg',
  classNames: ['donut-chart'],

  attributeBindings: ['width', 'height'],

  // passed in
  width: 350, // default 350
  height: 350, // default 350
  score: null,

  donutColor: computed(function() {
    return pastelGreen;
  }),

  donutThickness: computed(function() {
    return 8;
  }),
});


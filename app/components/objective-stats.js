import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['objective-stats-row'],

  // passed in
  objective: null,

  active: computed('objective.state', function() {
    return this.get('objective.state') === 0;
  }),

  circleRadius: computed('objective.state', function() {
    if (this.get('objective.state') === 0) {
      return 350;
    } else {
      return 100;
    }
  })
});

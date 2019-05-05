import Component from '@ember/component';

export default Component.extend({
  // passed in
  user: null,
  onSuccessStory: false, // if not passed in, then false

  actions: {
    toggleSuccessStoryPage: function() {
      this.set('onSuccessStory', true);
    },

    toggleStatsPage: function() {
      this.set('onSuccessStory', false);
    }
  }
});

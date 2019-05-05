import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    something: {
      refreshModel: true
    }
  },

  model(params) {
    const username = params.username;
    console.log(params);
    let user = this.get('store').findRecord('user', username);
    let stories = this.store.query('success-story', { user_id: 1 });
    return Ember.RSVP.hash({
      user: user,
      stories: stories
    });

    // return {
    //   'challenges': [
    //     {
    //       'name': 'Alpha',
    //       'score': 91
    //     },
    //     {
    //       'name': 'Beta',
    //       'score': 93
    //     },
    //   ]
    // };
  },

  setupController(controller, ...args) {
    this._super(controller, ...args);

    const step = 'hello';
    controller.set('step', 'step');
    controller.set('queryParams', Object.keys(this.get('queryParams')));
  }
});

// return Ember.RSVP.hash({
//   model1: this.get('store').find(...),
//   model2: this.get('store').find(...)
// }).then(result => {
//   console.log(results.model1);
//   console.log(results.model2);
//   this.set('selected', result.listofthings.rejectBy('disabled').firstObject);
//   this.set('somethingGenerated', this.somemethod(this.selected));
//   return result;
// });

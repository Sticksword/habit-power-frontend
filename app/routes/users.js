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

    return {
      'challenges': [
        {
          'name': 'Alpha',
          'score': 91
        },
        {
          'name': 'Beta',
          'score': 93
        },
      ]
    };
  },

  setupController(controller, ...args) {
    this._super(controller, ...args);

    const step = 'hello';
    controller.set('step', 'step');
    controller.set('queryParams', Object.keys(this.get('queryParams')));
  }
});

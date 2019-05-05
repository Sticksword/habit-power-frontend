import DS from 'ember-data';

export default DS.Model.extend({
  bodyJson: DS.attr('body-json'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  user: DS.belongsTo('user')
});

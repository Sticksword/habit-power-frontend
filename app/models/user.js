import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  dateOfBirth: DS.attr('date'),
  occupation: DS.attr('string'),
  about: DS.attr('string'),
  school: DS.attr('string'),
  company: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  objectives: DS.hasMany('objective')
});

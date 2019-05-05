import DS from 'ember-data';
import EmberArray from '@ember/array';

export default DS.Transform.extend({
  serialize(value) {
    return JSON.stringify(value);
  },
  deserialize(value) {
    return JSON.parse(value);
  }
});

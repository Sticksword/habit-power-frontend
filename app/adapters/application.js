import DS from 'ember-data';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:3000',
  namespace: 'api',
  pathForType(type) {
    return pluralize(underscore(type));
  }
});

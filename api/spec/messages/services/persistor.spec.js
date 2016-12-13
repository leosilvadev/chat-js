/**
 * Created by leonardo on 12/13/16.
 */

const Persistor = require('../../../src/messages/services/persistor');
const jasmine = require('jasmine-node');

describe('Persistor behaviors', () => {

  describe('persist scenarios', () => {
    var onSuccess;
    var onError;
    var message = {channel: {name: 'dashboard'}};

    beforeEach(() => {
      onSuccess = jasmine.createSpy('onSuccess');
      onError = jasmine.createSpy('onError');
    });

    it('should persist one message and call onSuccess callback', () => {
      const persistor = Persistor({
        sadd: (key, message, callback) => {
          callback(undefined, 1);
        }
      });

      persistor.persist(message, onSuccess, onError);

      expect(onSuccess).toHaveBeenCalled();
    });

    it('should call onError callback if there is any redis error', () => {
      const error = Error('Any redis error');
      const persistor = Persistor({
        sadd: (key, message, callback) => {
          callback(error, undefined);
        }
      });

      persistor.persist(message, onSuccess, onError);

      expect(onError).toHaveBeenCalled();
    });
  });
});
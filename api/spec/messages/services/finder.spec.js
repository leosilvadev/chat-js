/**
 * Created by leonardo on 12/13/16.
 */

const Finder = require('../../../src/messages/services/finder');
const jasmine = require('jasmine-node');

describe('Finder behaviors', () => {

  describe('findAll scenarios', () => {
    var onSuccess;
    var onError;

    beforeEach(() => {
      onSuccess = jasmine.createSpy('onSuccess');
      onError = jasmine.createSpy('onError');
    });

    it('should parse and return all messages when the channel has messages sorted by date', () => {
      const finder = Finder({
        smembers: (key, callback) => {
          callback(undefined, [
            '{"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 2","date":"2016-12-10T22:60:10.101Z"}',
            '{"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 1","date":"2016-12-10T22:58:10.101Z"}',
            '{"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 3","date":"2016-12-10T22:65:10.101Z"}',
          ])
        }
      });

      finder.findAll('dashboard3', onSuccess, onError);

      expect(onSuccess).toHaveBeenCalledWith([
        {"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 1","date":"2016-12-10T22:58:10.101Z"},
        {"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 2","date":"2016-12-10T22:60:10.101Z"},
        {"username":"Birdie Vaughn","channel":{"id":"1f011650-bf2c-11e6-b0d2-27c918bbeb6e","name":"dashboard3"},"text":"Message 3","date":"2016-12-10T22:65:10.101Z"},
      ]);
    });

    it('should return an error where there is no message in the channel', () => {
      const finder = Finder({
        smembers: (key, callback) => {
          callback(undefined, [])
        }
      });

      finder.findAll('dashboard3', onSuccess, onError);

      expect(onError).toHaveBeenCalled();
    });

    it('should return an error if there is any redis error', () => {
      const error = Error('Any redis error');
      const finder = Finder({
        smembers: (key, callback) => {
          callback(error, undefined)
        }
      });

      finder.findAll('dashboard3', onSuccess, onError);

      expect(onError).toHaveBeenCalledWith(error);
    });
  });



  describe('exists scenarios', () => {
    var onSuccess;
    var onError;
    var onNotFound;

    beforeEach(() => {
      onSuccess = jasmine.createSpy('onSuccess');
      onError = jasmine.createSpy('onError');
      onNotFound = jasmine.createSpy('onNotFound');
    });

    it('should call onSuccess when the channel exists', () => {
      const finder = Finder({
        scard: (key, callback) => {
          callback(undefined, 10)
        }
      });

      finder.exists('dashboard3', onSuccess, onNotFound, onError);

      expect(onSuccess).toHaveBeenCalled();
    });

    it('should call onNotFound when the channel does not exist', () => {
      const finder = Finder({
        scard: (key, callback) => {
          callback(undefined, 0)
        }
      });

      finder.exists('dashboard3', onSuccess, onNotFound, onError);

      expect(onNotFound).toHaveBeenCalled();
    });

    it('should call onError when the channel does not exist', () => {
      const error = Error('Any redis error');
      const finder = Finder({
        scard: (key, callback) => {
          callback(error, undefined)
        }
      });

      finder.exists('dashboard3', onSuccess, onNotFound, onError);

      expect(onError).toHaveBeenCalledWith(error);
    });
  });
});
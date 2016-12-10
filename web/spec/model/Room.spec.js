import Room from '../../src/domain/Room';
import moment from 'moment';

const buildRoom = (name) => {
  const room = new Room(window, name);
  room._createChannel = (apiUrl, callback) => callback({
    channel: {id: 1, name: 'Room 2'},
    username: 'Jao',
    messages: [{
      channel: {id: 1, name: 'Room 1'},
      username: 'Maria',
      text: 'First message'
    }, {
      channel: {id: 1, name: 'Room 1'},
      username: 'Joseph',
      text: 'Last message'
    }]
  });
  room._initViewState = (messages) => true;
  room._connect = () => true;
  return room;
};

describe('Room', () => {

	let room;

	describe('create a new room and join', () => {
		beforeEach(() => {
			room = buildRoom('Room 1');

      spyOn(room, '_initViewState');
      spyOn(room, '_connect');
		});

		it('should set id, name, username, set view state and connect', () => {
      room.join('whatever');

      expect(room.id).toBe(1);
      expect(room.name).toBe('Room 2');
      expect(room.username).toBe('Jao');

      expect(room._initViewState).toHaveBeenCalled();
      expect(room._connect).toHaveBeenCalled();
		});
	});

  describe('send a message', () => {
    beforeEach(() => {
      room = buildRoom('Room 1');
      room.socket = {emit: (channel, message) => true};

      spyOn(room.socket, 'emit');
    });

    it('should not emit the message if not connected', () => {
      expect(() => room.sendMessage('anymessage')).toThrowError();
    });

    it('should emit the message if connected', () => {
      room.join('whatever');
      room.sendMessage('anymessage');
      expect(room.socket.emit).toHaveBeenCalled();
    });
  });

  describe('build a new message element', () => {
    beforeEach(() => {
      room = buildRoom('Room 1');
    });

    it('should not build a new element when there is any info missing', () => {
      let message;

      message = {username: 'Jao', text: 'Anymessage'};
      expect(() => room._buildMessageElement(message)).toThrowError();

      message = {date: new Date(1, 1, 1, 10, 20, 30), text: 'Anymessage'};
      expect(() => room._buildMessageElement(message)).toThrowError();

      message = {date: new Date(1, 1, 1, 10, 20, 30), username: 'Jao'};
      expect(() => room._buildMessageElement(message)).toThrowError();
    });

    it('should build a new element when there is all needed info', () => {
      const message = {date: new Date(1, 1, 1, 10, 20, 30), username: 'Jao', text: 'Anymessage'};
      const html = room._buildMessageElement(message);

      expect(html).toBe('<li><span class="name">Jao</span> sent at <span class="time">(10:20:30)</span>: Anymessage</li>');
    });
  });

});
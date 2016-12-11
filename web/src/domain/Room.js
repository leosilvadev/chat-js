import $ from 'jquery';
import io from 'socket.io-client';
import moment from 'moment';

class Room {

  constructor(window, name) {
    this.window = window;
    this.name = name;

    this.components = {
      channelName: $('#channelName>span'),
      username: $('#username>span'),
      status: $('#status>span'),
      messagesUl: $('#messages'),
    };
  }

  join(apiUrl) {
    this._createChannel(apiUrl, response => {
      this.id = response.channel.id;
      this.name = response.channel.name;
      this.username = response.username;
      this._initViewState(response.messages);
      this._connect();
    });
  };

  _createChannel(apiUrl, callback) {
    $.post(`${apiUrl}/${this.name}`, callback);
  };

  sendMessage(text) {
    if (this.id && this.name) {
      const data = JSON.stringify({channel: {id: this.id, name: this.name}, username: this.username, text});
      this.socket.emit('send-chat-message', data);
    } else {
      throw Error('You are not connected to this Room yet!');
    }
  };

  _initViewState(messages) {
    this._setHeader(this.username, 'Online');
    this._addMessages(messages);
    this._showLastMessage();
  }

  _connect() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', function(){
      console.log('Connection established');
    });
    this.socket.on(this.id, message => {
      this._addMessage(JSON.parse(message));
      this._showLastMessage();
    });
  };

  _setHeader(username, status) {
    this.components.channelName.html(this.name);
    this.components.username.html(username);
    this.components.status.html(status);
  };

  _addMessages(messages) {
    messages.forEach(message => this._addMessage(message));
  };

  _addMessage(message) {
    this.components.messagesUl.append(this._buildMessageElement(message));
  };

  _buildMessageElement(message) {
    if (message && message.date && message.username && message.text) {
      const date = moment(message.date).format('HH:mm:ss');
      return `<li><span class="name">${message.username}</span> sent at <span class="time">(${date})</span>: ${message.text}</li>`;
    } else {
      throw Error('Invalid data to build a message element');
    }
  };

  _showLastMessage() {
    this.window.scrollTo(0, this.window.document.body.scrollHeight);
  };

}

export default Room;
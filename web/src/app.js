import Navigo from 'navigo';
import Room from './domain/Room';
import env from 'env';
import jquery from 'jquery';

require('./app.sass');

((window, $) => {
  const router = new Navigo(null, false);
  router
    .on('/:channelName', (params) => {
      const channelName = params.channelName;
      const room = new Room(window, channelName);

      if (channelName && channelName !== window.location.host) {
        room.join(env.apiUrl);
        const messageTxt = $('#txtMessage');
        window.sendMessage = () => {
          room.sendMessage(messageTxt.val());
          messageTxt.val('');
          return false;
        };

      } else {
        window.location.href = '/default';
      }
    })
    .resolve();

})(window, jquery);
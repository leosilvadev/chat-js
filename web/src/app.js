import Navigo from 'navigo';
import Room from './domain/Room';
import env from 'env';
import jquery from 'jquery';

require('./app.sass');

((global, $) => {
  const router = new Navigo(null, false);
  router
    .on('/:channelName', (params) => {
      const channelName = params.channelName;
      const room = new Room(global, channelName);

      if (channelName && channelName !== global.location.host) {
        room.join(env.apiUrl);
        const messageTxt = $('#txtMessage');
        global.sendMessage = () => {
          room.sendMessage(messageTxt.val());
          messageTxt.val('');
          return false;
        };

      } else {
        global.location.href = '/default';
      }
    })
    .resolve();

})(window, jquery);
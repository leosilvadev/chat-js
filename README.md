# Chat-js

### How to run

#### Clone it
```
git clone https://github.com/leosilvadev/chat-js.git
```

#### Run it
```bash
./run.sh
```


#### Run tests
```bash
./runTest.sh
```

###### What will happen?
- Download and install redis
- Install api dependencies
- Run api
- Install web dependencies
- Run web

#### Why this stack?
- Nodejs: default non-blocking apis, what is great for 'realtime' two-way messaging
- Hapijs: minimalist library for a small api
- Socket.io: good documentation and community support, well know library for ws
- Jquery: only for http-client, in fact I was using plain javascript for DOM manipulation but I found too many time looking for one simple yet cool http-client for JS

#### Why not X?
- Expressjs: Could be, but I would like to try something new :)
- AngularJS: to small and the main feature is only add DOM elements, it would be needed to implement one directive that allows me to add dom with data without any data binding
- ReactJS or VueJS: no experience, I would try one of these if had more time

#### What is missing / What I would like to implement?
- Channels blocked by password (returning a specific status 403 from api, so client would need to put a password)
- The user set his username or update the default one
- Allow direct messages (would use the same structure, but each user would need one id, so each private message would be kind of 'senderId:receiverId' instead of the channelId)
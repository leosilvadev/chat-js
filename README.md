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

#### What is missing / What I would like to implement?
- Channels blocked by password (returning a specific status 403 from api, so client would need to put a password)
- The user set his username or update the default one
- Allow direct messages (would use the same structure, but each user would need one id, so each private message would be kind of 'senderId:receiverId' instead of the channelId)
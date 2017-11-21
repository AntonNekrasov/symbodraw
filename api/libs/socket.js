let co = require('co');
let socketIO = require('socket.io');

function socket(server) {
  let io = socketIO(server);

  io.use(function(socket, next) {
    let handshakeData = socket.request;

    co(function* () {

      socket.on('disconnect', function() {
        co(function* clearSocketId() {
          let session = yield* sessionStore.get(sid, true);
          if (session) {
            session.socketIds.splice(session.socketIds.indexOf(socket.id), 1);
            yield* sessionStore.save(sid, session);
          }
        }).catch(function(err) {
          console.error("session clear error", err);
        });
      });

    }).then(function() {
      next();
    }).catch(function(err) {
      console.error(err);
      next(new Error("Error has occured."));
    });

  });

  io.on('connection', function (socket) {
    // io.emit('message', `${socket.user.displayName} connected.`);

    socket.emit('message', 'hello', function(response) {
      console.log("delivered", response);
    });

    socket.on('message', (message) => {});

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
}

module.exports = socket;

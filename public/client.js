var socket = io();

var connectionCount = document.getElementById('connection-count');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

var voteTally = document.getElementById('vote-tally');

socket.on('voteCount', function(votes) {
  var talliedVotes = Object.keys(votes).map(function(vote) {
    return ' ' + vote + ': ' + votes[vote];
  });
  voteTally.innerText = 'Current Vote Tally: ' + talliedVotes;
});
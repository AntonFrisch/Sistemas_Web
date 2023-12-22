console.log('Chat client script loaded');

document.addEventListener('DOMContentLoaded', (event) => {
  const socket = io();

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  const form = document.querySelector('#message-form');

  form.addEventListener('submit', (e) => {
    console.log('pressed');
    e.preventDefault();
    const messageInput = document.querySelector('#message-input');
    const message = messageInput.value.trim();
    if (message) {
      console.log('Sending message:', message);
      socket.emit('chat message', message);
      messageInput.value = '';
    }
  });

  socket.on('chat message', (data) => {
    console.log('Message received:', data);
    const messageElement = document.createElement('li');
    messageElement.textContent = `${data.user}: ${data.message}`;
    document.querySelector('#messages').appendChild(messageElement);
  });

  socket.on('load history', (messages) => {
    console.log('Loading history:', messages);
    const messagesList = document.querySelector('#messages');
    messages.forEach((message) => {
      const messageElement = document.createElement('li');
      messageElement.textContent = `${message.user}: ${message.message}`;
      messagesList.appendChild(messageElement);
    });
  });
});

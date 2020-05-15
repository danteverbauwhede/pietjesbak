const users = [];

function makeUser(userId, username, room) {
  const user = {
    userId,
    username,
    room,
    admin: false
  }

  users.push(user);

  return user
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

module.exports = {
  makeUser,
  getCurrentUser
}
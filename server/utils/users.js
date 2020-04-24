const users = [];

function userJoin(userId, username, room) {
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
  userJoin,
  getCurrentUser
}
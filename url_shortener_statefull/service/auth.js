const sessionIdToUserMap = new Map();

function setUser(id, user) {
  sessionIdToUserMap.set(id, user); //The set() method is used to add a new key-value pair 
                                  //to a Map object or to update the value associated with an existing key.
}

function getUser(id) {
  return sessionIdToUserMap.get(id); //get() method to retrieve the value associated with a specific key in the map.
}

module.exports = {
  setUser,
  getUser,
};

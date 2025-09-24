const sessionIdToUserMap = new Map();

//this lives inside our Node.js process memory.When you restart the server, the process stops
//RAM is wiped clean ,he cookie in your browser isn’t erased; 
//it just points to a session ID that no longer exists on the server. 

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

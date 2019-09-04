// README:
// This file contains database CRUD functions.
//-------------------------------------------------------
const { Sequelize, DB } = require('../index.js');

//-------------------------------------------------------
// Define the schema for this table in the DB:

const User = DB.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true, // This indicates that the username MUST BE unique else an error is thrown
  },
  userImgUrl: {
    type: Sequelize.STRING,
  },
  rooms: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});
//-------------------------------------------------------
// Drop this table upon restart of the server:
// Use this ONLY if you want to drop the table on every restart.
User.sync();

//-------------------------------------------------------
// CRUD FUNCTIONS:
/**
 * Adds a user to the database
 * @param  {Object} newUser - User data saved to db.
 */
const addUser = (newUser) => {
  const formatted = {
    username: newUser.username,
    userImgUrl: newUser.userImgUrl,
    rooms: newUser.rooms,
  };

  User.sync({ force: false })
    .then(() => User.create(formatted))
    .catch((err) => { console.log(err); });
};
//----------------------------------
/**
 * Updates a User's rooms
 * @returns A promise after User info is updated.
 */
const updateUser = (name, room) => (
  User.update({ rooms: room }, { where: { username: name } })
    .catch((err) => { console.log(err); })
);
//----------------------------------
/**
 * Retrieves all Users from the database
 * @returns A promise that will get all users.
 */
const getUsers = () => User.findAll().catch((err) => { console.log(err); });
//----------------------------------
/**
 * Retrieves the user by ID
 * @param {String} name - name of user
 * @returns A userId
 */
const getUserById = name => (
  User.findOne({ where: { username: name } })
    .catch((err) => { console.log(err); })
);
//----------------------------------
/**
 * Deletes a user by ID
 * @param {Number} id - id of user record in table
 * @returns A promise after the record in the table is destroyed
 */
const deleteUser = id => (
  User.findById(id)
    .then(result => result.destroy())
    .catch((err) => {
      console.log(err);
    })
);
//-------------------------------------------------------
module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

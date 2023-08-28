const Auth = require('./models/Auth');
const Users = require('./models/Users');
const BlockedToken = require('./models/BlockedToken');

// Create associations
Auth.hasOne(Users, {
    foreignKey: 'auth_id',
});
Users.belongsTo(Auth, {
    foreignKey: 'auth_id',
});

module.exports = {Auth, Users, BlockedToken};
const { Auth } = require('./models/index');
const bcrypt = require('bcryptjs');
const cnfEmail = require('./emailService/confirmEmailResolver');
require('dotenv/config');

const initializeRootAdmin = async () => {

    try {
        // Get data from request body
        // Create a new user
        const admin = {
            email: 'email id of rootadmin',
            password: 'password',
            typeofuser: 'Admin',
            tokens: { tokens: [] }
        }
        // Hash the password
        admin.password = await bcrypt.hash(admin.password, 10);

        const adminUser = await Auth.create(admin);


        //send confirmation email
        const msg = await cnfEmail(adminUser);
        console.log(msg);
        console.log('Admin created successfully');


    } catch (err) {
        console.log(err.message);

    }
};

initializeRootAdmin();
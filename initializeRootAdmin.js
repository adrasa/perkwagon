const { Admin } = require('./models/index');
const bcrypt = require('bcryptjs');
const cnfEmail = require('./emailService/confirmEmailResolver');
require('dotenv/config');

const initializeRootAdmin = async () => {

    try {
        // Get data from request body
        // Create a new user
        const admin = {
            email: 'adrasa.developer@gmail.com',
            password: 'admin123',
            typeofuser: 'Admin',
            tokens: { tokens: [] },
            isRoot: true,
        }
        // Hash the password
        admin.password = await bcrypt.hash(admin.password, 10);

        const adminUser = await Admin.create(admin);


        //send confirmation email
        const msg = await cnfEmail(adminUser, true);
        console.log(msg);
        console.log('Admin created successfully');


    } catch (err) {
        console.log(err.message);

    }
};

initializeRootAdmin();
const { client } = require('./src/config/db');
require('dotenv').config();

async function checkUsers() {
    try {
        await client.connect();
        const db = client.db('assignment-10');
        const users = await db.collection('users').find({}).toArray();
        console.log("Total Users:", users.length);
        users.forEach(u => {
            console.log(`- ${u.email}: ${u.role} (${u._id})`);
        });
        
        // If no admin, make someone admin (for testing)
        const admins = users.filter(u => u.role === 'admin');
        if (admins.length === 0 && users.length > 0) {
            console.log("No admin found. Making the first user admin for testing...");
            await db.collection('users').updateOne({ _id: users[0]._id }, { $set: { role: 'admin' } });
            console.log(`User ${users[0].email} is now admin.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

checkUsers();

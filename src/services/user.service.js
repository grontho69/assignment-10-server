const { client } = require('../config/db');

const getUsersCollection = () => client.db('assignment-10').collection('users');

const getUserByEmail = async (email) => {
    return await getUsersCollection().findOne({ email });
};

const upsertUser = async (userData) => {
    const { email, name, photoURL, role } = userData;
    const filter = { email };
    const updateDoc = {
        $set: {
            name,
            photoURL,
            lastLogin: new Date()
        },
        $setOnInsert: {
            email,
            role: role || 'Public',
            createdAt: new Date()
        }
    };
    const options = { upsert: true, returnDocument: 'after' };
    const result = await getUsersCollection().findOneAndUpdate(filter, updateDoc, options);
    return result;
};

const getAllUsers = async () => {
    return await getUsersCollection().find().toArray();
};

const updateUserRole = async (email, role) => {
    return await getUsersCollection().updateOne(
        { email },
        { $set: { role } }
    );
};

module.exports = {
    getUserByEmail,
    upsertUser,
    getAllUsers,
    updateUserRole
};

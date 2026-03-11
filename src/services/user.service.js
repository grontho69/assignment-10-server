const { client } = require('../config/db');
const { ObjectId } = require('mongodb');

const getUsersCollection = () => client.db('assignment-10').collection('users');

const getUserByEmail = async (email) => {
    return await getUsersCollection().findOne({ email });
};

const upsertUser = async (userData) => {
    const { email, name, photoURL, organization } = userData;
    const filter = { email };
    const existingUser = await getUserByEmail(email);
    const updateDoc = {
        $set: {
            name: name || existingUser?.name,
            photoURL: photoURL || existingUser?.photoURL,
            organization: organization || existingUser?.organization || '',
            lastLogin: new Date()
        },
        $setOnInsert: {
            email,
            role: 'user',
            createdAt: new Date()
        }
    };
    const options = { upsert: true, returnDocument: 'after' };
    const result = await getUsersCollection().findOneAndUpdate(filter, updateDoc, options);
    return result;
};

const getAllUsers = async (search = '') => {
    const query = search 
        ? { 
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ] 
          } 
        : {};
    return await getUsersCollection().find(query).toArray();
};

const updateUserRole = async (userId, role) => {
    return await getUsersCollection().updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role } }
    );
};

const deleteUser = async (userId) => {
    return await getUsersCollection().deleteOne({ _id: new ObjectId(userId) });
};

module.exports = {
    getUserByEmail,
    upsertUser,
    getAllUsers,
    updateUserRole,
    deleteUser
};

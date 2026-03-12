const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getUsersCollection = () => getDB().collection('users');

const getUserByEmail = async (email) => {
    return await getUsersCollection().findOne({ email });
};

const upsertUser = async (userData) => {
    const { email, name, photoURL, organization } = userData;
    const filter = { email };
    
    const existingUser = await getUserByEmail(email);
    const usersCount = await getUsersCollection().countDocuments();
    const defaultRole = usersCount === 0 ? 'admin' : (existingUser?.role || 'user');

    const setObj = { lastLogin: new Date() };
    if (name) setObj.name = name;
    if (photoURL) setObj.photoURL = photoURL;
    if (organization) setObj.organization = organization;

    const updateDoc = {
        $set: setObj,
        $setOnInsert: {
            email,
            role: defaultRole,
            createdAt: new Date()
        }
    };
    
    const options = { upsert: true, returnDocument: 'after' };
    const result = await getUsersCollection().findOneAndUpdate(filter, updateDoc, options);
    
    // In newer mongodb versions, findOneAndUpdate returns the document directly
    // in others it returns an object with a .value property
    return result?.value || result;
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

const makeAdmin = async (userId) => {
    return await getUsersCollection().updateOne(
        { _id: new ObjectId(userId) },
        { $set: { role: 'admin' } }
    );
};

module.exports = {
    getUserByEmail,
    upsertUser,
    getAllUsers,
    updateUserRole,
    deleteUser,
    makeAdmin
};

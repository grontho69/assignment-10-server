const sendNotification = (type, data) => {
    if (global.io) {
        global.io.emit('notification', {
            type,
            message: data.message,
            timestamp: new Date(),
            payload: data.payload || {}
        });
    }
};

module.exports = { sendNotification };

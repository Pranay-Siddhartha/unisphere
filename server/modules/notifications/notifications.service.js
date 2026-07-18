import Notification from './notification.model.js';

export const createNotification = async (text) => {
    const notification = new Notification({ text });
    await notification.save();
    return notification;
}

export const getAllNotifications = async () => {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return notifications;
}

export const getNotificationById = async (id) => {
    const notification = await Notification.findById(id);
    return notification;
}

export const updateNotification = async (id, text) => {
    const notification = await Notification.findByIdAndUpdate(id, { text }, { new: true });
    return notification;
}

export const deleteNotification = async (id) => {  
    const notification = await Notification.findByIdAndDelete(id);
    return notification;
}
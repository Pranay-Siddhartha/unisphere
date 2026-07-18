import {
    getNotifications,
    createNotification,
    updateNotification,
    deleteNotification
} from "./notifications.service.js";

export const getAllnotifications = async (req, res) => {
    try {
        const notifications = await getNotifications();
        res.status(200).json({
            success: true,
            message: "Notifications fetched successfully",
            data: notifications,
        });

    }
    catch (error) {
        next(error)
    }
}
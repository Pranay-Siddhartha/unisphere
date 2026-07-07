// utils/user.utils.js

export const normalizeUsername = (username) => {
    return username.trim().toLowerCase();
};

export const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
};

export const normalizeUserData = (userData) => {
    const normalizedData = { ...userData };

    if (normalizedData.username) {
        normalizedData.username = normalizeUsername(normalizedData.username);
    }

    if (normalizedData.email) {
        normalizedData.email = normalizeEmail(normalizedData.email);
    }

    if (normalizedData.name) {
        normalizedData.name = normalizedData.name.trim();
    }

    return normalizedData;
};
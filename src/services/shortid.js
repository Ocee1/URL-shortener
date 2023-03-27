const generateRandomId = (length) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890bcdefghijklmnopqrstuvwxyz";

    const ranArray = Array.from({length}, (v, k) => chars[~~(Math.random() * chars.length)]);

    const ranStr = ranArray.join('');
    return ranStr;
};

module.exports = generateRandomId;
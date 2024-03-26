const jwt = require('jsonwebtoken');
const User = require('../models/user');
const private_key = process.env.JWT_SECRET;

const extractUserId = async (req, res, next) => {
    try {
        const {token} = req.body;
        console.log("token is",token)
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log("Token is->",token);
        const decodedToken = jwt.verify(token, private_key);
        console.log("Decoded Token:", decodedToken);
        const userId = decodedToken._id;
        console.log("UserId is->",userId);

        // Fetch user from database and attach to request object
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user id to request object
        req.userId = userId;
        // Attach user object to request object if needed
        req.user = user;

        // Proceed to next middleware/route handler
        next();
    } catch (error) {
        console.error("Error extracting user id:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = extractUserId;

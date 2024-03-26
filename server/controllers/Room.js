// create room , adding members
const Room = require("../models/room");


const generateRandomRoomId = async(req,res)=>{
    try{
        // Generate a unique room ID using nanoid
        const roomId =  Math.random().toString(36).substring(2, 8); // Adjust the length as needed
        res.json({
            success:true,
            message:"genrated random id",
            data:roomId,
        })
    }catch(error){
        console.error('Error generating room ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const roomCreate = async (req, res) => {
    try {
        // We will receive room id from frontend
        const { roomId } = req.body;
        
        // Access userId from request object
        const userId = req.userId;

        // Check if the room with the given roomId already exists
        const roomExist = await Room.findOne({ roomId });
        if (roomExist) {
            return res.status(501).json({
                success: false,
                message: "Room with this Id already exists. Create a new room."
            });
        }

        // Create a new room with the provided roomId and userId as the creator
        const newRoom = new Room({
            roomId,
            creator: userId // Store userId as the creator of the room
            // Add other room properties as needed
        });

        // Save the new room to the database
        await newRoom.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Room created successfully."
            // Additional data if needed
        });

    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};




const memberSocketId = async (username, socketId, chatRoom) => {
    try {
        const room = await Room.findOne({ chatRoom });
        if (!room) {
            return {
                success: false,
                message: "No Room exists with this id"
            };
        }

        const tempData = {
            socketId: socketId,
            name: username
        };

        // Assuming room.members is an array, you may need to use push
        room.members.push(tempData);
        await room.save();

        return {
            success: true,
            message: "Socket ID saved successfully"
        };
    } catch (error) {
        console.log("Error in saving socket ID:", error);
        return {
            success: false,
            message: "An error occurred while saving socket ID"
        };
    }
};


// const cron = require('node-cron');
// Define a function to delete old entries from the database
const deleteOldEntries = async () => {
  // Calculate the date and time 2 hours ago
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  try {
    // Find and delete entries older than two hours
    await Room.deleteMany({ createdAt: { $lt: twoHoursAgo } });
    console.log('Old entries deleted successfully.');
  } catch (error) {
    console.error('Error deleting old entries:', error);
  }
};




module.exports={roomCreate,generateRandomRoomId,deleteOldEntries};
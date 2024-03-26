// refresh event , newMember , questionreceive , question send
const Room = require("../models/room");

const newMember = async (username, socketId, roomId) => {
  try {
    const room = await Room.findOne({ roomId: roomId });
    console.log("room found->", room);
    if (!room) {
      return {
        success: false,
        message: "No Room exists with this id",
      };
    }

    const tempData = {
      socketId: socketId,
      name: username,
    };

    // Assuming room.members is an array, you may need to use push
    room.members.push(tempData);
    await room.save();

    return {
      success: true,
      message: "Socket ID saved successfully",
    };
  } catch (error) {
    console.log("Error in saving socket ID:", error);
    return {
      success: false,
      message: "An error occurred while saving socket ID",
    };
  }
};


const removeMember = async (socketId, roomId) => {
    try {
      // Find the room by roomId
      const room = await Room.findOne({ roomId: roomId });
      if (!room) {
        console.log("No room found for disconnected socket");
        return;
      }
  
      // Find the member with the specified socketId
      const foundMember = room.members.find(member => member.socketId === socketId);
      if (!foundMember) {
        console.log("No member found with the specified socketId");
        return { success: false, message: "No room found" };
      }
  
      // Remove the disconnected socket ID from the members array
      room.members = room.members.filter(member => member.socketId !== socketId);
  
      // Save the updated room
      await room.save();
      console.log("Disconnected socket removed from the chat room");
      return { success: true };
    } catch (error) {
      console.error("Error removing member:", error);
      return {
        success: false,
        message: "An error occurred while removing socket ID member",
      };
    }
  };
  

module.exports = { newMember,removeMember };

const { newMember, removeMember } = require("./events/events");
const Room = require("./models/room");
const socketRoomMap = {};
const scores = {};

const addSocketId = async (socketId, roomId) => {
  try {
    const currRoom = await Room.findOne({ roomId: roomId });
    if (currRoom) {
      currRoom.creatorsocketId = socketId;
      await currRoom.save();
      console.log("bna diya ji");
    } else {
      console.error("Room not found.");
      // Handle error: Room not found
    }
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

const currMembers = async (roomId) => {
  try {
   
    console.log(socketRoomMap);
    const members = Object.values(socketRoomMap).filter(room => room === roomId);
    console.log(members);
    console.log(members.length)
    return members.length - 1;
  } catch (error) {
    console.log("Error in currMember", error);
  }
};

const initializeSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected with socket id ${socket.id}`);

    // when someone joins
    socket.on("newMember", async (data) => {
      const { username, roomId, isCreator } = data;
      console.log("inside newMember");
      const result = await newMember(username, socket.id, roomId);
      if (result.success) {
        console.log(`New member added successfully: ${username}`);
        socketRoomMap[socket.id] = roomId;
        if (isCreator) {
          console.log("creator h ji");
          await addSocketId(socket.id, roomId);
        }
        // Emit success event to the client
        socket.emit("newMemberSuccess", {
          message: "New member added successfully",
        });

        // Update current live user count
        try {
          const lengthIs = await currMembers(roomId);
          // Find the creator of this room
          const room = await Room.findOne({ roomId: roomId });
          const creatorSocketId = room.creatorsocketId;
          io.to(creatorSocketId).emit("currUserCount", lengthIs);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Failed to add new member:", result.message);
        // Emit error event to the client
        socket.emit("newMemberError", { message: result.message });
      }
    });

    // used to receive and send event
    socket.on("newQuestion", async (question, roomId) => {
      console.log("roomId is->", roomId);
      console.log("new question revived is->", question);
      const room = await Room.findOne({ roomId: roomId });
      const memberArray = room.members.map((member) => member.socketId);
      console.log(memberArray);

      // Broadcast the event to all members of the room
      memberArray.forEach((socketId) => {
        console.log("sending to socket id", socketId);
        io.emit("gndubc", "chl chutiye");
        io.to(socketId).emit("getNewQuestion", question);
      });
    });

    // to get the updated score and store and send to creator score of all
    socket.on("updateScore", async (score) => {
      try {
        console.log("scores are", scores);
        console.log("socketRoomMap are->", socketRoomMap);
        scores[socket.id] = score;
        console.log(`Updated score for socket ${socket.id}: ${score}`);

        // Emit live scores only to the creator of the chatroom
        const roomId = socketRoomMap[socket.id];
        const socketsInRoom = Object.keys(socketRoomMap).filter(
          (socketId) => socketRoomMap[socketId] === roomId
        );
        // const scoresInRoom = socketsInRoom.map((socketId) => ({
        //   id: socketId,
        //   score: scores[socketId] || 0,
        // }));
        // console.log("scores in room->",scoresInRoom)
        const room = await Room.findOne({ roomId: roomId });
        const creatorSocketId = room.creatorsocketId;
        const scoresInRoom = room.members.map((member) => ({
          id: member.socketId,
          name: member.name,
          score: scores[member.socketId] || 0,
        }));
        console.log("creator id is->", creatorSocketId);
        const removingCreatorScore = scoresInRoom.filter((scores)=>scores.id!==creatorSocketId)
        removingCreatorScore.sort((a, b) => b.score - a.score);
        console.log(removingCreatorScore)
        if (creatorSocketId) {
          io.to(creatorSocketId).emit("liveScores", removingCreatorScore);
        }
      } catch (error) {
        console.error("Error updating score:", error);
      }
    });

    // to get the curr user length connected in that room whenever someone joins its gets updated automatically
    socket.on("getcurruser", async (roomId) => {
      try {
        const lengthIs = await currMembers(roomId);
        // find the creator of this room
        const room = await Room.findOne({ roomId: roomId });
        const creatorSocketId = room.creatorsocketId;
        io.to(creatorSocketId).emit("currUserCount", lengthIs);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`user disconnected with id ${socket.id}`);
      delete socketRoomMap[socket.id];
      delete scores[socket.id];
      console.log("Updated socketRoomMap:", socketRoomMap);
      console.log("Updated scores:", scores);

      // Emit live scores only to the creator of the chatroom after disconnection
      const roomId = socketRoomMap[socket.id];
      const creatorSocketId = Object.keys(socketRoomMap).find(
        (socketId) => socketRoomMap[socketId] === roomId
      );
      if (creatorSocketId) {
        io.to(creatorSocketId).emit("liveScores", Object.values(scores));
      }
    });
  });
};

module.exports = { initializeSocketEvents };

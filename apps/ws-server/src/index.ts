import { WebSocketServer } from "ws";
import { prisma } from "@repo/prisma";

const server = new WebSocketServer({
  port: 3002,
});

server.on("connection", async (socket) => {
  const user = await prisma.user.create({
    data: {
      username: Math.random().toString(),
      password: Math.random().toString(),
    },
  });
  console.log(user, "USER HERE");
  socket.send("Hi there you are connected to the server");
});

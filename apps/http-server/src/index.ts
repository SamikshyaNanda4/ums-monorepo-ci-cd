import express from "express";
import { prisma } from "@repo/prisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello there",
  });
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });

  res.json({
    message: "Signup Successful. ",
    id: user.id,
  });
});

app.listen(3001, () => {
  console.log("app is listening on port 3001");
});

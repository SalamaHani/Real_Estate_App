import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.DEV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3100", 10);
const app = next({ dev, hostname, port });
const handell = app.getRequestHandler();

app.prepare().then(() => {
  const httpServar = createServer(handell);
  const io = new Server(httpServar);
  io.on("connection", (socket) => {
    console.log(`User Connection ${socket.id}`);
  });
  httpServar.listen(port, () => {
    console.log(`Serever runtig port  on http://${hostname}:${port}`);
  });
});

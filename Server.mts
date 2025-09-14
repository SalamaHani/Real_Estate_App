import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
const app = next({dev,hostname,port})
import PusherServer from "pusher";
import PusherClient from "pusher-js";
export const pusherServesr = new PusherServer({
  appId: process.env.NEXT_PUSHAR_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  secret: process.env.PUSHAR_APP_SECRIT!,
  cluster: "ap2",
  useTLS: true,
});
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  {
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
    cluster: "ap2",
  }
);

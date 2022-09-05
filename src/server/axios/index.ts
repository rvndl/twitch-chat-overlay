import axios from "axios";

const client = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.SECRET_KEY}`,
    "Client-Id": process.env.CLIENT_ID + "",
  },
});

export default client;

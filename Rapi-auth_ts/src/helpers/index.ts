//here we are going to use authentication helpers 
//which are going to help us either to encrypt the passwrd or to create a random token

import crypto from "crypto";

const SECRET = "igrisariseroute@1107";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
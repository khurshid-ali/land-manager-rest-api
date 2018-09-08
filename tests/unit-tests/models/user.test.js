const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const { User } = require("../../../models/user");

describe("user.generateAuthToken", () => {
  it("should return a valid jwt token", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      name: "abc",
      email: "abc"
    };
    const user = new User(payload);

    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    expect(decoded).toMatchObject(payload);
  });
});

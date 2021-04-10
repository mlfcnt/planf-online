const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { Keystone } = require("@keystonejs/keystone");
const { adapterConfig } = require("./db");
const initialiseData = require("../initial-data");
require("dotenv").config();

exports.PROJECT_NAME = "planf-online";

exports.keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
  cookie: {
    secure: process.env.NODE_ENV === "production",
  },
  cookieSecret: process.env.COOKIE_SECRET,
});

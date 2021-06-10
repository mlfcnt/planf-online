const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NextApp } = require("@keystonejs/app-next");
const {
  Text,
  Checkbox,
  Password,
  DateTime,
  CalendarDay,
  Relationship,
} = require("@keystonejs/fields");

const { PROJECT_NAME } = require("./config/general");
const { keystone } = require("./config/general");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = (auth) => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList("User", {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
});

keystone.createList('Booking', {
  fields: {
    who: {
      type: Relationship,
      ref: 'Person',
      many: false,
    },
    startDate: {
      type: CalendarDay,
      isRequired: true,
    },
    comment: {
      type: Text,
    },
    endDate: {
      type: CalendarDay,
      isRequired: true,
    },
    validated: {
      type: Checkbox,
      defaultValue: false,
    },
  },
  // List-level access controls
});

keystone.createList("Family", {
  fields: {
    name: { type: Text, isRequired: true },
    members: {
      type: Relationship,
      ref: "Person",
      many: true,
    },
    color: {
      type: Text,
      isRequired: true,
    },
  },

  // List-level access controls
  access: {
    update: access.userIsAdminOrOwner,
    delete: access.userIsAdmin,
    auth: true,
  },
});

keystone.createList("Person", {
  fields: {
    name: { type: Text, isRequired: true },
    family: {
      type: Relationship,
      ref: "Family",
      many: false,
    },
  },

  // List-level access controls
  access: {
    update: access.userIsAdminOrOwner,
    delete: access.userIsAdmin,
    auth: true,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: { protectIdentities: process.env.NODE_ENV === "production" },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      adminPath: "/admin",
      authStrategy,
    }),
    new NextApp({ dir: "app" }),
  ],
  distDir: "dist",
  configureExpress: (app) => {
    app.set("trust proxy", 1);
  },
};

const userResolvers = {
  Query: {
    user: () => {
      return {
        id: "user",
        username: "user",
        password: "password",
      };
    },
  },
};

module.exports = userResolvers;

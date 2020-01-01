"use strict";
const faker = require("faker");

// 為每一門into market的課程產生discussion posts
let posts = [];
for (let i = 121; i < 241; i += 1) {
  for (let j = 1; j < 3; j += 1) {
    posts.push({
      subject: faker.lorem.sentence(),
      message: faker.lorem.sentence(),
      UserId: j,
      CourseId: i,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("DiscussPosts", posts);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DiscussPosts", null, {});
  }
};

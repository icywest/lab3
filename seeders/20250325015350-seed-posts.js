import { postFactory } from "../factories/postFactory.js";
import User from "../models/User.js";

export async function up(queryInterface) {
  const users = await User.findAll({ attributes: ["id"] });

  const posts = users.flatMap(user =>
    Array.from({ length: 5 }, () => postFactory(user.id))
  );

  await queryInterface.bulkInsert("Posts", posts, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Posts", null, {});
}

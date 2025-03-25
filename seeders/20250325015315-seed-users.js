import { userFactory } from "../factories/userFactory.js";

export async function up(queryInterface) {
  const users = Array.from({ length: 10 }, () => userFactory());
  await queryInterface.bulkInsert("Users", users, {});
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("Users", null, {});
}

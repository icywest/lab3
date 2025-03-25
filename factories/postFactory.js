import { faker } from "@faker-js/faker";

export const postFactory = (userId) => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  userId,
});

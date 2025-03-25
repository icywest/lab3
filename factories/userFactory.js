import { faker } from "@faker-js/faker";

export const userFactory = () => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

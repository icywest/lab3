import { faker } from "@faker-js/faker";

export const sessionFactory = () => ({
  sessionId: faker.datatype.uuid(),
  data: JSON.stringify({ loggedIn: true, lastLogin: faker.date.recent() }),
});

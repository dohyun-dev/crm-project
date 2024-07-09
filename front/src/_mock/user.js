import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.number.int(),
  company: faker.company.name(),
  username: faker.internet.userName(),
  businessRegistrationNumber: faker.number.int(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  accountHolder: faker.person.fullName(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

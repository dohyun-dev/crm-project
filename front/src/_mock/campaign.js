import { format } from 'date-fns';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');

export const campaigns = [...Array(24)].map((_, index) => ({
  id: faker.number.int(),
  state: faker.helpers.arrayElement(['승인요청', '진행중', '종료']),
  memberName: faker.person.firstName(),
  reward: faker.helpers.arrayElement(['플레이스 트래픽', '플레이스 저장하기', '자동완성']),
  keyword: faker.lorem.word(),
  companyName: faker.company.name(),
  url: faker.internet.url(),
  mid: faker.number.int(),
  trafficRequest: faker.number.int(),
  trafficRequestTotal: faker.number.int(),
  period: `${formatDate(faker.date.past())} ~ ${formatDate(faker.date.recent())}`,
  startDate: faker.date.past().toLocaleDateString('en-CA'),
  endDate: faker.date.recent().toLocaleDateString('en-CA'),
}));

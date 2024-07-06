import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage,
});

export const authState = atom({
  key: 'authState',
  default: {
    accessToken: null,
    memberId: null,
    memberName: null,
    role: null,
  },
  effects_UNSTABLE: [persistAtom],
});

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '캠페인 등록',
    path: '/campaign/create',
    icon: icon('ic_campaign'),
  },
  {
    title: '플레이스 트래픽',
    path: '/campaign/placeTraffic',
    icon: icon('ic_place_traffic'),
  },
  {
    title: '플레이스 저장하기',
    path: '/campaign/savePlace',
    icon: icon('ic_save_place'),
  },
  {
    title: '자동완성',
    path: '/campaign/autoComplete',
    icon: icon('ic_autocomplete'),
  },
  {
    title: '고객관리',
    path: '/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;

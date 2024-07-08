import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import API from '../../../apis/api';
import { emptyRows } from '../utils';
import useTable from '../../../hooks/useTable';
import TableEmptyRows from '../table-empty-rows';
import { authState } from '../../../recoil/atoms';
import TableNoData from '../../user/table-no-data';
import CampaignTableRow from '../campaign-table-row';
import UserTableHead from '../../user/user-table-head';
import useTableFilter from '../../../hooks/useTableFilter';
import CampaignExtendModal from '../campaign-extend-modal';
import UserTableToolbar from '../../user/user-table-toolbar';
import CampaignActionToolbar from '../campaign-action-toolbar';
import useSelectTableData from '../../../hooks/useSelectTableData';

// ----------------------------------------------------------------------

const getHeadLabel = (rewardType) => {
  const commonLabels = [
    { id: 'state', label: '상태', align: 'center' },
    { id: 'memberName', label: '회원이름', align: 'center' },
    { id: 'reward', label: '리워드', align: 'center' },
    { id: 'keyword', label: '키워드', align: 'center' },
    { id: 'trafficRequest', label: '유입요청', align: 'center' },
    { id: 'trafficRequestTotal', label: '유입요청(전체)', align: 'center' },
    { id: 'period', label: '기간', align: 'center' },
    { id: 'startDate', label: '시작일시', align: 'center' },
    { id: 'endDate', label: '종료일시', align: 'center' },
    { id: '', label: '', align: 'center' },
  ];

  if (rewardType !== 'autocomplete') {
    return [
      ...commonLabels.slice(0, 4),
      { id: 'companyName', label: '업체명', align: 'center' },
      { id: 'url', label: 'URL', align: 'center' },
      { id: 'mid', label: 'MID', align: 'center' },
      ...commonLabels.slice(4),
    ];
  }

  return commonLabels;
};

export default function CampaignView() {
  const { type } = useParams();

  const headerMap = {
    placeTraffic: '플레이스 트래픽',
    savePlace: '플레이스 저장하기',
    autocomplete: '자동완성',
  };

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    totalElements,
    setPage,
    setTotalElements,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useTable();

  const { selected, handleClickAllTableRow, handleClickTableRow } = useSelectTableData();

  const { filterType, filterValue, handleChangeFilterType, handleChangeFilterValue } =
    useTableFilter(setPage, () => {});

  const [campaigns, setCampaigns] = useState([]);

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [memberInfo, setMemberInfo] = useRecoilState(authState);

  useEffect(() => {
    filterType && filterValue
      ? fetchCampaigns({
          [filterType]: filterValue,
        })
      : fetchCampaigns();
  }, [filterType, filterValue, page, rowsPerPage, order, orderBy]);

  function fetchCampaigns(params = {}) {
    setLoading(true);

    const requestParams = {
      rewardType: type.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase(),
      page,
      size: rowsPerPage,
      sort: `${orderBy},${order}`,
      ...params,
    };

    console.log(requestParams);

    API.CAMPAIGN_API.fetchCampaign(requestParams)
      .then((response) => {
        console.log(response);
        setCampaigns(response.data.content);
        setTotalElements(response.data.totalElements);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }

  const handleClickDelete = (campaignId) => {
    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        API.CAMPAIGN_API.deleteCampaign(campaignId)
          .then(() => {
            Swal.fire({
              title: '성공!',
              text: '캠페인이 삭제되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
            });
            fetchCampaigns();
          })
          .catch((error) => {
            Swal.fire({
              title: '실패!',
              text: error.response.data.description,
              icon: 'error',
              confirmButtonText: '확인',
            });
          });
      }
    });
  };

  // 승인완료
  const changeCampaignState = (campaignState, successMessage) => {
    API.CAMPAIGN_API.changeCampaignState(selected, campaignState)
      .then(() => {
        Swal.fire({
          title: '성공!',
          text: successMessage,
          icon: 'success',
          confirmButtonText: '확인',
        });
        fetchCampaigns();
      })
      .catch((error) => {
        Swal.fire({
          title: '실패!',
          text: error.response.data.description,
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
  };

  // 승인 완료
  const handleClickApprove = () => {
    changeCampaignState('IN_PROGRESS', '캠페인이 승인되었습니다.');
  };

  // 강제 종료
  const handleForcedShutdown = () => {
    changeCampaignState('COMPLETED', '캠페인이 종료되었습니다.');
  };

  const handleClickExtend = () => {
    if (selected.length === 0) return;
    setIsModalOpen(true);
  };

  const handleClickCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickExtendSubmit = (data) => {
    const { extendDays } = data;
    handleClickCloseModal();
    API.CAMPAIGN_API.extend(selected, extendDays)
      .then(() => {
        Swal.fire({
          title: '성공!',
          text: `${extendDays}일 연장되었습니다.`,
          icon: 'success',
          confirmButtonText: '확인',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: '실패!',
          text: error.response.data.description,
          icon: 'error',
          confirmButtonText: '확인',
        });
      });
    fetchCampaigns();
  };

  const handleClickExcelDownload = () => {
    // 더미 데이터 생성 (실제 데이터로 교체 필요)
    const data = campaigns
      .filter((campaign) => selected.includes(campaign.id))
      .map((campaign) => ({
        state: campaign.state,
        memberName: campaign.memberName,
        reward: `${headerMap[type]}`,
        keyword: campaign.keyword,
        companyName: campaign.companyName,
        url: campaign.url,
        trafficRequest: campaign.trafficRequest,
        trafficRequestTotal: campaign.trafficRequestTotal,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
      }));

    const headers = [
      {
        state: '상태',
        memberName: '회원이름',
        reward: `리워드`,
        keyword: '키워드',
        companyName: '업체명',
        url: 'URL',
        trafficRequest: '유입요청',
        trafficRequestTotal: '유입요청(전체)',
        startDate: '시작일시',
        endDate: '종료일시',
      },
    ];

    const combinedData = [...headers, ...data];

    // 워크시트 생성
    const ws = XLSX.utils.json_to_sheet(combinedData, { skipHeader: true });

    // 워크북 생성
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    // 엑셀 파일 생성 및 다운로드
    XLSX.writeFile(wb, `${headerMap[type]} 목록.xlsx`);
  };

  const notFound = !campaigns.length;

  return (
    <Container maxWidth="xl">
      {/* 콘텐츠 헤더 시작 */}
      <Stack direction="column" mb={4}>
        <Typography variant="h7">캠페인 관리</Typography>
        <Typography variant="h4">{headerMap[type]}</Typography>
      </Stack>
      {/* 콘텐츠 헤더 끝 */}
      {/* 콘텐츠 시작 */}
      <Card>
        <UserTableToolbar
          filterType={filterType}
          onFilterTypeChange={handleChangeFilterType}
          filterValue={filterValue}
          onFilterValueChange={handleChangeFilterValue}
          isAdmin={memberInfo.role === 'ADMIN'}
        />

        <Divider />

        <CampaignActionToolbar
          onClickApprove={handleClickApprove}
          onClickShutdown={handleForcedShutdown}
          onClickExtend={handleClickExtend}
          onClickExcelDownload={handleClickExcelDownload}
          isAdmin={memberInfo.role === 'ADMIN'}
        />
      </Card>
      <Card sx={{ mt: 4 }}>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={campaigns.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={(e) => handleClickAllTableRow(e, campaigns)}
                headLabel={getHeadLabel(type)}
              />
              <TableBody>
                {campaigns.map((row) => (
                  <CampaignTableRow
                    key={row.id}
                    id={row.id}
                    state={row.state}
                    memberName={row.memberName}
                    rewardType={row.rewardType}
                    keyword={row.keyword}
                    companyName={row.companyName}
                    url={row.url}
                    mid={row.mid}
                    trafficRequest={row.trafficRequest}
                    trafficRequestTotal={row.trafficRequestTotal}
                    period={row.period}
                    startDate={row.startDate}
                    endDate={row.endDate}
                    selected={selected.indexOf(row.id) !== -1}
                    onClick={(event) => handleClickTableRow(event, row.id)}
                    onClickDelete={() => handleClickDelete(row.id)}
                    isAdmin={memberInfo.role === 'ADMIN'}
                    isAutocomplete={type === 'autocomplete'}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, campaigns.length)}
                />

                {notFound && <TableNoData colSpan={type === 'autocomplete' ? 11 : 14} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={totalElements}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <CampaignExtendModal
          isModalOpen={isModalOpen}
          onClickCloseModal={handleClickCloseModal}
          onSubmit={handleClickExtendSubmit}
        />
      </Card>
    </Container>
  );
}

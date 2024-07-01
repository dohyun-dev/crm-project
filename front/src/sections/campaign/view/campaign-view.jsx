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
import TableNoData from '../../user/table-no-data';
import CampaignTableRow from '../campaign-table-row';
import UserTableHead from '../../user/user-table-head';
import useTableFilter from '../../../hooks/useTableFilter';
import UserTableToolbar from '../../user/user-table-toolbar';
import CampaignActionToolbar from '../campaign-action-toolbar';
import useSelectTableData from '../../../hooks/useSelectTableData';

// ----------------------------------------------------------------------

export default function CampaignView() {
  const { type } = useParams();

  const headerMap = {
    placeTraffic: '플레이스 트래픽',
    savePlace: '플레이스 저장하기',
    autoComplete: '자동완성',
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

  useEffect(() => {
    fetchCampaigns();
  }, [page, rowsPerPage, order, orderBy]);

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
        />

        <Divider />

        <CampaignActionToolbar />
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
                headLabel={[
                  { id: 'state', label: '상태', align: 'center' },
                  { id: 'memberName', label: '회원이름', align: 'center' },
                  { id: 'reward', label: '리워드', align: 'center' },
                  { id: 'keyword', label: '키워드', align: 'center' },
                  { id: 'companyName', label: '업체명', align: 'center' },
                  { id: 'url', label: 'URL', align: 'center' },
                  { id: 'mid', label: 'MID', align: 'center' },
                  { id: 'inflowRequest', label: '유입요청', align: 'center' },
                  { id: 'inflowRequestTotal', label: '유입요청(전체)', align: 'center' },
                  { id: 'period', label: '기간', align: 'center' },
                  { id: 'startDate', label: '시작일시', align: 'center' },
                  { id: 'endDate', label: '종료일시', align: 'center' },
                  { id: '', label: '', align: 'center' },
                ]}
              />
              <TableBody>
                {campaigns.map((row) => (
                  <CampaignTableRow
                    key={row.id}
                    id={row.id}
                    state={row.state}
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
                    handleClick={(event) => handleClickTableRow(event, row.id)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, campaigns.length)}
                />

                {notFound && <TableNoData colSpan={14} />}
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
      </Card>
      {/* 콘텐츠 끝 */}
    </Container>
  );
}

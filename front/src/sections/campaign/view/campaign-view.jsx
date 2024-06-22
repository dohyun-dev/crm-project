import { useState } from 'react';
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

import { users } from 'src/_mock/user';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import CampaignTableHead from '../user-table-head';
import { campaigns } from '../../../_mock/campaign';
import CampaignTableRow from '../campaign-table-row';
import UserTableToolbar from '../user-table-toolbar';
import CampaignActionToolbar from '../campaign-action-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function CampaignView() {
  const { type } = useParams();

  const headerMap = {
    'place-traffic': '플레이스 트래픽',
    'save-place': '플레이스 저장하기',
    autocomplete: '자동완성',
  };

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(campaigns);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: campaigns,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Divider />

        <CampaignActionToolbar />
      </Card>

      <Card sx={{ mt: 4 }}>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <CampaignTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
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
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CampaignTableRow
                      key={row.id}
                      state={row.state}
                      memberName={row.memberName}
                      reward={row.reward}
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
                      handleClick={(event) => handleClick(event, row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
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

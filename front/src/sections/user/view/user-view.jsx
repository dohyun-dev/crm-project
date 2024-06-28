import { useState, useEffect } from 'react';

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
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import UserActionToolbar from '../user-action-toolbar';
import useSelectTableData from '../../../hooks/useSelectTableData';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [members, setMembers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selected, handleClickAllTableRow, handleClickTableRow } = useSelectTableData();

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, order, orderBy]);

  const fetchUsers = (params = {}) => {
    setLoading(true);

    const requestParams = {
      page,
      size: rowsPerPage,
      sort: `${orderBy},${order}`,
      ...params,
    };

    console.log(requestParams);

    API.MEMBER_API.fetchMember(requestParams)
      .then((response) => {
        console.log(response);
        setMembers(response.data.content);
        setTotalElements(response.data.totalElements);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleChangeFilterType = (event) => {
    setPage(0);
    setFilterType(event.target.value);
    setFilterValue('');
    fetchUsers({});
  };

  const handleChangeFilterValue = (event) => {
    if (!filterType) return;
    setFilterValue(event.target.value);

    if (!filterType || !event.target.value) {
      fetchUsers({});
    } else {
      fetchUsers({
        [filterType]: event.target.value,
      });
    }
  };

  const notFound = !members.length;

  return (
    <Container maxWidth="xl">
      {/* 콘텐츠 헤더 시작 */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Typography variant="h4">회원관리</Typography>
      </Stack>
      {/* 콘텐츠 헤더 끝 */}

      {/* 검색 폼 시작 */}
      <Card>
        <UserTableToolbar
          filterType={filterType}
          onFilterTypeChange={handleChangeFilterType}
          filterValue={filterValue}
          onFilterValueChange={handleChangeFilterValue}
        />

        <Divider />

        <UserActionToolbar />
      </Card>
      {/* 검색 폼 끝 */}

      {/* 콘텐츠 시작 */}
      <Card sx={{ mt: 4 }}>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={members.length}
                onRequestSort={handleSort}
                numSelected={selected.length}
                onSelectAllClick={(e) => handleClickAllTableRow(e, members)}
                headLabel={[
                  { id: 'id', label: '회원번호', align: 'center' },
                  { id: 'companyName', label: '업체명', align: 'center' },
                  { id: 'username', label: '아이디', align: 'center' },
                  { id: 'businessRegistrationNumber', label: '사업자등록번호', align: 'center' },
                  { id: 'email', label: '이메일', align: 'center' },
                  { id: 'contact', label: '연락처', align: 'center' },
                  { id: 'accountHolder', label: '예금주', align: 'center' },
                  { id: 'createdAt', label: '생성일시', align: 'center' },
                  { id: 'updatedAt', label: '수정일시', align: 'center' },
                  { id: '', label: '', align: 'center' },
                ]}
              />
              <TableBody>
                {members.map((row) => (
                  <UserTableRow
                    key={row.id}
                    id={row.id}
                    companyName={row.companyName}
                    username={row.username}
                    businessRegistrationNumber={row.businessRegistrationNumber}
                    email={row.email}
                    phone={row.contact}
                    accountHolder={row.accountHolder}
                    createdAt={row.createdAt}
                    updatedAt={row.updatedAt}
                    selected={selected.indexOf(row.id) !== -1}
                    onClick={(event) => handleClickTableRow(event, row.id)}
                  />
                ))}

                <TableEmptyRows emptyRows={emptyRows(page, rowsPerPage, members.length)} />

                {notFound && <TableNoData colSpan={10} />}
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
          rowsPerPageOptions={[1, 5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* 콘텐츠 끝 */}
    </Container>
  );
}

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
import useTable from '../../../hooks/useTable';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import UserActionToolbar from '../user-action-toolbar';
import useTableFilter from '../../../hooks/useTableFilter';
import useSelectTableData from '../../../hooks/useSelectTableData';

// ----------------------------------------------------------------------

export default function UserPage() {
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
    useTableFilter(setPage, fetchUsers);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, order, orderBy]);

  function fetchUsers(params = {}) {
    setLoading(true);

    const requestParams = {
      page,
      size: rowsPerPage,
      sort: `${orderBy},${order}`,
      ...params,
    };

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
  }

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

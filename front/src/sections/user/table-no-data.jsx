import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function TableNoData({ colSpan = 6 }) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={colSpan} sx={{ py: 3, border: 'none' }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            조회 결과 없음!
          </Typography>

          <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

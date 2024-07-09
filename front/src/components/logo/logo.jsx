import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = <Box sx={{ width: 40, height: 40, ...sx }} />;

  if (disabledLink) {
    return logo;
  }

  return (
    <Link
      component={RouterLink}
      href="/"
      sx={{
        height: 88,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'text.primary',
        fontWeight: 600,
        letterSpacing: '1rem',
      }}
    >
      {/* {logo} */}
      포엔
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;

import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Modal, Slider, TextField, FormControl } from '@mui/material';

const CampaignExtendModal = ({ isModalOpen, onClickCloseModal, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      extendDays: 7,
    },
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={onClickCloseModal}
      aria-labelledby="extension-modal-title"
      aria-describedby="extension-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: 24,
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>캠페인 연장</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" mt={4} px={3} gap={1}>
            <Controller
              name="extendDays"
              control={control}
              render={({ field }) => (
                <>
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      id="extension-input"
                      label="연장 일수"
                      type="number"
                      inputProps={{ min: 1, max: 30 }}
                      style={{ marginBottom: '20px' }}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl sx={{ px: 1 }}>
                    <Slider
                      {...field}
                      value={field.value}
                      onChange={(e, value) => field.onChange(value)}
                      aria-labelledby="extension-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      // marks
                      min={7}
                      max={30}
                    />
                  </FormControl>
                </>
              )}
            />
          </Box>
          <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }}>
              연장하기
            </Button>
            <Button onClick={onClickCloseModal} variant="outlined">
              취소
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

CampaignExtendModal.propTypes = {
  isModalOpen: PropTypes.bool,
  onClickCloseModal: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default CampaignExtendModal;

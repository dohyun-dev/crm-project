import { useState } from 'react';

const useTableFilter = (setPage, fetchData) => {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const handleChangeFilterType = (event) => {
    setPage(0);
    setFilterType(event.target.value);
    setFilterValue('');
    fetchData({});
  };

  const handleChangeFilterValue = (event) => {
    if (!filterType) return;
    setFilterValue(event.target.value);

    if (!filterType || !event.target.value) {
      fetchData({});
    } else {
      fetchData({
        [filterType]: event.target.value,
      });
    }
  };

  return {
    filterType,
    filterValue,
    handleChangeFilterType,
    handleChangeFilterValue,
  };
};

export default useTableFilter;

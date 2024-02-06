import {Pagination} from 'antd';


export const CustomPagination = ({total, onPageChange, pageSize, current,}) => {

  const handlePageChange = (page) => {
    onPageChange(page);
  };


  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      showQuickJumper
      showTotal={(total) => `Total ${total} items`}
      onChange={handlePageChange}
    />
  );
};


import { getUserListApi } from '@/server/user';
import { Table, TableColumnProps } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

export default () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUserListApi({
      page: 1,
      pageSize: 20,
    }).then((res) => {
      setUserList(res.data?.list);
    });
  }, []);

  const columns: TableColumnProps[] = [
    {
      dataIndex: 'user_name',
      title: '用户名',
    },
    {
      dataIndex: 'service_name',
      title: '关联的服务',
    },
  ];
  return <Table rowKey="id" columns={columns} data={userList} />;
};

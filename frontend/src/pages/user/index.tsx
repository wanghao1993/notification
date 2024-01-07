import { UserStatus } from '@/enum/userStatus';
import { getUserListApi } from '@/server/user';
import { Table, TableColumnProps, Tag } from '@arco-design/web-react';
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
      dataIndex: 'status',
      title: '状态',
      render(col, item, index) {
        return (
          <Tag
            color={item.status === UserStatus.normal ? 'green' : '#ff8700'}
            size="small"
          >
            {item.status === UserStatus.normal ? '正常' : '禁用'}{' '}
          </Tag>
        );
      },
    },
    {
      dataIndex: 'is_admin',
      title: '管理员',
      render(col, item, index) {
        return item.is_admin ? '是' : '否';
      },
    },
    {
      dataIndex: 'created_time',
      title: '创建时间',
    },
    {
      dataIndex: 'update_time',
      title: '更新时间',
    },
  ];
  return <Table rowKey="user_name" columns={columns} data={userList} />;
};

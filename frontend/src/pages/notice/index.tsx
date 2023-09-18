import React, { useEffect, useState } from 'react';
import { Table, TableColumnProps } from '@arco-design/web-react';
import { getNoticeListApi } from '@/api/modules/notice';

function Notice() {
  const columns: TableColumnProps[] = [
    {
      title: '通知',
      dataIndex: 'title',
    },
    {
      title: '通知类型',
      dataIndex: 'notice_type',
    },
    {
      title: '内容',
      dataIndex: 'content',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
  ];

  const [noticeList, setNoticeList] = useState([]);

  const fetchData = () => {
    getNoticeListApi({
      page: 1,
      pageSize: 50,
    }).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <Table rowKey="id" columns={columns} data={noticeList}></Table>;
}

export default Notice;

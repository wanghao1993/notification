import { getNoticeList } from '@/server/notice';
import { Card, Popconfirm } from '@arco-design/web-react';
import { Table, Button, Tooltip } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import CreateNoticeModal from './components/createNoticeModal';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';
function Home() {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '通知类型',
      dataIndex: 'notice_type',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      title: '操作',
      dataIndex: 'operations',
      render: (_, record) => (
        <div style={{ display: 'flex', cursor: 'pointer', fontSize: '16px' }}>
          <Popconfirm
            focusLock
            title="删除确认"
            content={`确认删除通知吗?`}
            onOk={() => {}}
            onCancel={() => {}}
          >
            <Tooltip content="删除">
              <IconDelete style={{ color: 'red', marginRight: '5px' }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip content="编辑">
            <IconEdit />
          </Tooltip>
        </div>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getNoticeList({
      page: 1,
      pageSize: 50,
    }).then((res) => {
      setDataSource(res.data.list);
    });
  }, []);

  // 新增通知
  const [visible, setVisible] = useState(false);
  return (
    <Card style={{ height: '80vh' }}>
      <div className="mb-2 flex justify-between ">
        <div className="font-bold">通知中心</div>
        <div>
          <Button type="primary" onClick={() => setVisible(true)}>
            + 新增通知
            {visible}
          </Button>
        </div>
      </div>
      <Table rowKey="id" columns={columns} data={dataSource} />

      {visible ? (
        <CreateNoticeModal visible={visible} setVisible={setVisible} id={1} />
      ) : null}
    </Card>
  );
}

export default Home;

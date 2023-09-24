import { getNoticeList } from '@/server/notice';
import { Card } from '@arco-design/web-react';
import { Table, Button } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import CreateNoticeModal from './components/createNoticeModal';
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
        <CreateNoticeModal visible={visible} setVisible={setVisible} />
      ) : null}
    </Card>
  );
}

export default Home;

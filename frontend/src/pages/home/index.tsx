import { deleteNoticeDetailById, getNoticeList } from '@/server/notice';
import { Card, Modal, Popconfirm } from '@arco-design/web-react';
import { Table, Button, Tooltip } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import CreateNoticeModal from './components/createNoticeModal';
import { IconDelete, IconEdit, IconSend } from '@arco-design/web-react/icon';
import { NoticeItem } from '@/server/notice.modal';
function Home() {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '通知类型',
      dataIndex: 'notice_type_zh',
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
            onOk={() => deleteNotice(record.id)}
            onCancel={() => {}}
          >
            <Tooltip content="删除">
              <IconDelete style={{ color: 'red', marginRight: '10px' }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip content="编辑">
            <IconEdit onClick={() => editNotice(record.id)} />
          </Tooltip>

          <Popconfirm
            focusLock
            title="发送确认"
            content={`确认发送通知吗? 发送后所有用户将会收到通知。`}
            onOk={() => sendNotice(record.id)}
            onCancel={() => {}}
          >
            <Tooltip content="发送">
              <IconSend style={{ marginLeft: '10px' }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip content="测试">
            <IconEdit onClick={() => preview(record)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getNoticeList({
      page: 1,
      pageSize: 50,
    }).then((res) => {
      setDataSource(res.data.list);
    });
  };

  // 新增通知
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      getList();
    }
  }, [visible]);

  // 删除通知
  const deleteNotice = (id: number) => {
    deleteNoticeDetailById(id).then((res) => {
      getList();
    });
  };

  // 编辑/新增通知
  const [noticeId, setNoticeId] = useState<number>();

  const editNotice = (id?: number) => {
    setNoticeId(id);
    setVisible(true);
  };

  // 发送通知
  const sendNotice = (id: number) => {
    console.log(id, '发送通知');
  };

  // 预览

  const config = {
    title: '22',
    content: 'xxx',
  };
  const [modal] = Modal.useModal();

  const preview = (notice: NoticeItem) => {
    if (notice.notice_type === 'notification') {
    } else if (notice.notice_type === 'loop_run') {
    } else if (notice.notice_type === 'modal') {
      console.log(notice.content);
      modal.confirm({
        title: notice.title,
        content: 111,
      });
    }
  };
  return (
    <Card style={{ height: '80vh' }}>
      <div className="mb-2 flex justify-between ">
        <div className="font-bold">通知中心</div>
        <div>
          <Button type="primary" onClick={() => editNotice(null)}>
            + 新增通知
            {visible}
          </Button>
        </div>
      </div>
      <Table rowKey="id" columns={columns} data={dataSource} />

      {visible ? (
        <CreateNoticeModal
          visible={visible}
          setVisible={setVisible}
          id={noticeId}
        />
      ) : null}
    </Card>
  );
}

export default Home;

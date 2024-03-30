import {
  deleteNoticeDetailById,
  getNoticeList,
  recoverNoticeApi,
  revokeNoticeApi,
  sendNoticeApi,
} from '@/server/notice';
import { Card, Modal, Popconfirm, Tag } from '@arco-design/web-react';
import { Table, Button, Tooltip } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import CreateNoticeModal from './components/createNoticeModal';
import {
  IconDelete,
  IconEdit,
  IconSend,
  IconPlayCircle,
  IconClockCircle,
  IconCheckCircle,
  IconUndo,
  IconRefresh,
} from '@arco-design/web-react/icon';
import React from 'react';
import { NoticeType } from './../../types/notice.type';
import './style/index.css';
function Home() {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      fixed: 'left',
    },
    {
      title: '通知类型',
      dataIndex: 'notice_type_zh',
    },
    {
      title: '通知状态',
      dataIndex: 'notice_status_text',
      render: (_, record) => {
        const IconList = {
          0: {
            icon: <IconClockCircle />,
            color: 'gray',
          },
          1: {
            icon: <IconCheckCircle />,
            color: 'green',
          },
          2: {
            icon: <IconUndo />,
            color: 'orangered',
          },
        };
        return (
          <Tag color={IconList[record.notice_status].color} size="small">
            {IconList[record.notice_status].icon} {record.notice_status_text}
          </Tag>
        );
      },
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
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 20%)',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          <Popconfirm
            focusLock
            title="删除确认"
            content={`确认删除通知吗?`}
            onOk={() => deleteNotice(record.id)}
          >
            <Tooltip content="删除">
              <IconDelete style={{ color: 'red' }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip content="编辑">
            <IconEdit onClick={() => editNotice(record.id)} />
          </Tooltip>

          {record.notice_status === 0 ? (
            <Popconfirm
              focusLock
              title="发送确认"
              content={`确认发送通知吗? 发送后所有用户将会收到通知。`}
              onOk={() => sendNotice(record.id)}
            >
              <Tooltip content="发送">
                <IconSend />
              </Tooltip>
            </Popconfirm>
          ) : null}
          <Tooltip content="测试">
            <IconPlayCircle onClick={() => preview(record)} />
          </Tooltip>

          {record.notice_status < 2 ? (
            <Popconfirm
              focusLock
              title="撤销确认"
              content={`确认撤销此通知吗? 撤销后此通知将无法发送，已发送的将无法查看。`}
              onOk={() => revokeNotice(record.id)}
            >
              <Tooltip content="撤销">
                <IconUndo />
              </Tooltip>
            </Popconfirm>
          ) : null}

          {record.notice_status === 2 ? (
            <Popconfirm
              focusLock
              title="恢复确认"
              content={`确认恢复此通知吗? `}
              onOk={() => recoverNotice(record.id)}
            >
              <Tooltip content="恢复">
                <IconRefresh />
              </Tooltip>
            </Popconfirm>
          ) : null}
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
    deleteNoticeDetailById(id).then(() => {
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
    sendNoticeApi(id).then(() => {
      getList();
    });
  };

  // 撤销通知
  const revokeNotice = (id: number) => {
    revokeNoticeApi(id).then(() => {
      getList();
    });
  };

  // 恢复
  const recoverNotice = (id: number) => {
    recoverNoticeApi(id).then(() => {
      getList();
    });
  };
  // 预览

  const [modal] = Modal.useModal();

  const preview = (notice: NoticeType.NoticeItem) => {
    if (notice.notice_type === '1') {
      const fr = document.createDocumentFragment();
      const div = document.createElement('div');
      div.setAttribute('class', 'marquee');
      const txtdiv = document.createElement('span');
      txtdiv.setAttribute('class', 'marquee-text');
      txtdiv.innerHTML = notice.content;

      div.appendChild(txtdiv);
      fr.appendChild(div);
      document.body.appendChild(fr);
    } else if (notice.notice_type === '3') {
    } else if (notice.notice_type === '2') {
      modal.confirm({
        title: notice.title,
        content: 111,
      });
    }
  };
  return (
    <Card style={{ height: '80vh' }}>
      <div className="mb-2 flex justify-between ">
        <div className="font-bold"></div>
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

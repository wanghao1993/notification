import { getServiceList } from '@/server/service';
import {
  Button,
  Card,
  Popconfirm,
  Table,
  Tooltip,
} from '@arco-design/web-react';
import { ColumnProps } from '@arco-design/web-react/es/Table';
import { useEffect, useState } from 'react';
import { UseServiceUtils } from './utils';
import { IconDelete, IconEdit } from '@arco-design/web-react/icon';

export default function ServiceList() {
  const columns: ColumnProps[] = [
    {
      key: 'service_name',
      dataIndex: 'service_name',
      title: '服务名',
    },
    {
      key: 'administrator',
      dataIndex: 'administrator',
      title: '管理员',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },

    {
      title: '操作',
      dataIndex: 'operations',
      key: 'operations',
      render: (_, record) => (
        <div style={{ display: 'flex', cursor: 'pointer', fontSize: '16px' }}>
          <Popconfirm
            focusLock
            title="删除确认"
            content={`确认删除通知吗?`}
            onOk={() => deleteService(record.service_name)}
            onCancel={() => {}}
          >
            <Tooltip content="删除">
              <IconDelete style={{ color: 'red', marginRight: '10px' }} />
            </Tooltip>
          </Popconfirm>

          <Tooltip content="编辑">
            <IconEdit onClick={() => addService(record.service_name)} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const getList = () => {
    getServiceList().then((res) => {
      setDataSource(res.data.list);
    });
  };

  const [create, deleteService] = UseServiceUtils({
    closeCallBack: () => getList(),
  });

  const addService = (service_name?: string) => {
    create(service_name);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Card style={{ height: '80vh' }}>
      <div className="mb-2 flex justify-between ">
        <div className="font-bold"></div>
        <div>
          <Button type="primary" onClick={() => addService()}>
            + 新增服务
          </Button>
        </div>
      </div>
      <Table rowKey="service_name" columns={columns} data={dataSource} />
    </Card>
  );
}

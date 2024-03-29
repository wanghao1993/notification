import {
  Button,
  Form,
  FormInstance,
  Input,
  Message,
  Modal,
  Select,
} from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import { serviceStatus } from './constant';
import {
  createService,
  deleteServiceApi,
  getServiceById,
  updateService,
} from '@/server/service';
import React from 'react';
import { getUserListApi } from '@/server/user';
export function UseServiceUtils(data?: { closeCallBack: () => void }) {
  let serviceId = 0;
  const formRef = useRef<FormInstance>();
  const FormItem = Form.Item;

  const [userList, setUserList] = useState([]);

  const getUserList = () => {
    getUserListApi({
      page: 1,
      pageSize: 10000,
    }).then((res) => {
      setUserList(
        res.data.list.map((item) => ({
          label: item.user_name,
          value: item.user_name,
        }))
      );
    });
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleConfirm = async () => {
    try {
      const values = await formRef.current.validate();
      const api = serviceId ? updateService : createService;
      api({
        service_id: serviceId,
        service_name: values.service_name,
        service_status: values.service_status,
        administrator: values.administrator.join(','),
      }).then((res) => {
        if (res.code === 200) {
          const msg = serviceId
            ? `服务[${values.service_name}]编辑成功`
            : `服务[${values.service_name}]添加成功`;
          Message.success(msg);
          Modal.destroyAll();
          data?.closeCallBack();
        } else {
          Message.error(res.message);
        }
      });
    } catch (e) {
      Message.error('校验失败');
    }
  };

  const FormContent = (
    <div>
      <Form
        ref={formRef}
        initialValues={{
          service_status: serviceStatus.normal,
          administrator: [],
        }}
      >
        <FormItem
          field="service_name"
          label="服务名"
          rules={[
            {
              match: /[a-zA-Z0-9_-]+/,
              required: true,
              message: '服务名为a-zA-Z0-9_-组成，且长度不超过200',
              maxLength: 200,
            },
          ]}
        >
          <Input placeholder="请输入服务名"></Input>
        </FormItem>

        <FormItem
          field="service_status"
          label="服务状态"
          rules={[
            {
              type: 'number',
              required: true,
              message: '服务状态',
            },
          ]}
        >
          <Select
            defaultValue={serviceStatus.normal}
            placeholder="请选择服务状态"
            options={serviceStatus.options}
          />
        </FormItem>

        <FormItem
          field="administrator"
          label="管理员"
          help="管理员可以管理本服务下的通知；可不填，默认为创建人"
        >
          <Select
            defaultValue={serviceStatus.normal}
            mode="multiple"
            placeholder="请选择管理员"
            options={userList}
          />
        </FormItem>

        <FormItem wrapperCol={{ offset: 5 }}>
          <Button
            type="primary"
            onClick={() => handleConfirm()}
            style={{ marginRight: 24 }}
          >
            提交
          </Button>
          <Button
            style={{ marginRight: 24 }}
            onClick={() => {
              formRef.current.resetFields();
            }}
          >
            重置
          </Button>
        </FormItem>
      </Form>
    </div>
  );

  // 创建和编辑服务
  function create(service_id?: number) {
    serviceId = service_id;
    Modal.confirm({
      title: service_id ? '编辑服务' : '创建服务',
      footer: null,
      content: FormContent,
      style: { width: '600px' },
    });

    if (service_id) {
      getServiceById(service_id).then((res) => {
        if (res.data) {
          formRef.current.setFieldsValue({
            service_name: res.data?.service_name,
            service_status: res.data?.service_status,
            administrator: res.data?.administrator?.split(',') || [],
          });
        }
      });
    }
  }

  // 删除服务
  function deleteService(service_name: string) {
    deleteServiceApi(service_name).then(() => {
      Message.success('删除成功');
      data?.closeCallBack();
    });
  }

  return [create, deleteService];
}

import {
  createNoticeApi,
  getNoticeDetailById,
  getNoticeTypeList,
  modifyNoticeApi,
} from '@/server/notice';
import {
  Modal,
  Form,
  Input,
  Select,
  Message,
  FormInstance,
} from '@arco-design/web-react';
import { useEffect, useRef, useState } from 'react';
import Markdown from '@/components/Markdown';
import { getServiceList } from '@/server/service';
import { serviceStatus } from '@/pages/service/constant';
import { useSelector } from 'react-redux';
import React from 'react';
import { GlobalState } from '@/store';
const FormItem = Form.Item;
export default function NoticeModal(props: {
  visible: boolean;
  id?: number;
  setVisible: (boolean) => void;
}) {
  const [title, setTitle] = useState('新增通知');

  const userInfo = useSelector((state: GlobalState) => state.userInfo);

  const formRef = useRef<FormInstance>();

  // 获取通知详情
  const getNoticeById = () => {
    getNoticeDetailById(props.id).then((res) => {
      formRef.current.setFieldsValue({
        ...res.data,
      });

      setValue({
        text: res.data.content,
      });
    });
  };

  // 创建或者更新通知
  const confirmHandler = async () => {
    const valus = await formRef.current?.validate();

    const params = {
      ...valus,
      id: props.id,
    };
    if (props.id) {
      await modifyNoticeApi(params);
    } else {
      await createNoticeApi(params);
    }
    Message.success('success');

    props.setVisible(false);
  };

  const [markdownValue, setValue] = useState<{ text: string }>({
    text: '',
  });

  const handleEditorChange = ({ text }) => {
    setValue({
      text,
    });
    formRef.current.setFieldsValue({
      content: text,
    });
  };
  useEffect(() => {
    if (props.id) {
      getNoticeById();
      setTitle('更新通知');
    } else {
      setTitle('新增通知');
    }
  }, [props.id]);

  const [noticeTypeList, setnoticeTypeList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    // 获取通知类型
    getNoticeTypeList().then((res) => {
      setnoticeTypeList(
        res.data.list.map((item) => ({
          label: item.notice_type_label,
          value: item.notice_type,
        }))
      );
    });
    // 获取服务列表
    getServiceList().then((res) => {
      setServiceList(
        res.data.list
          .filter((item) => item.service_status === serviceStatus.normal)
          .map((item) => ({
            label: item.service_name,
            value: item.service_id,
          }))
      );
    });
  }, []);

  return (
    <div>
      <Modal
        style={{ width: 1200 }}
        title={title}
        visible={props.visible}
        autoFocus={false}
        onCancel={() => props.setVisible(false)}
        onOk={() => confirmHandler()}
        focusLock={true}
      >
        <div>
          <Form
            wrapperCol={{ span: 20 }}
            labelCol={{ span: 4 }}
            initialValues={{
              notice_type: '1',
            }}
            ref={formRef}
            scrollToFirstError
          >
            <FormItem
              label="通知标题"
              field="title"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入通知标题" />
            </FormItem>
            <FormItem
              label="服务"
              field="service_id"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择服务"
                options={serviceList}
                showSearch
                mode="multiple"
                allowClear
              />
            </FormItem>
            <FormItem
              label="通知类型"
              field="notice_type"
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择通知类型" options={noticeTypeList} />
            </FormItem>

            <FormItem
              noStyle
              shouldUpdate={(prev, next) =>
                prev.notice_type !== next.notice_type
              }
            >
              {(values) => {
                return values.notice_type === 'loop_run' ? (
                  <FormItem
                    label="通知内容"
                    field="content"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      placeholder="请选择通知内容"
                      maxLength={200}
                      showWordLimit
                      spellCheck
                    />
                  </FormItem>
                ) : (
                  <FormItem
                    label="通知内容"
                    field="content"
                    rules={[{ required: true }]}
                  >
                    <Markdown
                      style={{ height: '500px' }}
                      defaultValue={markdownValue.text}
                      handleEditorChange={handleEditorChange}
                    ></Markdown>
                  </FormItem>
                );
              }}
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

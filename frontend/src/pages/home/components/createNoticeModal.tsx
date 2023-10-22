import {
  createNoticeApi,
  getNoticeDetailById,
  getNoticeTypeList,
  modifyNoticeApi,
} from '@/server/notice';
import { Modal, Form, Input, Select, Message } from '@arco-design/web-react';
import React, { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getServiceList } from '@/server/service';
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
const FormItem = Form.Item;
export default function NoticeModal(props: {
  visible: boolean;
  id?: number;
  setVisible: (boolean) => void;
}) {
  const [title, setTitle] = useState('新增通知');

  const formRef = useRef();

  // 获取通知详情
  const getNoticeById = () => {
    getNoticeDetailById(props.id).then((res) => {
      formRef.current.setFieldsValue({
        ...res.data,
      });
    });
  };

  // 创建或者更新通知
  const confirmHandler = async () => {
    const valus = await formRef.current?.validate();
    if (props.id) {
      await modifyNoticeApi({
        ...valus,
        creator: 'isaac.wang1',
        id: props.id,
      });
    } else {
      await createNoticeApi({
        ...valus,
        creator: 'isaac.wang1',
      });
    }
    Message.success('success');

    props.setVisible(false);
  };

  const handleEditorChange = ({ html, text }) => {};
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
        res.data.list.map((item) => ({
          label: item.service_name,
          value: item.service_name,
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
              notice_type: 'notification',
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
              field="service_name"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择服务"
                options={serviceList}
                showSearch
                mode="multiple"
                allowClear
                allowCreate={{
                  formatter: (inputValue, creating) => {
                    return {
                      value: inputValue,
                      label: `${
                        creating ? '回车创建: ' : '已创建: '
                      }${inputValue}`,
                    };
                  },
                }}
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
                    <MdEditor
                      style={{ height: '500px' }}
                      renderHTML={(text) => mdParser.render(text)}
                      onChange={handleEditorChange}
                    />
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

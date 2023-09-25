import { getNoticeDetailById, getNoticeTypeList } from '@/server/notice';
import { Modal, Form, Input, Select } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from '@uiw/react-md-editor';

const FormItem = Form.Item;
export default function NoticeModal(props: {
  visible: boolean;
  id?: number;
  setVisible: (boolean) => void;
}) {
  const [title, setTitle] = useState('新增通知');

  const [noticeDetail, setNoticeDetail] = useState({
    notice_type: '',
    content: '',
    title: '',
  });

  const getNoticeById = () => {
    getNoticeDetailById(1);
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

  useEffect(() => {
    getNoticeTypeList().then((res) => {
      setnoticeTypeList(
        res.data.list.map((item) => ({
          label: item.notice_type_label,
          value: item.notice_type,
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
        focusLock={true}
      >
        <div>
          <Form
            wrapperCol={{ span: 20 }}
            labelCol={{ span: 4 }}
            initialValues={{
              title: '',
              notice_type: 'notifacation',
              content: '',
            }}
          >
            <FormItem
              label="通知标题"
              field="title"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入通知标题" />
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
                    <ReactMarkdown onError={(val) => val.toString()} value="" />
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

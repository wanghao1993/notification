import { Modal } from '@arco-design/web-react';
import React, { useEffect, useState } from 'react';

export default function NoticeModal(props: {
  visible: boolean;
  id?: number;
  setVisible: (boolean) => void;
}) {
  const [title, setTitle] = useState('新增通知');

  useEffect(() => {
    if (props.id) {
      setTitle('更新通知');
    } else {
      setTitle('新增通知');
    }
  }, [props.id]);
  return (
    <div>
      <Modal
        title={title}
        visible={props.visible}
        autoFocus={false}
        onCancel={() => props.setVisible(false)}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal
          will be closed immediately once you press the OK button.
        </p>
      </Modal>
    </div>
  );
}

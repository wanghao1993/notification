interface NoticeOptions {
  ApiBaseUrl: string;
  noticeSystem: string;
  looprunConfig?: {
    el: HTMLElement; // 跑马灯的容器
    speed: number; // 每秒移动的距离
    outerclass: string; // el的class
  };
}

class Notice {
  private options: NoticeOptions;
  constructor(options: NoticeOptions) {
    this.options = options;

    this.init();
  }

  init = () => {};

  getNotice = () => {};

  // 处理不同通知

  // 跑马灯
  handlerLoopRunNotice = () => {};

  // 模态框
  handlerModalNotice = () => {};

  // 侧边通知
  handlerNotifyNotice = () => {};
}

export default Notice;

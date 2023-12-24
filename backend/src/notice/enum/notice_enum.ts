export enum NoticeStatus {
  no_release = 0, // 未发送
  released = 1, // 已发送
  revoke = 2, // 撤回
}

export const NoticeStatusText = {
  no_release: '未发送',
  released: '已发送',
  revoke: '撤回',
  toString: (code: NoticeStatus) => {
    switch (code) {
      case NoticeStatus.no_release:
        return NoticeStatusText.no_release;

      case NoticeStatus.released:
        return NoticeStatusText.released;

      case NoticeStatus.revoke:
        return NoticeStatusText.revoke;
      default:
        break;
    }
  },
};

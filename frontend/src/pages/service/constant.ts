export const serviceStatus = {
  toString(status: number) {
    return (
      serviceStatus.options.find((item) => item.value === status)?.label || '-'
    );
  },
  normal: 1,
  forbidden: 2,
  options: [
    {
      label: '启用',
      value: 1,
    },
    {
      label: '禁用',
      value: 2,
    },
  ],
};

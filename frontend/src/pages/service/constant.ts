export const service = {
  toString(status: number) {
    return service.options.find((item) => item.value === status)?.label || '-';
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

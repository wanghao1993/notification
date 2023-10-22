export interface CreateServiceData {
  service_name: string;
  service_status: number;
  administrator: string;
}

export interface ServiceItem extends CreateServiceData {
  create_time: string;
  update_time: string;
}

export interface CreateServiceData {
  service_id: number;
  service_status: number;
  administrator: string;
}

export interface ServiceItem extends CreateServiceData {
  service_name: string;
  create_time: string;
  update_time: string;
}

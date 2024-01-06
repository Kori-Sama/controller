export interface DeviceType {
    id: string;
    status: string;
    userdata_driver: string;
    userdata_area: string;
    lba_size: string;
    data_lba_size: string;
    data_number: number;
    sys_index: number;
    system_list: { [key: string]: number[] };
    belong_groups: string[],
}

export interface DeviceProp {
  device:DeviceType
}
export interface DeviceType {
  code: string;
  status: boolean;
  group: string | null;
  key: string;
  label: string;
}

export interface DeviceProp {
  device:DeviceType
}
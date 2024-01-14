import { Badge, Flex } from "antd"
import { DeviceProp } from "../../types/Device"
import { observer } from "mobx-react"
import KEYS from "../../types/SocketAPI"

const DataShow = ({ device }: DeviceProp) => {
  const {
    id,
    status,
    userdata_driver,
    userdata_area,
    lba_size,
    data_lba_size,
    data_number,
    sys_index,
    automatic_status
  } = device

  const byte_size = Number.parseInt(data_lba_size) * Number.parseInt(lba_size)
  const IEEE_size = bytesToIeee(Number.parseInt(data_lba_size),Number.parseInt(lba_size))

  return (
    <Flex gap={20} justify="flex-start" align="center">
      <div>{id}</div>
      <div>驱动器: {userdata_driver}</div>
      <div>区域: {userdata_area.slice(1,userdata_area.length-1)}</div>
      <div>系统编号: {sys_index}</div>
      <div>LBA_SIZE: {lba_size}</div>
      <Flex vertical={true}>
        数据大小:
        <div>byte: {byte_size.toString()}</div>
        <div>IEEE: {IEEE_size}</div>
      </Flex>
      <div>数据index: {data_number}</div>
      <div>周期指令:{automatic_status}</div>
      <div>状态: {status}</div>
      <Badge status={status === KEYS.STATUS_ONLINE ? "success" : "error"} />

    </Flex>
  )
}

export default observer(DataShow)

function bytesToIeee(size: number, sectorSize: number): string {
   let sizeInIeee: number;
   let previousIeee: number;
   let decimalIeee: number;
   let index: number = 0;
   let units: string;
   const prefixes: string = " KMGTPEZ";
   const theValue: Array<string | number> = [];

   sizeInIeee = previousIeee = size * sectorSize;
   while ((sizeInIeee > 1024) && (index < (prefixes.length - 1))) {
      index++;
      previousIeee = sizeInIeee;
      sizeInIeee /= 1024;
   }

   if (prefixes[index] === ' ') {
      theValue.push(sizeInIeee, "bytes");
   } else {
      units = "  iB";
      units = units.replace(units[1], prefixes[index]);
      decimalIeee = ((previousIeee - (sizeInIeee * 1024) + 51.2) / 102.4);
      if (decimalIeee >= 10.0) {
         decimalIeee = 0.0;
         sizeInIeee++;
      }
      theValue.push(sizeInIeee.toFixed(), ".", decimalIeee.toFixed(0), units);
   }

   return theValue.join('');
}
import { Badge, Descriptions, DescriptionsProps } from "antd";
import { DeviceProp, } from "../../types/Device";

const DataShow = ({device}: DeviceProp) => {
  const { label, code, status,group } = device;
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "状态",
      children: (
        <Badge
          status={status ? "success" : "error"}
          text={status ? "运行" : "离线"}
        />
      ),
    },{
      key:"2",
      label:"所在组",
      children:<p>{group}</p>
    }
  ];
  return (
    <>
      <Descriptions title="设备信息" bordered items={items} size="small" style={{margin:12}}/>
    </>
  );
};

export default DataShow;

import Layout from "../pages/Layout";
import groupsStore from "../store/groups";
import DeviceGroup from "../components/DeviceGroup";
import { RouteObject, useRoutes } from "react-router-dom";
import { observer } from "mobx-react";
import Devices from "../pages/Devices";
import Groups from "../pages/Groups";
import Login from "../pages/Login";
import Register from "../pages/Register";

// // 自定义懒加载函数
// const lazyLoad = (factory: () => Promise<any>) => {
//   const Module = lazy(factory);
//   return (
//     <Suspense fallback={<></>}>
//       <Module />
//     </Suspense>
//   );
// };
export interface IRouteObject {
  children?: IRouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
}

export const Routes: IRouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/devices",
        element: <Devices />,
      },
      {
        path: "/groups",
        element: <Groups />,
        children: [],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    // element: <NotFound />,
  },
];

const Router: React.FC = () => {
  groupsStore.groups.forEach((devices, key) => {
    Routes.at(0)
      ?.children?.at(1)
      ?.children?.push({
        path: "/groups/" + key,
        element: <DeviceGroup devices={devices} />,
      });
    // console.log("Root", Routes.at(0));
    // console.log("children:", Routes.at(0)?.children?.at(1)?.children);
  });

  return useRoutes(Routes as RouteObject[]);
};
export default observer(Router);

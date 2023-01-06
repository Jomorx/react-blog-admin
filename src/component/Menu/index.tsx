import router from "@/router/routes";
import { RouteItem } from "@/router/types";
import { Menu } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
type IProps={
  collapsed:boolean
}
const index:React.FC<IProps>=({collapsed})=> {
  const navigate = useNavigate();
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string[]>([
    "/" + location.pathname.split("/")[1],
  ]);
  useEffect(() => {
    if (collapsed) {
      setOpenKey([]);
    } else {
      setOpenKey(["/" + location.pathname.split("/")[1]]);
    }
  }, [collapsed]);
  const generate = (route: any) => {
    return route.children!.map((r: RouteItem) => {
      if (r.children) {
        return (
          <SubMenu
            icon={r.icon}
            key={r.key}
            title={r.label}
            onTitleClick={(e) => {
              if (openKey[0] === r.key) {
                setOpenKey([])
              } else {
                setOpenKey([r.key!]);
              }
            }}
          >
            {r.children && generate(r)}
          </SubMenu>
        );
      } else if (r.label !== undefined) {
        return (
          <MenuItem
            icon={r.icon}
            key={r.key}
            title={r.label}
            onClick={(e) => {
              navigate(r.key!);
              if(collapsed) setOpenKey([])
            }}
          >
            {r.label}
          </MenuItem>
        );
      }
    });
  };
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        defaultOpenKeys={["/" + location.pathname.split("/")[1]]}
        selectedKeys={[location.pathname]}
        openKeys={openKey}
      >
        {generate(router[0])}
      </Menu>
    </>
  );
}

export default index;

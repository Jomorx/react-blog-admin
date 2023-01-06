import  route  from "@/router/routes";
import { RouteItem } from "@/router/types";
import { Breadcrumb } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import React, { Fragment, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from './index.module.less'
function index() {
  const location = useLocation();
  const navigate = useNavigate()
  const generate = (route: RouteItem[]): ReactNode => {
    return (
      <>
        {route.map((r: RouteItem) => { 
          if (location.pathname.indexOf(r.key!)!==-1) {
            return (
              <Fragment key={r.key}>
                <BreadcrumbItem className={style.breadCrumbItem} key={r.key!} onClick={e=>{
                  navigate(r.key!)
                }}>{r.label}</BreadcrumbItem>
                {r.children ? generate(r.children) : null}
              </Fragment>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  };
  return (
    <>
      <Breadcrumb  separator={">"} style={{marginLeft:'20px'}}>{generate(route[0].children!)}</Breadcrumb>
    </>
  );
}

export default index;

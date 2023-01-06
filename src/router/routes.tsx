
import { lazy } from "react";
const  Layout = lazy(()=>import("@/layouts/ManageLayout"))
const Console=lazy(()=>import("@/pages/Console")) ;

const CategoryManage=lazy(()=>import("@/pages/Article/CategoryManage"))
const TagManage =lazy(()=>import("@/pages/Article/TagManage")) ;
const ArticlePublish =lazy(()=>import( "@/pages/Article/ArticlePublish"));
const ArticleList = lazy(()=>import("@/pages/Article/ArticleList")) ;
const ProjectPublish = lazy(()=>import('@/pages/Project/ProjectPublish'))
const ProjectList = lazy(()=>import('@/pages/Project/ProjectList'))

const Links =lazy(()=>import("@/pages/Links"));
const NotFound=lazy(()=>import( "@/pages/404")) ;
const Login = lazy(()=>import("@/pages/Login")) ;
const Config = lazy(()=>import("@/pages/Config")) ;


import { FileTextOutlined, GlobalOutlined } from "@ant-design/icons";
import { RouteItem } from "./types";
import Log from "@/pages/Log";


const router: RouteItem[] = [
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Console />,
        path: "/",
        key: "/",
        icon: <GlobalOutlined />,
        label: "控制台",
      },
      {
        path: "/article",
        icon: <FileTextOutlined />,
        label: "文章管理",
        key: "/article",
        children: [
          {
            path: "article-list",
            element: <ArticleList />,
            key: "/article/article-publish",
            icon: <FileTextOutlined />,
            label: "发布文章",
          },
          {
            path: "article-publish",
            element: <ArticlePublish />,
            key: "/article/article-list",
            icon: <FileTextOutlined />,
            label: "文章列表",
          },
          {
            path: "article-publish/:id",
            element: <ArticlePublish />,
          },
          {
            path: "tag-manage",
            element: <TagManage />,
            key: "/article/tag-manage",
            icon: <FileTextOutlined />,
            label: "标签管理",
          },
          {
            path: "category-manage",
            element: <CategoryManage />,
            key: "/article/category-manage",
            icon: <FileTextOutlined />,
            label: "分类管理",
          },
        ],
      },
      {
        path: "/project",
        icon: <FileTextOutlined />,
        label: "作品管理",
        key: "/project",
        children: [
          {
            path: "project-publish",
            element: <ProjectPublish />,
            key: "/project/project-publish",
            icon: <FileTextOutlined />,
            label: "发布作品",
          },
          {
            path: "project-list",
            element: <ProjectList />,
            key: "/project/project-list",
            icon: <FileTextOutlined />,
            label: "作品列表",
          },
          {
            path: "project-publish/:id",
            element: <ProjectPublish />,
          },
        ],
      },
      {
        element: <Links/>,
        path: "/links",
        key: "/links",
        icon: <GlobalOutlined />,
        label: "友链",
      },
      {
        element: <Log/>,
        path: "/log",
        key: "/log",
        icon: <GlobalOutlined />,
        label: "网站日志",
      },
      {
        element: <Config/>,
        path: "/config/:id",
        key: "/config/1",
        icon: <GlobalOutlined />,
        label: "网站设置",
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
export default router;

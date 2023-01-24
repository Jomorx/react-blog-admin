import { IProject } from "@/api/project"
import OperationButton from "@/component/OperationButton"
import { ITableConfig } from "@/hooks/useTable/types"
import { formatTime } from "@/utils"
import React from "react"

const ProjectTableConfig: ITableConfig<IProject> = ({
  editClick,
  batchDelete
}) => {
  return [
    {
      title: "项目图片",
      dataIndex: "projectCover",
      render: (text: string) => (
        <img src={text} style={{ width: "50px", height: "50px" }} />
      )
    },
    {
      title: "项目名称",
      dataIndex: "projectName"
    },
    {
      title: "项目链接",
      dataIndex: "projectLink"
    },

    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (time: Date) => <span>{formatTime(time)}</span>
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (text, record) => {
        return (
          <>
            <OperationButton
              clickEdit={() => {
                editClick(record)
              }}
              clickDelete={() => {
                batchDelete([record.projectId])
              }}
            />
          </>
        )
      },
      width: "250px"
    }
  ]
}
export default ProjectTableConfig

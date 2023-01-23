import { ILog } from "@/api/log"
import OperationButton from "@/component/OperationButton"
import { ITableConfig } from "@/hooks/useTable/types"
import { formatTime } from "@/utils"
import React from "react"
const LogTableConfig: ITableConfig<ILog> = ({ editClick, batchDelete }) => {
  return [
    {
      title: "设置名",
      dataIndex: "logContent",
      render: (configName) => {
        return <span style={{ fontWeight: "600" }}>{configName}</span>
      }
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (createdAt) => {
        return (
          <span style={{ fontWeight: "600" }}>{formatTime(createdAt)}</span>
        )
      }
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
              clickDelete={async () => {
                batchDelete([record.logId])
              }}
            />
          </>
        )
      },
      width: "250px"
    }
  ]
}
export default LogTableConfig

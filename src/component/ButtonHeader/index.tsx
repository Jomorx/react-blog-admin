import { Button } from "antd"
import Search from "antd/lib/input/Search"
import React from "react"
interface IProps {
  batchDelete: () => void
  newAdd: () => void
  placeHolder: string
  onSearch: (value: string, event: IChangeEvent) => void
}
type IChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLElement, MouseEvent>
  | React.KeyboardEvent<HTMLInputElement>
  | undefined
const index: React.FC<IProps> = ({
  batchDelete,
  newAdd,
  placeHolder,
  onSearch
}) => {
  const _batchDelete = () => {
    batchDelete()
  }
  const _newAdd = () => {
    newAdd()
  }
  const _onSearch = (value: string, event: IChangeEvent) => {
    onSearch(value, event)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}
    >
      <div>
        <Button
          type="primary"
          danger
          style={{ marginRight: "20px" }}
          onClick={_batchDelete}
        >
          批量删除
        </Button>
        <Button
          type="primary"
          onClick={() => {
            _newAdd()
          }}
        >
          新增
        </Button>
      </div>
      <Search
        style={{ width: "300px" }}
        placeholder={placeHolder}
        enterButton="搜索"
        onSearch={(value, event) => {
          _onSearch(value, event)
        }}
        loading={false}
      />
    </div>
  )
}

export default index

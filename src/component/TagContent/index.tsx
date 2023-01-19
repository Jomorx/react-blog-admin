import { getTagListApi } from "@/api/tag/TagApi"
import { FormItem } from "@/component/ModalForm/types"
import { Button, Popover, Tag } from "antd"
import React, { useEffect, useState } from "react"
import { ITag } from "@/api/tag"
const TagContent = (item: FormItem, form: any) => {
  const [data, setData] = useState<ITag[]>([])
  const [value, setValue] = useState<ITag[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const content = () => {
    return (
      <div style={{ width: "400px" }}>
        {data
          .filter((item) => {
            return !selected.includes(item.tagId)
          })
          .map((item) => {
            return (
              <Tag
                key={item.tagId}
                onClick={(e) => {
                  setSelected([...selected, item.tagId])
                  setValue([...value, item])
                  form.setFieldValue("tags", [...value, item])
                }}
              >
                {item.tagName}
              </Tag>
            )
          })}
      </div>
    )
  }
  const init = async () => {
    //获得初始化的tags
    const res = await getTagListApi(1, 100, "")
    setData(res.data.rows)
  }
  //获得tags列表
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setValue(item.initialValue ?? [])
    setSelected(item.initialValue?item.initialValue.map((item: ITag) => item.tagId):[])
  }, [item.initialValue])
  return (
    <>
      {value?.map((item) => {
        return (
          <Tag
            key={item.tagId}
            closable
            onClose={() => {
              setValue(
                value.filter((valueItem) => valueItem.tagId !== item.tagId)
              )
              setSelected(
                selected.filter((selectedId) => selectedId !== item.tagId)
              )
            }}
          >
            {item.tagName}
          </Tag>
        )
      })}
      {data?.length === value.length || (
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button>添加标签</Button>
        </Popover>
      )}
    </>
  )
}

export default TagContent

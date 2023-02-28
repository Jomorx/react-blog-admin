import { getCategoryListApi } from "@/api/category/CategoryApi"
import { FormItem } from "@/component/ModalForm/types"
import { Button, Popover, Tag } from "antd"
import React, { useEffect, useState } from "react"
import { ICategory } from "@/api/category"
import styles from "./categoryContent.module.less"
import { FormInstance } from "antd/lib/form/Form"
const CategoryContent = (form: FormInstance, item: FormItem) => {
  const [data, setData] = useState<ICategory[]>([])
  const [value, setValue] = useState<ICategory>()
  const content = () => {
    return (
      <div style={{ width: "400px" }}>
        {data?.map((item) => {
          return (
            <li
              className={styles["category-li"]}
              key={item.categoryId}
              onClick={() => {
                setValue(item)
                form.setFieldsValue({ categoryId: item.categoryId })
              }}
            >
              {item.categoryName}
            </li>
          )
        })}
      </div>
    )
  }
  const init = async () => {
    const res = await getCategoryListApi(1, 100, "")
    setData(res.data.rows)
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (item.initialValue) {
      setValue(item.initialValue)

      form.setFieldValue("categoryId", item.initialValue.categoryId)
    }
  }, [item.initialValue, form])
  return (
    <>
      {value === undefined ? (
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button>添加分类</Button>
        </Popover>
      ) : (
        <Tag
          closable
          onClose={() => {
            setValue(undefined)
          }}
        >
          {value.categoryName}
        </Tag>
      )}
    </>
  )
}

export default CategoryContent

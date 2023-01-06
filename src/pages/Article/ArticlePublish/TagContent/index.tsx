import { getTagListApi } from "@/api/tag/TagApi";
import { FormItem } from "@/component/ModalForm/types";
import { Button, Popover, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { RowType } from "../../TagManage/types";
// import style from "./categoryContent.module.less";
const CategoryContent = (item: FormItem, form: any) => {
  const [data, setData] = useState<RowType[]>();
  const [value, setValue] = useState<RowType[]>([]);
  const [selected, setSelect] = useState<number[]>([]);
  const content = () => {
    return (
      <div style={{ width: "400px" }}>
        {data?.map((item) => {
          return (
            <Tag
              visible={selected.indexOf(item.tagId) === -1}
              key={item.tagId}
              onClick={(e) => {
                selected.push(item.tagId);
                setValue([...value, item]);
              }}
            >
              {item.tagName}
            </Tag>
          );
        })}
      </div>
    );
  };
  const init = async () => {
    const res = await getTagListApi(10, 1, "");
    setData(res.data.rows);
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (item.initialValue !== undefined) {
      setValue(item.initialValue);
      setSelect(
        item.initialValue.map((item: any) => {
          return item.tagId;
        })
      );
    }
  }, [item.initialValue]);
  useEffect(() => {
    form.setFieldsValue({ tags: value });
  }, [value]);
  return (
    <>
      {value?.map((item) => {
        return (
          <Tag
            key={item.tagId}
            closable
            onClose={(e) => {
              setSelect(selected.filter((ids) => ids !== item.tagId));
              setValue(value.filter((items) => items.tagId !== item.tagId));
              console.log(value);
            }}
          >
            {item.tagName}
          </Tag>
        );
      })}
      {data?.length === selected.length || (
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button>添加分类</Button>
        </Popover>
      )}
    </>
  );
};

export default CategoryContent;

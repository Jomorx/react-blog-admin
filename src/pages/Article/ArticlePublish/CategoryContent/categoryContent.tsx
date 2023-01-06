import { getCategoryListApi } from "@/api/category/CategoryApi";
import { FormItem } from "@/component/ModalForm/types";
import { Button, Popover, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { RowType } from "../../CategoryManage/types";
import style from "./categoryContent.module.less";
const CategoryContent = (item: FormItem, form: any) => {
  const [data, setData] = useState<RowType[]>();
  const [value, setValue] = useState<RowType>();
  const content = () => {
    return (
      <div style={{ width: "400px" }}>
        {data?.map((item) => {
          return (
            <li
              className={style.categoryLi}
              key={item.categoryId}
              onClick={(e) => {
                setValue(item);
              }}
            >
              {item.categoryName}
            </li>
          );
        })}
      </div>
    );
  };
  const init = async () => {
    const res = await getCategoryListApi(10, 1, "");
    setData(res.data.rows);
  };
  useEffect(() => {
    setValue(item.initialValue);
  }, [item.initialValue]);
  useEffect(() => {
    form.setFieldsValue({ categoryId: value?.categoryId });
  }, [value]);
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {value === undefined ? (
        <Popover content={content} trigger="click" placement="bottomLeft">
          <Button>添加分类</Button>
        </Popover>
      ) : (
        <Tag
          closable
          onClose={(e) => {
            setValue(undefined);
          }}
        >
          {value!.categoryName}
        </Tag>
      )}
    </>
  );
};

export default CategoryContent;

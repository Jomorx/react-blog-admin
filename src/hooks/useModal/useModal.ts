import { ModalInfoType } from "@/component/ModalForm/types";
import { useEffect, useState } from "react";

export const useModal = (
  title: string,
  flushTable: Function,
  insertDataApi: Function,
  editDataApi: Function,
  formItem: ModalInfoType["formItem"]
) => {
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({
    title: "",
    onCancel: () => {},
    onCreate: () => {},
    formItem: [],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const addClick = () => {
    setModalInfo({
      title: `新增${title}`,
      onCreate: async (value) => {
        await insertDataApi(value);
        flushTable();
        setVisible(false);
      },
      onCancel: () => {
        setVisible(false);
      },
      formItem:formItem.map(item=>{
        item.initialValue=""
        return item
      })
    });
    setVisible(true);
  };
  const editClick = (record: any) => {
    setModalInfo({
      title: `编辑${title}`,
      onCreate: async (value) => {
        await editDataApi(value);
        flushTable();
        setVisible(false);
      },
      onCancel: () => {
        setVisible(false);
      },
      formItem: formItem.map((item) => {
        item.initialValue = record[item.name];
        return item;
      }),
    });
    setVisible(true);
  };
  useEffect(()=>{
    console.log(formItem);

  },[formItem])
  return {
    addClick,
    editClick,
    modalInfo,
    visible,
    setModalInfo,
    setVisible,
  };
};

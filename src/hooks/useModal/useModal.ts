import { ModalInfoType } from "@/component/ModalForm/types"
import { useState } from "react"

export const useModal = (
  title: string,
  tableId: string,
  flushTable: () => void,
  insertDataApi: (value:any) => void,
  editDataApi: (value:any) => void,
  formItem: ModalInfoType["formItem"]
) => {
  const [modalInfo, setModalInfo] = useState<ModalInfoType>({
    title: "",
    onCancel: undefined,
    onCreate: undefined,
    formItem: []
  })
  const [visible, setVisible] = useState<boolean>(false)
  //点击新增
  const addClick = () => {
    setModalInfo({
      title: `新增${title}`,
      onCreate: async (value) => {
        await insertDataApi(value)
        flushTable()
        setVisible(false)
      },
      onCancel: () => {
        setVisible(false)
      },
      formItem: formItem.map((item) => {
        item.initialValue = ""
        return item
      })
    })
    setVisible(true)
  }
  //点击编辑
  const editClick = (record: any) => {
    setModalInfo({
      title: `编辑${title}`,
      onCreate: async (value) => {
        await editDataApi({ ...value, [tableId]: record[tableId] })
        flushTable()
        setVisible(false)
      },
      onCancel: () => {
        setVisible(false)
      },
      formItem: formItem.map((item) => {
        item.initialValue = record[item.name]
        return item
      })
    })
    setVisible(true)
  }
  return {
    addClick,
    editClick,
    modalInfo,
    visible,
    setModalInfo,
    setVisible
  }
}

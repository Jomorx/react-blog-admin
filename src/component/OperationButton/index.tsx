import { Button } from 'antd';
import React from 'react'
import { IProps } from './types';

const index:React.FC<IProps>=({clickEdit,clickDelete})=> {
    const _clickEdit = ()=>{
        clickEdit()
    }
    const _clickDelete = ()=>{
        clickDelete()
    }
  return (
    <>
          <Button
            type="primary"
            onClick={_clickEdit}
            style={{marginRight:"20px"}}
          >
            编辑
          </Button>
          <Button
            danger
            onClick={_clickDelete}
          >
            删除
          </Button>
    </>
  )
}

export default index

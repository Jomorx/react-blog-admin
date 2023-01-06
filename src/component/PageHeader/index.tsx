import React from 'react'
import style from './index.module.less'
interface Props{
  title:string
}
const index:React.FC<Props>=({title})=> {
  return (
    <div className={style.container}>
      <span className={style.title}>{title}</span>
    </div>
  )
}

export default index

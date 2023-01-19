import React from "react"
import { Card, Col, Row } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import style from "./index.module.less"

const cardList = [
  {
    title: "文章数量",
    icon: <FileTextOutlined />
  },
  {
    title: "标签数量",
    icon: <FileTextOutlined />
  },
  { title: "分类数量", icon: <FileTextOutlined /> },
  { title: "友链数量", icon: <FileTextOutlined /> }
]
const Dashboard = () => {
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={{ lg: 8, xl: 16, xxl: 24 }} wrap={true}>
          {cardList.map((item) => {
            return (
              <Col span={6} key={item.title}>
                <Card title={item.title} bordered={false}>
                  {item.icon}
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

export default Dashboard

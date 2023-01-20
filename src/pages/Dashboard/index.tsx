import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import request from "@/config"

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [cardList, setCardList] = useState([
    {
      title: "文章数量",
      icon: <FileTextOutlined />,
      count: 0
    },
    {
      title: "标签数量",
      icon: <FileTextOutlined />,
      count: 0
    },
    { title: "分类数量", icon: <FileTextOutlined />, count: 0 },
    { title: "友链数量", icon: <FileTextOutlined />, count: 0 }
  ])
  const initCardInfo = async () => {
    const {
      data: { articleCount, tagCount, categoryCount, friendChainCount }
    } = await request("dashboard/getCardInfo")
    cardList[0].count = articleCount
    cardList[1].count = tagCount
    cardList[2].count = categoryCount
    cardList[3].count = friendChainCount
    setLoading(false)
    setCardList(cardList)
  }
  const init = [initCardInfo]
  useEffect(() => {
    init.forEach(fn=>{
      fn()
    })
  }, [])
  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={24}>
          {cardList.map((item) => {
            return (
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                xl={8}
                xxl={6}
                key={item.title}
              >
                <Card
                  bodyStyle={{ padding: "12px 16px" }}
                  style={{ margin: "3px" }}
                  title={item.title}
                  bordered={true}
                  loading={loading}
                  hoverable
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "40px"
                    }}
                  >
                    <span>{item.count}</span>
                    <span
                      style={{
                        color: `rgb(${Math.random() * 255},${
                          Math.random() * 255
                        },${Math.random() * 255})`
                      }}
                    >
                      {item.icon}
                    </span>
                  </div>
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

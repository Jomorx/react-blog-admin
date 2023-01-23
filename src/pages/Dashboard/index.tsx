import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import request from "@/config"
import { MoChart } from "@/base-ui/MoChart"
import MoInfoCard from "./components/MoInfoCard"
import { chartConfig } from "./chart.config"

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
  const [chartList, setChartList] = useState(chartConfig)
  const initCardInfo = async () => {
    const {
      data: { articleCount, tagCount, categoryCount, friendChainCount }
    } = await request("dashboard/getCardInfo")
    cardList[0].count = articleCount
    cardList[1].count = tagCount
    cardList[2].count = categoryCount
    cardList[3].count = friendChainCount
    setLoading(false)
    setCardList([...cardList])
  }
  const initChartInfo = async () => {
    const {
      data: { tagData, categoryData }
    } = await request("dashboard/getChartInfo")
    chartList[0].option.series[0].data = tagData.map((item) => ({
      value: item.count,
      name: item.tag.tagName
    }))
    chartList[1].option.series[0].data = categoryData.map((item:any) => ({
      value: item.count,
      name: item.category.categoryName
    }))
    setChartList([...chartList])

  }
  // const init = [initCardInfo, initChartInfo]
  useEffect(() => {
    initCardInfo()
    initChartInfo()
  }, [])
  return (
    <>
      <div className="site-card-wrapper">
        <MoInfoCard loading={loading} cardList={cardList} />
      </div>
      <Row gutter={24}>
        {chartList.map((item) => (
          <Col md={8} xs={24} key={item.title}>
            <Card
              bodyStyle={{ padding: "12px 16px" }}
              style={{ margin: "3px" }}
              title={item.title}
              bordered={true}
              loading={loading}
              hoverable
            >
              <MoChart options={item.option} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Dashboard

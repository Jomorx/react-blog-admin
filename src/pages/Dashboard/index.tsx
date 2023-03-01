import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import request from "@/config"
import MoInfoCard from "./components/MoInfoCard"
import { chartConfig } from "./chart.config"
import { MoPieChart } from "@/component/Charts"
import { MoRoseChart } from "@/component/Charts/MoRoseChart"
import { switchChartToRender } from "@/component/Charts/utils/switchChartToRender"
import { getChartApi } from "@/api/dashboard"

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
      data: { tagData, categoryData, articleData }
    } = await getChartApi()
    chartList[0].data = tagData.map(({ count, tag }) => ({
      value: count,
      name: tag.tagName
    }))
    chartList[1].data = categoryData.map(({ count, category }) => ({
      value: count,
      name: category.categoryName
    }))
    chartList[2].data = articleData.map(({ viewCount }) => viewCount)
    chartList[2].xAxis!.data = articleData.map(({ articleTitle }) =>
      articleTitle.slice(0, 4)
    )

    setChartList([...chartList])
  }
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
              {switchChartToRender(item)}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Dashboard

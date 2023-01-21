import React, { useEffect, useState } from "react"
import { Card, Col, Row } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import request from "@/config"
import MoChart from "@/component/MoChart/src/MoChart"
import MoInfoCard from "./components/MoInfoCard"

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
  const [chartList, setChartList] = useState([
    {
      title: "标签文章数量",
      series: [
        {
          type: "pie",
          data: null
        }
      ]
    },
    {
      title: "分类文章数量",
      series: [
        {
          type: "pie",
          data: null
        }
      ]
    },
    {
      title: "文章访问排行",
      series: undefined
    }
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
  const initChartInfo = async () => {
    const {
      data: { tagData, categoryData }
    } = await request("dashboard/getChartInfo")
    chartList[0].series[0].data = tagData.map((item) => {
      if (item.tagId !== null)
        return {
          value: item.total,
          name: item.tag.tagName
        }
    })
    chartList[1].series[0].data = categoryData.map((item) => {
      if (item.categoryId !== null)
        return {
          value: item.total,
          name: item.category.categoryName
        }
    })
    setChartList(chartList)
  }
  const init = [initCardInfo, initChartInfo]
  useEffect(() => {
    init.forEach((fn) => {
      fn()
    })
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
              <MoChart
                options={{
                  series: item.series
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Dashboard

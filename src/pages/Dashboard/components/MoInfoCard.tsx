import { Card, Col, Row } from "antd"
import React from "react"

const MoInfoCard: React.FC<{ loading: boolean; cardList: any[] }> = ({
  loading,
  cardList
}) => {
  return (
    <Row gutter={24}>
      {cardList.map((item) => {
        return (
          <Col
            className="gutter-row"
            xs={24}
            md={12}
            lg={8}
            xl={6}
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
                    color: `rgb(${Math.random() * 255},${Math.random() * 255},${
                      Math.random() * 255
                    })`
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
  )
}

export default MoInfoCard

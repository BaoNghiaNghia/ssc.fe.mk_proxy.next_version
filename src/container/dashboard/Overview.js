import React, { lazy } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Row, Col } from 'antd';
import { CardBarChart2, EChartCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';

const TrafficChannel = lazy(() => import('./overview/performance/TrafficChannel'));

function Overview() {
  return (
    <>
      <PageHeader
        ghost
        title="YOUR PROXIES"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Thêm mới
            </Button>

          </div>,
        ]}
      />
      <Main>
        <Row gutter={15}>
          <Col xxl={5} md={8} sm={8} xs={12}>
            <Cards headless gradient='45deg, #FFF9E3, white' border>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <span>Mail chưa được gọi</span>
                    <Heading as="h1">100</Heading>
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={5} md={8} sm={8} xs={12}>
            <Cards headless gradient='45deg, #FFF9E3, white'>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <span>Tổng point hôm nay</span>
                    <Heading as="h1">1,394,932</Heading>
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={4} md={8} sm={8} xs={12}>
            <Cards headless gradient='45deg, #FFF9E3, white'>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <span>Tổng mail bị lỗi</span>
                    <Heading as="h1">33</Heading>
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={5} md={8} sm={8} xs={12}>
            <Cards headless gradient='45deg, #FFF9E3, white'>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <span>Mail die trong ngày</span>
                    <Heading as="h1">7,461</Heading>
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
          <Col xxl={5} md={8} sm={8} xs={12}>
            <Cards headless gradient='45deg, #FFF9E3, white'>
              <EChartCard>
                <div className="card-chunk">
                  <CardBarChart2>
                    <span>Mail hoạt động 24h</span>
                    <Heading as="h1">7,461</Heading>
                  </CardBarChart2>
                </div>
              </EChartCard>
            </Cards>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24}>
            <TrafficChannel />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Overview;

import React, { lazy } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Table} from 'antd';
import { CardBarChart2, EChartCard } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, TableWrapper} from '../styled';
import Heading from '../../components/heading/heading'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchListUserProxyApi } from "../../api/UserProxy";
// import { fetchAdminListUser } from '../../api/Auth';
import { useState, setState, useEffect } from 'react';

const TrafficChannel = lazy(() => import('./overview/performance/TrafficChannel'));

function Overview() {
  // const { searchData, orders } = useSelector(state => {
  //   return {
  //     searchData: state.headerSearchData,
  //     orders: state.orders.data,
  //   };
  // });
  
  // if (orders.length) {
  //   orders.map((value, key) => {
  //     const { status, orderId, customers, amount, date } = value;
  //     return dataSource.push({
  //       key: key + 1,
  //       id: <span className="order-id">{orderId}</span>,
  //       customer: <span className="customer-name">{customers}</span>,
  //       status: (
  //         <span
  //           className={`status ${
  //             status === 'Shipped' ? 'Success' : status === 'Awaiting Shipment' ? 'warning' : 'error'
  //           }`}
  //         >
  //           {status}
  //         </span>
  //       ),
  //       amount: <span className="ordered-amount">{amount}</span>,
  //       date: <span className="ordered-date">{date}</span>,
  //       action: (
  //         <div className="table-actions">
  //           <>
  //             <Button className="btn-icon" type="primary" to="#" shape="circle">
  //               <FeatherIcon icon="eye" size={16} />
  //             </Button>
  //             <Button className="btn-icon" type="info" to="#" shape="circle">
  //               <FeatherIcon icon="edit" size={16} />
  //             </Button>
  //             <Button className="btn-icon" type="danger" to="#" shape="circle">
  //               <FeatherIcon icon="trash-2" size={16} />
  //             </Button>
  //           </>
  //         </div>
  //       ),
  //     });
  //   });
  // }

  const [userProxies, setUserProxies] = useState([]);

  const fetchUserProxies = async () => {
    try {
      const responseListUserProxy = await fetchListUserProxyApi();
      if (responseListUserProxy.status === 200) {
        let data = responseListUserProxy.data.data.items;
        const itemsWithIds = data.map((item, index) => {
          return { ...item, number: index + 1 };
        });
        setTableData(itemsWithIds);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserProxies();
  }, []);

  // const dataSource = [];

  const columns = [
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Started at',
      dataIndex: 'started_at',
      key: 'started_at',
    },
    {
      title: 'Expired at',
      dataIndex: 'expired_at',
      key: 'expired_at',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };
  const rowSelection = {
    onChange: (srk) => {
      onSelectChange(srk);
    },
  };
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
        {/* <Row gutter={15}>
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
        </Row> */}
        <Row gutter={25}>
          <Col xxl={24}>
            <TableWrapper className="table-order table-responsive">
                <Table
                  rowSelection={rowSelection}
                  dataSource={userProxies}
                  columns={columns}
                  // pagination={{ pageSize: 7, showSizeChanger: true, total: orders.length }}
                />
              </TableWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Overview;

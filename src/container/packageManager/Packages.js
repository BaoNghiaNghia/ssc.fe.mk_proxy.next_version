import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { TopToolBox } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, TableWrapper } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { orderFilter } from '../../redux/orders/actionCreator';

import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { ROLE_GENERAL } from '../../variables';
import actions from '../../redux/packages/actions';

function Packages() {
  const dispatch = useDispatch();
  const { searchData, orders, userInfo, userPackages } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      orders: state.orders.data,
      userInfo: state?.auth?.userInfo,
      userPackages: state?.packages?.userPackages?.items,
      // userPackagesPagination: state?.proxies?.userProxies?.meta,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    item: orders,
    selectedRowKeys: [],
  });

  const { notData, item, selectedRowKeys } = state;
  const filterKey = ['Shipped', 'Awaiting Shipment', 'Canceled'];

  useEffect(() => {
    if (orders) {
      setState({
        item: orders,
        selectedRowKeys,
      });
    }
  }, [orders, selectedRowKeys]);

  useEffect(() => {
    if (userInfo) {
      switch (userInfo?.group?.role) {
        case ROLE_GENERAL.USER_DEFAULT:
          dispatch(actions.fetchListUserPackagesBegin());
          break;

        default:
          dispatch(actions.fetchListUserPackagesBegin());
      }
    }
  }, [dispatch]);

  const handleSearch = (searchText) => {
    const data = searchData.filter((value) => value.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const handleChangeForFilter = (e) => {
    dispatch(orderFilter('status', e.target.value));
  };

  const dataSource = [];
  if (orders.length) {
    orders.map((value, key) => {
      const { status, orderId, customers, amount, date } = value;
      return dataSource.push({
        key: key + 1,
        id: <span className="order-id">{orderId}</span>,
        customer: <span className="customer-name">{customers}</span>,
        status: (
          <span
            className={`status ${
              status === 'Shipped' ? 'Success' : status === 'Awaiting Shipment' ? 'warning' : 'error'
            }`}
          >
            {status}
          </span>
        ),
        amount: <span className="ordered-amount">{amount}</span>,
        date: <span className="ordered-date">{date}</span>,
        action: (
          <div className="table-actions">
            <>
              <Button className="btn-icon" type="primary" to="#" shape="circle">
                <FeatherIcon icon="eye" size={16} />
              </Button>
              <Button className="btn-icon" type="info" to="#" shape="circle">
                <FeatherIcon icon="edit" size={16} />
              </Button>
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </>
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Banking Code',
      dataIndex: 'banking_code',
      key: 'banking_code',
      role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Package Name',
      dataIndex: 'package_name',
      key: 'package_name',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Package Number',
      dataIndex: 'package_number',
      key: 'package_number',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Package Days',
      dataIndex: 'package_days',
      key: 'package_days',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Type',
      dataIndex: 'proxy_type',
      key: 'proxy_type',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Version',
      dataIndex: 'proxy_version',
      key: 'proxy_version',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Price',
      dataIndex: 'final_price',
      key: 'final_price',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Start Package',
      dataIndex: 'started_at',
      key: 'started_at',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'End Package',
      dataIndex: '',
      key: '',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
    {
      title: 'Confirm',
      dataIndex: 'confirmed',
      key: 'confirmed',
      rrole: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
      render: (text) => String(text),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN],
    },
  ];

  const onSelectChange = (selectedRowKey) => {
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
        title="Orders"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <TopToolBox>
                <Row gutter={15} className="justify-content-center">
                  <Col lg={6} xs={24}>
                    <div className="table-search-box">
                      <AutoComplete onSearch={handleSearch} dataSource={notData} width="100%" patterns />
                    </div>
                  </Col>
                  <Col xxl={14} lg={16} xs={24}>
                    <div className="table-toolbox-menu">
                      <span className="toolbox-menu-title"> Status:</span>
                      <Radio.Group onChange={handleChangeForFilter} defaultValue="">
                        <Radio.Button value="">All</Radio.Button>
                        {item.length &&
                          [...new Set(filterKey)].map((value) => {
                            return (
                              <Radio.Button key={value} value={value}>
                                {value}
                              </Radio.Button>
                            );
                          })}
                      </Radio.Group>
                    </div>
                  </Col>
                  <Col xxl={4} xs={24}>
                    <div className="table-toolbox-actions">
                      <Button size="small" type="secondary" transparented>
                        Export
                      </Button>
                      <Button size="small" type="primary">
                        <FeatherIcon icon="plus" size={12} /> Add Order
                      </Button>
                    </div>
                  </Col>
                </Row>
              </TopToolBox>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col md={24}>
              <TableWrapper className="table-order table-responsive">
                <Table
                  rowSelection={rowSelection}
                  dataSource={userPackages}
                  columns={columns}
                  pagination={{ pageSize: 9, showSizeChanger: true, total: orders.length }}
                />
              </TableWrapper>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
}

export default Packages;

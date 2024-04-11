import React, { useState, useEffect } from 'react';
import { Progress, Table } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { TrafficTableWrapper } from '../../style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { trafficChanelGetData, trafficChanelFilterData } from '../../../../redux/chartContent/actionCreator';
import actions from '../../../../redux/proxies/actions';
import { ROLE_GENERAL } from '../../../../variables';

const moreContent = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const locationColumns = [
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Started At',
    dataIndex: 'started_at',
    key: 'started_at',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Expired At',
    dataIndex: 'expired_at',
    key: 'expired_at',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    role: [ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Live',
    dataIndex: 'live',
    key: 'live',
    role: [ROLE_GENERAL.ADMIN]
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    role: [ROLE_GENERAL.USER_DEFAULT, ROLE_GENERAL.ADMIN, ROLE_GENERAL.SUPER_ADMIN]
  },
];

function TrafficChannel() {
  const dispatch = useDispatch();
  const { trafficState, userInfo, userProxies, userProxiesPagination } = useSelector(state => {
    return {
      trafficState: state.chartContent.trafficChanelData,
      userInfo: state?.auth?.userInfo,
      userProxies: state?.proxies?.userProxies?.items,
      userProxiesPagination: state?.proxies?.userProxies?.meta
    };
  });

  const [state, setState] = useState({
    traffic: 'year',
  });


  useEffect(() => {
    if (trafficChanelGetData) {
      dispatch(trafficChanelGetData());
    }

    if (userInfo) {
      switch (userInfo?.group?.role) {
        case ROLE_GENERAL.USER_DEFAULT:
          dispatch(actions.fetchListUserProxyBegin());
          break;
  
        case ROLE_GENERAL.ADMIN:
          dispatch(actions.fetchListUserProxyBegin());
          break;
  
        case ROLE_GENERAL.SUPER_ADMIN:
          dispatch(actions.fetchListUserProxyBegin());
          break;
  
        default:
          dispatch(actions.fetchListUserProxyBegin());
      }
    }

  }, [dispatch]);

  const columnMatchRole = [];

  locationColumns.map(item => {
    if (item.role.includes(userInfo?.group?.role)) {
      return columnMatchRole.push(item);
    }
  });

  const locationData = userProxies?.map(item => {
    return {
      key: item.id,
      url: item.proxy_url,
      type: item.proxy_type,
      version: item.proxy_version,
      started_at: item.started_at,
      expired_at: item.expired_at,
      action: (
        <div>
          <Link to={`/proxies/edit/${item.id}`}>
            <FeatherIcon size={16} icon="edit-3" />
          </Link>
        </div>
      ),
    };
  })

  const handleActiveChangeTraffic = value => {
    setState({
      ...state,
      traffic: value,
    });
    dispatch(trafficChanelFilterData(value));
  };

  return (
    <div className="full-width-table">
      <Cards
        isbutton={
          <div className="card-nav">
            <ul>
              <li className={state.traffic === 'week' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChangeTraffic('week')} to="#">
                  Week
                </Link>
              </li>
              <li className={state.traffic === 'month' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChangeTraffic('month')} to="#">
                  Month
                </Link>
              </li>
              <li className={state.traffic === 'year' ? 'active' : 'deactivate'}>
                <Link onClick={() => handleActiveChangeTraffic('year')} to="#">
                  Year
                </Link>
              </li>
            </ul>
          </div>
        }
        title="Traffic Channels"
        size="large"
        more={moreContent}
      >
        <TrafficTableWrapper>
          <div className="table-bordered table-responsive">
            <Table columns={columnMatchRole} dataSource={locationData} pagination={false} />
          </div>
        </TrafficTableWrapper>
      </Cards>
    </div>
  );
}

export default TrafficChannel;

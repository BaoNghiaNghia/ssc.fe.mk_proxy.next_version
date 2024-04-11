import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PricingCard, ListGroup, Badge } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/heading/heading';
import { List } from '../../components/pricing/pricing';
import actions from '../../redux/packages/actions';

function PackagePlans() {
  const dispatch = useDispatch();
  const { packagePlansInfo } = useSelector((state) => {
    return {
      packagePlansInfo: state?.packages?.packagePlansInfo,
    };
  });

  const handleFetchPlansInfo = () => {
    dispatch(actions.fetchListUserPackagesInfoBegin());
  };

  useEffect(() => {
    handleFetchPlansInfo();
  }, [dispatch]);

  console.log('========packagePlansInfo=========');
  console.log(packagePlansInfo);
  return (
    <>
      <PageHeader
        ghost
        title="ROTATING RESIDENTIAL PROXY PACKAGES TEST"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25} justify="center">
          {/* <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>
              <Badge className="pricing-badge" type="dark">
                Free Forever
              </Badge>
              <Heading className="pricing-title" as="h3">
                Free
              </Heading>
              <span className="package-user-type">For Individuals</span>
              <ListGroup>
                <List text="100MB File Space" />
                <List text="2 Active Projects" />
                <List text="Limited Boards" />
                <List text="Basic Project Management" />
              </ListGroup>
              <Button size="default" type="white">
                Current Plan
              </Button>
            </PricingCard>
          </Col> */}
          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>
              <Badge className="pricing-badge" type="primary">
                Basic Plan
              </Badge>
              <Heading className="price-amount" as="h3">
                <sup className="currency">$</sup>19 <sub className="pricing-validity">Per month</sub>
              </Heading>
              <span className="package-user-type">For 2 Users</span>
              <ListGroup>
                <List text="100GB File Space" />
                <List text="300 Projects" />
                <List text="Limited Boards" />
                <List text="Basic Project Management" />
                <List text="Custom Post Types" />
              </ListGroup>
              <Button size="default" type="primary">
                Get Started
              </Button>
            </PricingCard>
          </Col>
          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>
              <Badge className="pricing-badge" type="secondary">
                Business
              </Badge>
              <Heading className="price-amount" as="h3">
                <sup className="currency">$</sup>39 <sub className="pricing-validity">Per month</sub>
              </Heading>
              <span className="package-user-type">For 10 Users</span>
              <ListGroup>
                <List text="100GB File Space" />
                <List text="300 Projects" />
                <List text="Limited Boards" />
                <List text="Basic Project Management" />
                <List text="Custom Post Types" />
                <List text="Subtasks" />
              </ListGroup>
              <Button size="default" type="secondary">
                Get Started
              </Button>
            </PricingCard>
          </Col>
          <Col xxl={6} lg={8} sm={12} xs={24}>
            <PricingCard style={{ marginBottom: 30 }}>
              <Badge className="pricing-badge" type="success">
                Enterprise
              </Badge>
              <Heading className="price-amount" as="h3">
                <sup className="currency">$</sup>79 <sub className="pricing-validity">Per month</sub>
              </Heading>
              <span className="package-user-type">For 50 Users</span>
              <ListGroup>
                <List text="100GB File Space" />
                <List text="300 Projects" />
                <List text="Limited Boards" />
                <List text="Basic Project Management" />
                <List text="Custom Post Types" />
                <List text="Subtasks" />
              </ListGroup>
              <Button size="default" type="success">
                Get Started
              </Button>
            </PricingCard>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default PackagePlans;

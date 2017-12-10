import React from "react";
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  message,
  Form,
  Input,
  Checkbox,
  Modal,
  Tabs,
  Carousel,
  BackTop
} from 'antd';
import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";
import PCProduct from "./pc_product"

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component{
  render(){

    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class="container">
            <div class="wrap">
            <div class="leftContainer">
              <div class="carousel">
                <Carousel autoplay dots>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
                <PCNewsImageBlock count={6} type="top" width="400px" cartTitle="国际头条" imageWidth="112px" marginBottom="10px" marginRight="4px" imageHeight="90px"/>
              </div>
            </div>
            <Tabs class="tabs_news">
              <TabPane tab="头条新闻" key="1">
                <PCNewsBlock count={20} type="top"/>
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={20} type="guoji" />
              </TabPane>
              <TabPane tab="国内" key="3">
                <PCNewsBlock count={20} type="guonei" />
              </TabPane>
              <TabPane tab="娱乐" key="4">
                <PCNewsBlock count={20} type="yule" />
              </TabPane>
              <TabPane tab="体育" key="5">
                <PCNewsBlock count={20} type="tiyu" />
              </TabPane>
              <TabPane tab="科技" key="6">
                <PCNewsBlock count={20} type="keji" />
              </TabPane>
            </Tabs>
            <Tabs class="tabs_product">
              <TabPane tab="ReactNews 产品" key="1">
                <PCProduct/>
              </TabPane>
            </Tabs>
          </div>
            <div>
              <PCNewsImageBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="160px" imageHeight="120px" marginBottom="10px" marginRight="4px"/>
              <PCNewsImageBlock count={16} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="160px" imageHeight="120px" marginBottom="10px" marginRight="4px" />
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
        <BackTop/>
      </div>
    )
  }
}

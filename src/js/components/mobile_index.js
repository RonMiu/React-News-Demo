import React from "react";
import ReactDOM from "react-dom";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import MobileList from "./mobile_list";
import MobileListPulltoRefresh from "./mobile_list_pull_refresh";
import {Tabs, Carousel, BackTop} from "antd";

const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
  render() {
    return (
      <div>
        <MobileHeader/>
        <Tabs>
          <TabPane tab="头条" key="1">
            <MobileListPulltoRefresh type="top" count={20}/>
          </TabPane>
          <TabPane tab="社会" key="2">
            <div class="carousel">
              <Carousel autoplay dots>
                <div><img src="./src/images/carousel_1.jpg"/></div>
                <div><img src="./src/images/carousel_2.jpg"/></div>
                <div><img src="./src/images/carousel_3.jpg"/></div>
                <div><img src="./src/images/carousel_4.jpg"/></div>
              </Carousel>
            </div>
            <MobileList type="shehui" count={20}/>
          </TabPane>
          <TabPane tab="国内" key="3">
            <div class="carousel">
              <Carousel autoplay dots>
                <div><img src="./src/images/carousel_1.jpg"/></div>
                <div><img src="./src/images/carousel_2.jpg"/></div>
                <div><img src="./src/images/carousel_3.jpg"/></div>
                <div><img src="./src/images/carousel_4.jpg"/></div>
              </Carousel>
            </div>
            <MobileList type="guonei" count={20}/>
          </TabPane>
          <TabPane tab="国际" key="4">
            <div class="carousel">
              <Carousel autoplay dots>
                <div><img src="./src/images/carousel_1.jpg"/></div>
                <div><img src="./src/images/carousel_2.jpg"/></div>
                <div><img src="./src/images/carousel_3.jpg"/></div>
                <div><img src="./src/images/carousel_4.jpg"/></div>
              </Carousel>
            </div>
            <MobileList type="guoji" count={20}/>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileList type="yule" count={20}/>
          </TabPane>
        </Tabs>
        <MobileFooter/>
        <BackTop className="mobileToTop"/>
      </div>
    )
  }
}

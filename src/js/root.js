import React from "react";
import ReactDOM from "react-dom";
import PCIndex from "./components/pc_index";
import MediaQuery from "react-responsive";
import MobileIndex from "./components/mobile_index";
import PCNewsDetails from "./components/pc_news_detail";
import mobileNewsDetails from "./components/mobile_news_details";
import PCUserCenter from "./components/pc_usercenter"
import MobileUserCenters from "./components/mobile_usercenter"
import {HashRouter, Route, Link, BrowserRouter, Switch} from "react-router-dom";

export default class Root extends React.Component {
  render() {
    return (
        <div>
          <MediaQuery query="(min-device-width:1224px)">
            <BrowserRouter>
              <Switch>
                <Route component={PCIndex} path="/" exact />
                <Route path="/details/:uniquekey" component={PCNewsDetails} />
                <Route path="/usercenter" component={PCUserCenter} />
              </Switch>
            </BrowserRouter>
          </MediaQuery>
          <MediaQuery query="(max-device-width:1224px)">
            <BrowserRouter>
              <Switch>
                <Route component={MobileIndex} path="/" exact />
                <Route path="/details/:uniquekey" component={mobileNewsDetails} />
                <Route path="/usercenter" component={MobileUserCenters} />

              </Switch>
            </BrowserRouter>
          </MediaQuery>
        </div>

    )
  }
}
ReactDOM.render(
  <Root/>, document.getElementById("mainContainer"));

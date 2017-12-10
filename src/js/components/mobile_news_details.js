import React from "react";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import PCNewsImageBlock from "./pc_news_image_block";
import CommonComments from "./common_comments";
import {Row, Col, BackTop} from "antd";
import {Link, BrowserRouter, Route} from "react-router-dom";

export default class mobileNewsDetails extends React.Component{
  constructor() {
  		super();
  		this.state = {
  			newsItem: ''
  		};
  	};
  	componentDidMount() {
  		var myFetchOptions = {
  			method: 'GET'
  		};
  		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
  			this.setState({newsItem: json});
  			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
  		});
      console.log(this.state.newsItem)
  	};
  	createMarkup() {
  		return {__html: this.state.newsItem.pagecontent};
  	};
  render(){

    return(
      <div id="mobileDetailsContainer">
          <MobileHeader/>
          <div class="ucmobileList">
          <Row>
            <Col span={24} className="container">
              <div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                <CommonComments uniquekey={this.props.match.params.uniquekey}/>

            </Col>
          </Row>
          <MobileFooter/>
          <BackTop className="mobileToTop"/>
        </div>
      </div>
    )
  }
}

import React from "react";
import {Row, Col} from "antd";
import {Link, BrowserRouter, Route} from "react-router-dom";
import ReactPullToRefresh from "react-pull-to-refresh";
import Tloader from 'react-touch-loader';
import "./../../css/mobile.less";

export default class MobileListPulltoRefresh extends React.Component{

  constructor(){
    super();
    this.state={
      news:"",
      count:20,
      canRefreshResolve: 1,
      length: 20,
      hasMore: 0,
      initializing: 1,
      refreshedAt: Date.now(),
      autoLoadMore:true,
    }
  };

  componentWillMount(){
    var myFetchOptions={
      method:"GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };

  handleRefresh(resolve, reject){
    var myFetchOptions={
      method:"GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({
        news: json,
      });
      resolve();
    });
  };

  loadMore(resolve){
    setTimeout(() => {
      var length = this.state.length;
        this.setState({
          length: length+5,
        });

        var myFetchOptions = {
          method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.length, myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news: json}));

      this.setState({
        hasMore: length>0 && length<50
      });
      resolve();
    }, 2e3)
  };

  componentDidMount(){
    setTimeout(()=>{
        this.setState({
          hasMore: 1,
          initializing: 2
        });
      },2e3);
  }

  render(){
    const {listLen, hasMore, initializing, refreshedAt, canRefreshResolve, autoLoadMore} =this.state;
    const { refresh, loadMore, toggleCanRefresh } = this;
    const {news, count, length} = this.state;
    const newList = news.length
    ?
    news.map((newsItem,index)=>(
      <section key={index} className="m_ariticle">
        <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
          <div  className="m_ariticle_img">
            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
          </div>
          <div  className="m_ariticle_info">
            <div  className="m_ariticle_title">
              <span>{newsItem.title}</span>
            </div>
          </div>
          <div className="m_ariticle_desc">
            <div className="m_ariticle_desc_l">
              <span className="m_ariticle_channel">{newsItem.realtype}</span>
              <span className="m_ariticle_item">{newsItem.date}</span>

            </div>
          </div>
        </Link>
      </section>
    ))
    :"没有加载任何内容";
    console.log(news)
    console.log(newList)

    return(
      <BrowserRouter>
        <div>
          <Row>
            <Col span={24}>
              <ReactPullToRefresh onRefresh={this.handleRefresh.bind(this)}
                  className="pullToRefresh">
                <span className="genericon genericon-next">
                </span>
                <div className="loading">
                  <span className="loading-ptr-1"></span>
                  <span className="loading-ptr-2"></span>
                  <span className="loading-ptr-3"></span>
                </div>
                <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing} autoLoadMore={autoLoadMore}>
  								{newList}
  							</Tloader>
              </ReactPullToRefresh>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    )
  }
}

import React from "react";
import {Row, Col} from "antd";
import {Link, BrowserRouter, Route} from "react-router-dom";
import Tloader from 'react-touch-loader';
import "./../../css/mobile.less";

export default class MobileList extends React.Component{

  constructor(){
    super();
    this.state={
      news:"",
      canRefreshResolve: 1,
      count: 5,
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
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };

  loadMore(resolve){
    setTimeout(() => {
      var count = this.state.count;
  			this.setState({
  				count: count+5,
  			});

  			var myFetchOptions = {
  				method: 'GET'
  			};
  			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news: json}));

  		this.setState({
  			hasMore: count>0 && count<20
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
    const {news} = this.state;
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
              <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing} autoLoadMore={autoLoadMore}>
								{newList}
							</Tloader>
            </Col>
          </Row>
        </div>
      </BrowserRouter>
    )
  }
}

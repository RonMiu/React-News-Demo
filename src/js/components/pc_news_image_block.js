import React from "react";
import {Card} from "antd";
import {Link, BrowserRouter, Route} from "react-router-dom";

export default class PCNewsImageBlock extends React.Component{
  constructor(){
    super();
    this.state={
      news:"",
    }
  }
  componentWillMount(){
    var myFetchOptions={
      method:"GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  }
  render(){
    const wrapStyle = {
      marginBottom:this.props.marginBottom,
      marginRight:this.props.marginRight
    }
    const styleImage ={
      display:"block",
      width:this.props.imageWidth,
      height:this.props.imageHeight,
    };
    const styleH3 ={
      width:this.props.imageWidth,
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis"
    };
    const styleP = {
      color:"rgba(0,0,0,0.65)",
      fontSize:"12px",
      whiteSpace:"nowrap",
      overflow:"hidden",
      textOverflow:"ellipsis"
    }
    const {news} = this.state;
    const newList = news.length
    ?
    news.map((newsItem,index)=>(
      <div key={index} class="imageblock" style={wrapStyle}>
        <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
          <div class="custom-image">
            <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
          </div>
          <div class="custom-card">
            <h3 style={styleH3}>{newsItem.title}</h3>
            <p style={styleP}>{newsItem.author_name}</p>
          </div>
        </Link>
      </div>
    ))
    :"没有加载任何内容";
    return(
      <BrowserRouter className="topNewsList">
        <div>
          <Card title={this.props.cartTitle} style={{width:this.props.width,marginTop:"10px"}}>
            {newList}
          </Card>
        </div>
      </BrowserRouter>
    )
  }
}

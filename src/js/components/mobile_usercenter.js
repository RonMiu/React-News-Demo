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
  BackTop,
  Upload,
  Card
} from 'antd';
import PCNewsBlock from "./pc_news_block";
import PCNewsImageBlock from "./pc_news_image_block";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";

const TabPane = Tabs.TabPane;

export default class mobileUserCenter extends React.Component{
  constructor(){
    super();
    this.state = {
      usercollection:"",
      usercomments:"",
      previewImage:"",
      previewVisible:false,

    }
  }
  componentDidMount(){
    var myFetchOptions={
      method:"GET",
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
      console.log(this.state.usercollection)
		});
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
      console.log(this.state.usercomments)
		});
  }
  handleCancel(){
     this.setState({
       previewVisible: false,
     });
   }
  render(){

    const props = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
      		"Access-Control-Allow-Origin":"*"
      	},
      listType: 'picture-card',
      defaultFileList:[
      		{
      			uid:-1,
      			name:'xxx.png',
      			state: 'done',
      			url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      			thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
      		}
      	],
      onPreview: (file)=>{
      		this.setState({previewImage:file.url,previewVisible:true});
      }
    }
    const {usercollection}=this.state;
    const usercollectionList = usercollection.length
    ?
    usercollection.map((uc,index)=>(
      <Card key={index} title={uc.uniquekey} extra={<a href={`/details/${uc.uniquekey}`}>查看原新闻</a>}>
        <p>{uc.Title}</p>
      </Card>
    )
  ).reverse()
    :
    "您还没有收藏任何新闻";
    const {usercomments}=this.state;
    const usercommentsList = usercomments.length
    ?
    usercomments.map((comment,index)=>(
				<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
    )).reverse()
    :
    "您没发表过任何评论";
    return(
      <div>
        <MobileHeader/>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <div class="mobile_comment">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <div class="mobile_comment">
                  <Row>
                    <Col span={24}>
                      {usercommentsList}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane tab="我的头像" key="3">
                <div>
                  <Upload {...props}>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">
                      上传照片
                    </div>
                  </Upload>
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="预览" src={this.state.previewImage} />

                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>

        <MobileFooter/>
      </div>
    )
  }
}

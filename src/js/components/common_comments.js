import React from "react";
import {
  Card,
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
  notification,
  Pagination
} from 'antd';

const FormItem = Form.Item;

class CommonComments extends React.Component{
  constructor(){
    super();
    this.state = {
      comments:"",
      current:1,
      commentReverse:false,
    }
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    console.log(this.state.current);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
    .then(response => response.json())
    .then(json => {
      this.setState({comments: json});
      this.props.form.setFieldsValue({
          remark:'',
      })
      console.log((this.state.comments));
      const {comments} =this.state;
      console.log(this.state.commentReverse)
      if(comments.length>0 && this.state.commentReverse==false){
      this.setState({commentReverse:true})
      comments.reverse();
      }
    });
  };

  handleSubmit(e) {
    e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})
	};

  addUserCollection(){
    var myFetchOptions = {
      method:"GET"
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey,myFetchOptions)
			.then(response=>response.json())
			.then(json=>{
				//收藏成功以后进行一下全局的提醒
        notification["success"]({
         message: 'ReactNews提醒',
         description: '已成功收藏该文章.',
        });
			});
  }
  changeComment(page){
    this.setState({
      current:page,
    })
    const {comments,current} = this.state;
    console.log(comments);
    console.log(current);

  }


  consoleStr(){
    console.log(this.state.text)
  }

  render(){
    const styleCard ={
      marginBottom:"5px",
    }
    const { getFieldDecorator } = this.props.form;
    const {comments,current} = this.state;
		const commentList = comments.length
			?
        comments.map((comment, index) => (
  				<Card style={styleCard} key={index} title={comment.UserName} extra={< a href = "#" > 发布于 {comment.datetime} < /a>}>
  					<p>{comment.Comments}</p>
  				</Card>
  			))
			: '没有加载到任何评论';

      const showComments=[];
      for(var i=10*(current-1);i<10*current;i++){
        showComments.push(commentList[i]);
      }

    return(
      <div class="comment">
        <Row>
          <Col span={24}>
            {showComments}
            <Pagination current={this.state.current} pageSize={10} total={comments.length} onChange={this.changeComment.bind(this)}/>
            <Form onSubmit ={this.handleSubmit.bind(this)}>
              <FormItem label="您的评论">
                  {getFieldDecorator('remark')(<Input type="textarea" placeholder="随便写"/>)}
              </FormItem>
              <Button type="primary" htmlType="submit">提交评论</Button>
              &nbsp;&nbsp;
              <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default CommonComments = Form.create({})(CommonComments);

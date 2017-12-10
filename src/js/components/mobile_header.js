import React from "react";
import ReactDOM from "react-dom";
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
  Tabs
} from 'antd';
import { Link } from "react-router-dom";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined:false,
      userNickName:'Ron',
      userid:0,
      confirmLoading : false
    }
  }
  componentWillMount(){
    if (localStorage.userid!=''){
      this.setState({
        hasLogined:true,
        userNickName:localStorage.userNickName,
        userid:localStorage.userid
      })
    }
  }
  login(e){
    console.log("number");
    this.setModalVisible(true);
  }
  handleClick(e){
    console.log('click ', e);
    if (e.key == "register") {
      this.setModalVisible(true);
    } else {
      this.setModalVisible(false);
    }
    this.setState({
      current: e.key,
    });
  }

  setModalVisible(value){
    this.setState({
      modalVisible:value
      })
  }

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
      method:'GET'
    }
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username="+formData.userName+"&password="+formData.password +"&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({
        userNickName: json.NickUserName,
         userid: json.UserId});
         localStorage.userid = json.UserId;
         localStorage.userNickName = json.userNickName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setModalVisible(false);
  }

  handleOk(e){
    this.setState({
      confirmLoading: true,
    });
    setTimeout(()=>{
      this.setState({
        modalVisible:false,
        confirmLoading: false,
      });
    }, 1000);
  }
  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({
      hasLogined:false,
      })
  }
  callback(key){
    if (key==1){
      this.setState({
        action:'login'
        })
    }else if(key==2){
      this.setState({
        action:'register'
        })
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined
    ?
    <div  class="logout">
      <Link to={`/usercenter`}>
        <Icon type="inbox" onClick={this.logout.bind(this)}/>
      </Link>
      <span onClick={this.logout.bind(this)}>{this.state.userNickName},退出</span>
    </div>
    :
    <div class="logout">
          <Icon type="setting" onClick={this.login.bind(this)}/>
    </div>
    return(
      <div id="mobile">
        <header>
          <img src="/src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal title="个人中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={this.handleOk.bind(this)} okText="关闭" >
          <Tabs type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="登录" key="1">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {
                    getFieldDecorator('userName')
                    (<Input type="text" placeholder="请输入您的账号" />)
                  }
                </FormItem>
                <FormItem label="密码">
                  {
                    getFieldDecorator('password')
                    (<Input type="password" placeholder="请输入您的密码" />)
                  }
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {
                    getFieldDecorator('r_userName')
                    (<Input type="text" placeholder="请输入您的账号" />)
                  }
                </FormItem>
                <FormItem label="密码">
                  {
                    getFieldDecorator('r_password')
                    (<Input type="password" placeholder="请输入您的密码" />)
                  }
                </FormItem>
                <FormItem label="确认密码">
                  { getFieldDecorator('r_cofirmPassword')
                    (<Input type="password" placeholder="请确认密码" />)
                  }
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>

      </div>
    )
  }
}
export default MobileHeader = Form.create()(MobileHeader);

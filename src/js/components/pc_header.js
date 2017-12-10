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
import { Link } from "react-router-dom"

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class PCHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined:false,
      userNickName:'',
      userid:0,
      confirmLoading : false
    }
  }
  componentWillMount(){
    if (localStorage.userid != ''){
      this.setState({
        hasLogined:true,
      });
      this.setState({
        userNickName:localStorage.userNickName,
        userid:localStorage.userid
        })
    }
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
        userNickName : json.NickUserName,
        userid : json.UserId});
      localStorage.userid = json.UserId;
      localStorage.userNickName = json.NickUserName;
      console.log (localStorage.userNickName)
      console.log (localStorage.userid)
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

  render() {
    let { getFieldProps } = this.props.form;
    const { getFieldDecorator } = this.props.form;

    const userShow = this.state.hasLogined
    ?
    <Menu.Item key="logout" class="register">
      <Button type="primary" htmlType="button">
       {this.state.userNickName}
      </Button>
      &nbsp;&nbsp;
       <Button type="dashed" htmlType="button">
         <Link to={`/usercenter`} target="_blank">个人中心
         </Link>
        </Button>
        &nbsp;
        &nbsp;
       <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" class="register">
      <Icon type="appstore"/>注册/登录
    </Menu.Item>

    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="#" class="logo">
              <img src="./src/images/logo.png" alt="logo" />
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="top">
                <Icon type="appstore" />头条
              </Menu.Item>
              <Menu.Item key="shehui">
                <Icon type="appstore" />社会
              </Menu.Item>
              <Menu.Item key="guonei">
                <Icon type="appstore" />国内
              </Menu.Item>
              <Menu.Item key="guoji">
                <Icon type="appstore" />国际
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="appstore" />娱乐
              </Menu.Item>
              <Menu.Item key="tiyu">
                <Icon type="appstore" />体育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="appstore" />科技
              </Menu.Item>
              <Menu.Item key="shishang">
                <Icon type="appstore" />时尚
              </Menu.Item>
              {userShow}
            </Menu>

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
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    )
  }
}
export default PCHeader = Form.create()(PCHeader);

import React from 'react';
import {Layout, Menu} from "antd";
import {Link, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import './MainPage.css';
import PageNotFoundPanel from "../layouts/PageNotFoundPanel.jsx";
import HomePage from "./HomePage.jsx";
import {Meteor} from "meteor/meteor";


const {Header, Content} = Layout;

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gitWebAppTag: "-",
        };
        this.getWebAppGitTag();
        this.setDefaultSelectedKey = this.setDefaultSelectedKey.bind(this);
    }

    getWebAppGitTag() {
        Meteor.call('getWebAppGitTag', (err, res) => {
            if (!err) {
                this.setState({gitWebAppTag: res});
            }
        });
    }

    setDefaultSelectedKey(key) {
        this.setState({
            defaultSelectedKeys: [key]
        })
    }

    render() {

        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 10, width: '100%'}}>
                    <div style={{marginRight: '10px', height: '100%', float: 'left'}}>
                        <Link to="/"> <img src="/logo.png" style={{height: '44px'}}/></Link>
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2">Page 2</Menu.Item>
                        <Menu.Item key="3">Page 3</Menu.Item>
                        <Menu.Item style={{
                            float: "right",
                        }} disabled id="version-label">
                            <span>Web App: {this.state.gitWebAppTag}</span>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px', marginTop: 64}}>
                    <Switch>
                        <Route
                            exact path='/'
                            render={(props) => <HomePage {...props}
                                                         setDefaultSelectedKey={this.setDefaultSelectedKey}/>}
                        />
                        <Route component={PageNotFoundPanel}/>
                    </Switch>
                </Content>
            </Layout>
        );
    }
}
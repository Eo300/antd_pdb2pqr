import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/myheader.css'
import PAGES from './pagenames.js';

import { NavLink, } from 'react-router-dom';

import { Layout, Col, Row, Menu, Icon, Affix, Input } from 'antd';
import { stat } from 'fs';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;
const Search = Input.Search;

/**
 * This is the navbar component. Serves as header for every page
 */
class MyHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
    };
    // this.submenuOnClick = this.submenuOnClick.bind(this);
  }

  onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
    this.setState({ collapsed });
  };  


  createPastJobs(jobid_list){
    let menu_item_list = [];
    for (let jobid of jobid_list){
      // console.log('createPastJobs jobid: '+jobid)
      menu_item_list.push(
        // <Menu.Item
        //   name={PAGES.status}
        //   key={PAGES.status}
        //   onClick={() => this.props.onClick(PAGES.status)}
        // >
        <Menu.Item name={PAGES.status} key={`${PAGES.status}_${jobid}`} onClick={() => this.props.onClick(PAGES.status)} >
          <NavLink to={`/jobstatus?jobid=${jobid}`}> {jobid} </NavLink>
        </Menu.Item>
      )
    }
    return menu_item_list;
  }

  render(){
    // Retrieve stored jobs from storage via WebStorage API
    // let previous_jobs = [null]
    let jobid_list = [
      'wj1v3og6cd',
      '00kuwgjak1',
      'fmud63nmp5',
      'umr7vckmj4',
      '9sfqy18y3w',
    ]
    let previous_jobs = this.createPastJobs(jobid_list)

    let sider_header = 
      <Affix>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={this.props.isMenuCollapsed}
          // collapsedWidth="1"
          onCollapse={(isCollapsed, type) => this.props.onSiderCollapse(isCollapsed, type)}
          className="sidemenu"
        >
          <div className="logo"/>
          <Menu
            theme="dark"
            // mode="horizontal"
            mode="inline"
            // defaultOpenKeys={[PAGES.tools]}
            defaultOpenKeys={this.props.openSubmenus}
            defaultSelectedKeys={[this.props.activeItem]}
            style={{ lineHeight: '64px' }}
          >
            
            <Menu.Item  name={PAGES.home} onClick={() => this.props.onClick(PAGES.home)} key={PAGES.home}>
              <NavLink to="/">
                <Icon type="home"/>
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <SubMenu 
              name={PAGES.tools}
              key={PAGES.tools}
              title={
                <span>
                  <Icon type="tool" />
                  <span>Tools</span>
                </span>
              }
              onTitleClick={() => this.props.submenuOnClick(PAGES.tools)}
            >
              <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} onClick={() => this.props.onClick(PAGES.pdb2pqr)}> <NavLink to="/pdb2pqr">PDB2PQR</NavLink> </Menu.Item>
              <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    onClick={() => this.props.onClick(PAGES.apbs)}> <NavLink to="/apbs">APBS</NavLink> </Menu.Item>
            </SubMenu>
            <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         key={PAGES.about}>         
              <NavLink to="/about">
                <Icon type="team"/>
                <span>About</span>
              </NavLink> 
            </Menu.Item>
            <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} key={PAGES.documentation}> 
              <NavLink to="/documentation">
                <Icon type="book"/>
                <span>Documentation</span>
              </NavLink> 
            </Menu.Item>

            <Menu.Item  name={PAGES.download} onClick={() => this.props.onClick(PAGES.download)} key={PAGES.download}> 
              <NavLink to="/download">
                <Icon type="download"/>
                <span>Download CLI</span>
              </NavLink> 
            </Menu.Item>
  
            {/* <SubMenu
              title={
                <span>
                  <Icon type="schedule"/>
                  <span>Past Jobs</span>
                </span>
              }
              key="job_history"
              children={previous_jobs}
              onTitleClick={() => this.props.submenuOnClick("job_history")}
            /> */}
              {/* {previous_jobs}
            </SubMenu> */}
  
          </Menu>
        </Sider>
      </Affix>  
    // Uses passed navbar_items to fill the navbar (UNUSED)
    // let all_header_items = [];
    // this.props.navbar_items.forEach(function(value, k, map){
    //   // console.log(k)
    //   all_header_items.push(
    //     <Menu.Item onClick={() => this.props.onClick(k)} key={k}>{value}</Menu.Item>
    //   )
    // }); 

    let affixed_header = 
      <Affix offsetTop={0}>
        <Row style={{boxShadow: '2px 4px 10px #00000033' }}>
        <Header >
          <Col offset={2}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.props.activeItem]}
              style={{ lineHeight: '64px' }}
            >
              {/* <Menu.Item>
                <Col  width={4}>
                  <Search
                    placeholder='Search Job ID'
                    style={{width: 200}}
                  />
                </Col>
              </Menu.Item> */}
              
              <Menu.Item  name={PAGES.home}          onClick={() => this.props.onClick(PAGES.home)}          key={PAGES.home}>          <NavLink to="/">Home</NavLink> </Menu.Item>
              <Menu.SubMenu name={PAGES.tools}   key={PAGES.tools}   title={<span>Tools&nbsp;&nbsp;<Icon type="down" /></span>}>
                <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} onClick={() => this.props.onClick(PAGES.pdb2pqr)}> <NavLink to="/pdb2pqr">PDB2PQR</NavLink> </Menu.Item>
                <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    onClick={() => this.props.onClick(PAGES.apbs)}> <NavLink to="/apbs">APBS</NavLink> </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         key={PAGES.about}>         <NavLink to="/about">About</NavLink> </Menu.Item>
              <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} key={PAGES.documentation}> <NavLink to="/documentation">Documentation</NavLink> </Menu.Item>
              
              
              {/* <Menu.Item  name={PAGES.home}          onClick={() => this.props.onClick(PAGES.home)}          href="/" key={PAGES.home}>          Home </Menu.Item>
              <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         href="/about" key={PAGES.about}>         About </Menu.Item>
              <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} href="/documentation" key={PAGES.documentation}> Documentation </Menu.Item>
              
              <Menu.SubMenu name={PAGES.tools}   key={PAGES.tools}   title={<span>Tools&nbsp;&nbsp;<Icon type="down" /></span>}>
                <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} href="/pdb2pqr" onClick={() => this.props.onClick(PAGES.pdb2pqr)}> PDB2PQR </Menu.Item>
                <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    href="/apbs" onClick={() => this.props.onClick(PAGES.apbs)}> APBS </Menu.Item>
              </Menu.SubMenu> */}

            </Menu>
          </Col>
        </Header>
        </Row>
      </Affix>


    return(
      <nav>
        {/* {affixed_header} */}
        {sider_header}
      </nav>
    );
  }
}

export default MyHeader;
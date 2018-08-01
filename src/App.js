import React, { Component } from 'react';
// import logo from './logo.svg';
import MyHeader from './myheader.js';
import MyFooter from './myfooter.js';
import ConfigPDB2PQR from './configpdb2pqr.js';
import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';
// import { Layout, Col, Menu, Icon, Tooltip, Alert } from 'antd';
// const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  constructor(props){
      super(props);
      this.selectJobClick = this.selectJobClick.bind(this);
      // this.handleJobSubmit = this.handleJobSubmit.bind(this);
      this.state = {
          job_type: "navbar_pdb2pqr",
          // job_type: "navbar_home",
          job_submit: false,

          // Maintains state for PDB2PQR configuration in case user hops back and forth
          pdb2pqr_settings: {
              pdb_id: null,
              ff: null,
              output_scheme: null,
          },
          
          // Maintains state for APBS for same purpose as pdb2pqr_settings
          apbs_settings: {

          },
      };
  }

  // onClick handler for user selecting a job. Is passed into child componenets
  selectJobClick(selected_job){
      this.setState({
          job_type: selected_job
      })
  }

  // handleJobSubmit(){
  //   // <Alert message="Success Text" type="success" />
  //   this.setState({
  //     job_submit: true
  //   })
  //   if(this.state.job_submit)
  //     alert("hello world");
  // }

  render() {
    let navbar_options = new Map();
    let content = "";

    navbar_options.set("navbar_home",    "Home");
    navbar_options.set("navbar_pdb2pqr", "PDB2PQR");
    navbar_options.set("navbar_apbs",    "APBS");
    navbar_options.set("navbar_about",   "About");


    // Renders landing page, with choice to do PDB2PQR or APBS
    if (this.state.job_type === "navbar_home" || this.state.job_type === null){
      // return(
      //   <Layout>
      //     <MyHeader
      //       active={this.state.job_type}
      //       onClick={j => this.selectJobClick(j)}            
      //     />

      //   </Layout>
      // )
      content = "You are in Home";
    }
    
    // Renders configuration elements to set up an PDB2PQR job
    else if (this.state.job_type === "navbar_pdb2pqr"){
      // content = "You are in PDB2PQR";
      // content = renderPDB2PQRconfig();
      content = 
        <ConfigPDB2PQR
          // onSubmit={j => this.handleJobSubmit()}
        />
    }
    
    // Renders configuration elements to set up an APBS job
    else if (this.state.job_type === "navbar_apbs"){
      // content = "You are in APBS";
        // return("Selected APBS")
    }

    // This should be unreachable since the state is only changed via a button press
    // else{ return("job_type is invalid. How'd you get here") }

    return(
      <Layout>
        <MyHeader
          activeItem={this.state.job_type}
          navbar_items={navbar_options}
          onClick={j => this.selectJobClick(j)}            
        />
        <Layout>
          {content}
        </Layout>
        <MyFooter />
          {/* <b>If using the PDB2PQR service in a publication, please cite: </b><br/>
          <i>
            Dolinsky TJ, Nielsen JE, McCammon JA, Baker NA. PDB2PQR: an automated pipeline for the setup, execution,<br/>
            and analysis of Poisson-Boltzmann electrostatics calculations. Nucleic Acids Research 32 W665-W667 (2004). </i><br/><br/>
            <Tooltip title="Copy to clipboard" placement="left">
              <Icon style={{ fontSize: 26 }} type="copy" id="copyCitation"/>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Go to paper" placement="right">
              <a href="https://academic.oup.com/nar/article/32/suppl_2/W665/1040494" target="BLANK">
                <Icon style={{ fontSize: 26, color: "#545456" }} type="link" />
              </a>
            </Tooltip> */}
      </Layout>

    )

    // return (
    //   <Layout>
    //     <Header>
    //       <Menu
    //         theme="dark"
    //         mode="horizontal"
    //         defaultSelectedKeys={["navbar_pdb2pqr"]}
    //         style={{ lineHeight: '64px' }}
    //       >
    //         <Menu.Item key="navbar_home"> Home </Menu.Item>
    //         <Menu.Item key="navbar_pdb2pqr"> PDB2PQR </Menu.Item>
    //         <Menu.Item key="navbar_apbs"> APBS </Menu.Item>
    //       </Menu>
    //     </Header>
    //     <Layout>
    //       <Sider width={200} style={{ background: '#fff' }}>
    //         <Menu
    //           // theme="dark"
    //           mode="inline"
    //           defaultSelectedKeys={['which_pdb']}
    //           style={{ height: '100%', borderRight: 0 }}
    //         >
    //           <Menu.Item key="which_pdb"> PDB ID Entry </Menu.Item>
    //           <Menu.Item key="which_ff"> Forcefield </Menu.Item>
    //           <Menu.Item key="which_output"> Output Naming Scheme </Menu.Item>
    //           <Menu.Item key="which_options"> Additional Options </Menu.Item>
    //           <Menu.Item key="which_pka"> pKa Settings (optional) </Menu.Item>
    //           <Menu.Item key="submission"> Start Job </Menu.Item>
    //           {/* <Menu.Item key="submission" style={{ background: '#73d13d' }}> Start Job </Menu.Item> */}
    //         </Menu>
    //       </Sider>
    //       <Layout>
    //         <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
    //           Content goes here
    //         </Content>
    //       </Layout>
    //     </Layout>

    //   </Layout>
    // );
  }
}

export default App;

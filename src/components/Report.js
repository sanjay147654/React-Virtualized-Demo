import React from "react";
import {Table} from "antd";
import "antd/dist/antd.css";
import {InfiniteLoader, List, WindowScroller, AutoSizer} from 'react-virtualized';

const columns = [
  {
    title: 'StationId',
    dataIndex: 'fms_id',
    key: 'fms_id',
  },
  {
    title: 'TimeStamp',
    dataIndex: 'fms_rd_time',
    key: 'fms_rd_time',
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: 'Humidity',
    dataIndex: 'humidity',
    key: 'humidity',
  },
  {
    title: 'PM10',
    dataIndex: 'pm10',
    key: 'pm10',
  }
];

var list = [];

class Report extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      is_data_retrieved : false

    };

  }

  componentDidMount(){

    this.getReportData();

  }

  getReportData(){

    let that = this;

    fetch('http://localhost:3001/get_report',{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(function(Response) {

      return Response.json();
      
		}).then(function(json) {

      list = json;

      that.setState({
        is_data_retrieved : true
      });

    });

  }

  render(){
    
    if(this.state.is_data_retrieved){

      console.warn('got the data')

      return(

        <div className="container">
          <Table dataSource={list} columns={columns} pagination={false} bordered={true}/>
        </div>
  
      );
        
    }
    else{

      console.warn('no data')

      return(

        <div className="container">
          <p>loading...</p>
        </div>
  
      );

    }

  }

}

export default Report;
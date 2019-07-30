import React from "react";
import {Table} from "antd";
import "antd/dist/antd.css";
import ReactDataGrid from "react-data-grid";
import {InfiniteLoader, List, WindowScroller, AutoSizer} from 'react-virtualized';

const columns = [
  {
    name: 'StationId',
    key: 'fms_id'
  },
  {
    name: 'TimeStamp',
    key: 'fms_rd_time'
  },
  {
    name: 'Temperature',
    key: 'temperature'
  },
  {
    name: 'Humidity',
    key: 'humidity'
  },
  {
    name: 'PM10',
    key: 'pm10'
  }
];

class Report extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      is_data_retrieved : false,
      rows:[]

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

      that.setState({
        is_data_retrieved : true,
        rows:json
      });

    });

  }

  render(){
    
    if(this.state.is_data_retrieved){

      console.warn('got the data')

      return (
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          enableCellSelect={false}
          minHeight={650}
          //headerRowHeight={1}
        />
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
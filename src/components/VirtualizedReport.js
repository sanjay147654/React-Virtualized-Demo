import React from 'react';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, VTable } from 'react-virtualized';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  }
});

var rows = [];

const classes = styles;

class VirtualizedReport extends React.Component{

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
  
      rows = json;

      that.setState({
        is_data_retrieved : true
      });
  
    });
  
  }

  headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
    /*const { headerHeight, columns, classes, sort } = this.props;
    /*const direction = {
      [SortDirection.ASC]: "asc",
      [SortDirection.DESC]: "desc"
    };
    return (
      <TableCell
        component="div"
        className={classNames(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        numeric={columns[columnIndex].numeric || false}
      >
        {label}
      </TableCell>
    );*/
  };

  render(){

    if(this.state.is_data_retrieved){

      console.warn('got the data')

     return (
     <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>StationId</TableCell>
            <TableCell align="right">TimeStamp</TableCell>
            <TableCell align="right">Temperature</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">PM10</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.fms_id}>
              <TableCell component="th" scope="row">
                {row.fms_id}
              </TableCell>
              <TableCell align="right">{row.fms_rd_time}</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.pm10}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
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

export default withStyles(styles)(VirtualizedReport);

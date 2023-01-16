import { format, parse } from "date-fns";

import { useEffect, useState } from "react";
import IPriceReportModel from "../../interfaces/IPriceReportModel";
import { carbotService } from "../../pages/api/ServiceInitializer";
import ICarbotLineChart from "./ICarbotLineChart";
import moment from 'moment';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const CarbotLineChart = (props: ICarbotLineChart) => {
  const [rollingMedian, setRollingMedian] = useState<
    IPriceReportModel[] | undefined
  >(undefined);

  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  
  

  useEffect(() => {
    if (props.vehicleId && rollingMedian === undefined) {
      const fetchData = async () => {
        let data = await carbotService.getRollingMedianReport(
          props.vehicleId.toString()
        );
        setRollingMedian(data);
      };
      fetchData();
    }
  }, [props.vehicleId]);

  const options: Highcharts.Options = {
    title: {
      text: ''
    },
    series: [{
        type: 'line',
        name: 'Price',
        data: rollingMedian?.map((item) => [Number(new Date(item.date)), item.price]),
        color: rollingMedian && rollingMedian.length > 0 && rollingMedian[0].price < rollingMedian[rollingMedian.length - 1].price ? 'red' : 'green'
      }],
      xAxis: {
        type: 'datetime'
      },
    
    credits: {
        enabled: false
      },
      
      rangeSelector: {
        buttons: [{
          type: 'day',
          count: 90,
          text: '90D'
        }, {
          type: 'day',
          count: 365,
          text: '365D'
        }],
        selected: 1,
        inputEnabled: false,
        
      },

    tooltip: {
        formatter: function () {
            if(this.series) {
            return '<b>' + this.series.name + '</b><br/>' +
                moment(this.x).format('MM/DD/YYYY') + ': ' +
            
               numberFormat.format(this.y as any) + '<br/>' 
            }
            else return '';
        }
    }
  };

  return (
    <div>
      {rollingMedian && <HighchartsReact highcharts={Highcharts} options={options}  constructorType={'stockChart'} />}
    </div>
  );
};

export default CarbotLineChart;

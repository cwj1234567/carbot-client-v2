
import { AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Axis, LineSeries, Tooltip, XYChart } from "@visx/xychart";
import { format, parse } from "date-fns";

import { useEffect, useState } from "react";
import IPriceReportModel from "../../interfaces/IPriceReportModel";
import { carbotService } from "../../pages/api/ServiceInitializer";
import ICarbotLineChart from "./ICarbotLineChart";

const CarbotLineChart = (props: ICarbotLineChart) => {
  const [rollingMedian, setRollingMedian] = useState<
    IPriceReportModel[] | undefined
  >(undefined);

  interface Datum {
    x: Date;
    y: number;
  }

  const data3: Datum[] = [];

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

  useEffect(() => {
    if (rollingMedian) {
        rollingMedian?.map((x) => {
            let date = new Date(x.date)
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            let formattedDate = year + '-' + month + '-' + day;
            data3.push({x: x.date, y: x.price})
        })
        
    }
    }, [rollingMedian]);


 
 

 

  
  const tickLabelOffset = 10;
  
  const accessors = {
    xAccessor: (d: { x: Date; }) => d.x,
    yAccessor: (d: { y: any; }) => d.y,
};



  return (
   <div>
      <XYChart
        height={270}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#e1e1e1",
            strokeLinecap: "round",
            strokeWidth: 1
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={4}
          tickLabelProps={() => ({ dx: -10 })}
        />

       { data3 &&  <AnimatedLineSeries
          stroke="#008561"
          dataKey="primary_line"
          data={data3}
          {...accessors}
        />
        }

        
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          glyphStyle={{
            fill: "#008561",
            strokeWidth: 0
          }}
          renderTooltip={({ tooltipData }) => {
            return (
              <div>
                { tooltipData && Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                  const [key, value] = lineDataArray;

                  return (
                    <div className="row" key={key}>
                      <div className="date">
                        {accessors.xAccessor(value.datum as any).toString()}
                      </div>
                      <div className="value">
                        <div>
                        {accessors.yAccessor(value.datum as any)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </XYChart>
      </div>
  );
};

export default CarbotLineChart;

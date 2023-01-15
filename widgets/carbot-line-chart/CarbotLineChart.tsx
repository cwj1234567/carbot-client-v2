import { XYChart, AnimatedGrid, AnimatedAxis, AnimatedLineSeries } from "@visx/xychart";
import { format, parse } from "date-fns";
import { Tooltip } from "flowbite-react";

import { useEffect, useState } from "react";
import IPriceReportModel from "../../interfaces/IPriceReportModel";
import { carbotService } from "../../pages/api/ServiceInitializer";
import ICarbotLineChart from "./ICarbotLineChart";

const CarbotLineChart = (props: ICarbotLineChart) => {
  const [rollingMedian, setRollingMedian] = useState<
    IPriceReportModel[] | undefined
  >(undefined);

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

  
  
  const data1 = [
    {
      x: "2018-03-01",
      y: 30
    },
    {
      x: "2018-04-01",
      y: 16
    },
    {
      x: "2018-05-01",
      y: 17
    },
    {
      x: "2018-06-01",
      y: 24
    },
    {
      x: "2018-07-01",
      y: 47
    },
    {
      x: "2018-08-01",
      y: 32
    },
    {
      x: "2018-09-01",
      y: 8
    },
    {
      x: "2018-10-01",
      y: 27
    },
    {
      x: "2018-11-01",
      y: 31
    },
    {
      x: "2018-12-01",
      y: 105
    },
    {
      x: "2019-01-01",
      y: 166
    },
    {
      x: "2019-02-01",
      y: 181
    },
    {
      x: "2019-03-01",
      y: 232
    },
    {
      x: "2019-04-01",
      y: 224
    },
    {
      x: "2019-05-01",
      y: 196
    },
    {
      x: "2019-06-01",
      y: 211
    }
  ];
  
  const tickLabelOffset = 10;
  
  const accessors = {
    xAccessor: (d: { x: any; }) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d: { y: any; }) => d.y
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

        <AnimatedLineSeries
          stroke="#008561"
          dataKey="primary_line"
          data={data1}
          {...accessors}
        />
       
      </XYChart>
      </div>
  );
};

export default CarbotLineChart;
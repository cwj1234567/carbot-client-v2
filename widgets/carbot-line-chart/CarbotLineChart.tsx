import { useEffect, useState } from "react";
import IPriceReportModel from "../../interfaces/IPriceReportModel";
import { carbotService } from "../../pages/api/ServiceInitializer";
import ICarbotLineChart from "./ICarbotLineChart";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CarbotLineChart = (props: ICarbotLineChart) => {
  const [rollingMedian, setRollingMedian] = useState<
    IPriceReportModel[] | undefined
  >(undefined);

  const [chartColor, setChartColor] = useState<string>("#FF0000");

  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    if (props.vehicleId && rollingMedian === undefined) {
      const fetchData = async () => {
        let data = await carbotService.getRollingMedianReport(
          props.vehicleId.toString()
        );
        setRollingMedian(data);
        setChartColor(
          data && data.length > 0 && data[0].price < data[data.length - 1].price
            ? "#FF0000"
            : "#0000FF"
        );
      };
      fetchData();
    }
  }, [props.vehicleId]);

  let options: Highcharts.Options | undefined = undefined;

  if (typeof Highcharts === "object") {
    options = {
      title: {
        text: "",
      },

      series: [
        {
          type: "area",
          name: "Price",
          data: rollingMedian?.map((item) => [
            Number(new Date(item.date)),
            item.price,
          ]),
          color: chartColor,
        },
      ],
      xAxis: {
        type: "datetime",
        crosshair: {
          width: 1,
          zIndex: 7,
          color: "#000000",
        },
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },

      rangeSelector: {
        buttons: [
          {
            type: "day",
            count: 90,
            text: "90D",
          },
          {
            type: "day",
            count: 365,
            text: "365D",
          },
        ],
        selected: 1,
        inputEnabled: false,
      },
      navigator: {
        enabled: false,
      },

      tooltip: {
        shared: true,
        formatter: function () {
          return (
            numberFormat.format(this.y as any) +
            "</b><br/>" +
            moment(this.x).format("MMMM Do YYYY")
          );
        },
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, chartColor], //#0000FF-#4949FF
              [
                1,
                Highcharts.color(chartColor)
                  .setOpacity(0)
                  .get("rgba") as string,
              ],
            ],
          },
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
    };
  }

  return (
    <div>
      {rollingMedian && options && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
};

export default CarbotLineChart;

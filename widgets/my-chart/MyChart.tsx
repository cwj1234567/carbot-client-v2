import { useState } from "react";
import {
  Crosshair,
  DiscreteColorLegend,
  HorizontalGridLines,
  LineSeries,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";

interface IPriceReportModel {
  date: string;
  price: number;
  bidValue?: number;
}

const MyChart = ({ data }: { data: IPriceReportModel[] }) => {
  const [crosshairValues, setCrosshairValues] = useState<IPriceReportModel[]>([]);

  const handleMouseLeave = () => {
    setCrosshairValues([]);
  };

  const handleNearestX = (value: any, { index }: any) => {
    setCrosshairValues([value]);
  };

  const medianPrice = data.map(d => d.price).sort((a, b) => a - b)[Math.floor(data.length / 2)];

  return (
    <div>
      <XYPlot
        xType="time"
        width={800}
        height={400}
        onMouseLeave={handleMouseLeave}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis
          title="Date"
          tickFormat={(val) => new Date(val).getFullYear()}
          tickLabelAngle={-45}
        />
        <YAxis title="Price" />
        <LineSeries
          data={data.map((d) => ({
            x: new Date(d.date).getTime(),
            y: medianPrice
          }))}
          onNearestX={handleNearestX}
        />
        <LineSeries
          data={data.map((d) => ({
            x: new Date(d.date).getTime(),
            y: d.price,
          }))}
          onNearestX={handleNearestX}
        />
        <MarkSeries
          data={data
            .filter((d) => d.bidValue !== undefined)
            .map((d) => ({
              x: new Date(d.date).getTime(),
              y: Number(d.bidValue),
            }))}
          onNearestX={handleNearestX}
        />

        <Crosshair values={crosshairValues}>
          <div style={{ background: "white" }}>
            {crosshairValues.map((cv) => (
              <div key={cv.date}>
                <p>Date: {cv.date}</p>
                <p>Price: {cv.price}</p>
                <p>Bid Value: {cv.bidValue}</p>
              </div>
            ))}
          </div>
        </Crosshair>
      </XYPlot>
      <DiscreteColorLegend
        orientation="horizontal"
        items={[
          { title: "Price", color: "#12939A" },
          { title: "Bid Value", color: "#79C7E3" },
        ]}
      />
    </div>
  );
};

export default MyChart;

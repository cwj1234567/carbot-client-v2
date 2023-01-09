import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "flowbite-react";
import React from "react";
import IDashboardRow from "./IDashboardRow";

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const upArrow = (
    <FontAwesomeIcon icon={faUpLong} style={{ color: "green" }} size="xs" />
  );
  const downArrow = (
   <FontAwesomeIcon icon={faDownLong} style={{ color: "red" }} size="xs" />
  );
  

  const DashboardRow: React.FC<IDashboardRow> = ({ vehicle }) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {vehicle.name}
      </Table.Cell>
      <Table.Cell>
        {formatter
          .format(Math.round(vehicle.medianPrice90Days))
          .toString()
          .replace(".00", "")}
      </Table.Cell>
      <Table.Cell className={vehicle.pctChangeMedianPrice90Days >= 0 ? "text-green-500" : "text-red-500"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {vehicle.pctChangeMedianPrice90Days >= 0 ? upArrow : downArrow}&nbsp;{Math.abs(vehicle.pctChangeMedianPrice90Days * 100).toFixed(1)}%
        </div>
      </Table.Cell>
      <Table.Cell className={vehicle.pctChangeMedianPrice365Days >= 0 ? "text-green-500" : "text-red-500"}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {vehicle.pctChangeMedianPrice365Days >= 0 ? upArrow : downArrow}&nbsp;{Math.abs(vehicle.pctChangeMedianPrice365Days * 100).toFixed(1)}%
        </div>
      </Table.Cell>
      <Table.Cell>{vehicle.volume90Days}</Table.Cell>
    </Table.Row>
  );
  
  
  
  
export default DashboardRow;
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "flowbite-react";
import Link from "next/link";
import React, { memo } from "react";
import IDashboardRow from "./IDashboardRow";


const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const upArrow = (
    <FontAwesomeIcon icon={faCaretUp} className="text-up-green" size="xs" />
  );
  const downArrow = (
   <FontAwesomeIcon icon={faCaretDown} className="text-down-red" size="xs" />
  );
  

  const DashboardRow: React.FC<IDashboardRow> = memo(({vehicle}) => (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
      <Link href={`/vehicle/${vehicle.vehicleId}/${vehicle.vehicleMake} ${vehicle.vehicleModel}`} className="flex align-items-center"><img src={`https://icons.media.carbot.lol/${vehicle.vehicleMake}.svg`} alt="image" className="h-4 w-4 mr-2" />&nbsp;{`${vehicle.vehicleMake} ${vehicle.vehicleModel}`}</Link>
      </Table.Cell>
      <Table.Cell>
        {formatter
          .format(Math.round(vehicle.medianPrice90d))
          .toString()
          .replace(".00", "")}
      </Table.Cell>
      <Table.Cell className={vehicle.pctChange90d >= 0 ? "text-up-green" : "text-down-red"}>
        <div className="flex items-center">
          {vehicle.pctChange90d >= 0 ? upArrow : downArrow}&nbsp;{Math.abs(vehicle.pctChange90d * 100).toFixed(1)}%
        </div>
      </Table.Cell>
      <Table.Cell className={vehicle.pctChange365d >= 0 ? "text-up-green" : "text-down-red"}>
        <div className="flex items-center">
          {vehicle.pctChange365d >= 0 ? upArrow : downArrow}&nbsp;{Math.abs(vehicle.pctChange365d * 100).toFixed(1)}%
        </div>
      </Table.Cell>
      <Table.Cell>{formatter
          .format(Math.round(vehicle.volume90d))
          .toString()}
      </Table.Cell>
    </Table.Row>
  ));
  
export default DashboardRow;

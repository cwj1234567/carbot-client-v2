import { Dropdown, Table } from "flowbite-react";
import { Tooltip } from "flowbite-react";
import { useState } from "react";
import { carbotService } from "./api/ServiceInitializer";
import IDashboardModel from "../interfaces/IDashboardModel";
import DashboardRow from "../components/dashboard-row/DashboardRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export const getServerSideProps = async () => {
  const dashboard = await carbotService.getDashboard();
  const makes = await carbotService.getMakes();
  return {
    props: {
      dashboard,
      makes,
    },
  };
};

export default function Home({
  dashboard: initialDashboard,
  makes: initialMakes,
}: {
  dashboard: IDashboardModel[];
  makes: string[];
}) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [makes] = useState(initialMakes);
  const [selectedMake, setSelectedMake] = useState<string>("All Vehicles");

  async function getDashboardByMake(make: string) {
    let data;
    if (make === "All Vehicles") {
      data = await carbotService.getDashboard();
    } else {
      data = await carbotService.getDashboardByMake(make);
    }
    setDashboard(data);
    setSelectedMake(make);
  }

  return (
    <>
        <div className="mt-1 mb-1 border-b border-[#E5E7EB] text-xs">
          <div className="mt-3 mb-3  ml-3 mr-3 text-gray-600 ">
          <Dropdown label={selectedMake} color={"gray"} size="xs" inline={true}>
            {selectedMake !== "All Vehicles" && (
              <Dropdown.Item onClick={() => getDashboardByMake("All Vehicles")}>
                All Vehicles
              </Dropdown.Item>
            )}
            {makes.map((make) => (
              <>
                {selectedMake !== make && (
                  <Dropdown.Item onClick={() => getDashboardByMake(make)}>
                    {make}
                  </Dropdown.Item>
                )}
              </>
            ))}
          </Dropdown>
          </div>
        </div>
        <div className="h-auto overflow-auto">
        <Table className="w-full text-left text-xs text-gray-500 dark:text-gray-400 mt-3 shadow" hoverable={true}>
          <Table.Head className="text-xs">
            <Table.HeadCell>Vehicle</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center">
                Price (90D)&nbsp;
                <Tooltip
                  content={
                    <span style={{ textTransform: "none" }}>
                      The median price of all sales that have occurred in the
                      past 90 days (RMD 90) 😉
                    </span>
                  }
                  animation="duration-500"
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ color: "#A6B0C3" }}
                  />
                </Tooltip>
              </div>
            </Table.HeadCell>
            <Table.HeadCell>90D %</Table.HeadCell>
            <Table.HeadCell>1y %</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center">
                Volume (90D)&nbsp;
                <Tooltip
                  content={
                    <span style={{ textTransform: "none" }}>
                      The cumulative sum of all sales that have occurred in the last 90 days
                    </span>
                  }
                  animation="duration-500"
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ color: "#A6B0C3" }}
                  />
                </Tooltip>
              </div>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {dashboard?.map((vehicle) => (
              <>
                <DashboardRow vehicle={vehicle} />
              </>
            ))}
          </Table.Body>
        </Table>
        </div>
    
    </>
  );
}

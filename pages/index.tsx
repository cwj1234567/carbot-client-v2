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
       <div className="mx-auto w-11/12 ">
        <div className="border-b border-gray-100  text-l">
          <div className="mb-3 mt-3 ml-3 mr-3">
          🚗🤖&nbsp;carbot.lol
          </div >
        </div>
        <div className="mt-3 mb-3 text-xs">
          <Dropdown label={selectedMake} color={"gray"} size="xs">
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

        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Vehicle</Table.HeadCell>
            <Table.HeadCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                "Price"&nbsp;
                <Tooltip
                  content={
                    <span style={{ textTransform: "none" }}>
                      The median price of all sales that have occurred in the
                      past 90 days
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
            <Table.HeadCell>90d</Table.HeadCell>
            <Table.HeadCell>365d</Table.HeadCell>
            <Table.HeadCell>
              <div style={{ display: "flex", alignItems: "center" }}>
                Volume&nbsp;
                <Tooltip
                  content={
                    <span style={{ textTransform: "none" }}>
                      The number of sales that have been recorded in the past 90
                      days
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

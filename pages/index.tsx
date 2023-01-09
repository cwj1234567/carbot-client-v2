import { Dropdown, Footer, Navbar, Table } from "flowbite-react";
import { Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { vehicleService } from "./api/ServiceInitializer";
import IDashboardModel from "../interfaces/IDashboardModel";
import DashboardRow from "../components/dashboard-row/DashboardRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [dashboard, setDashboard] = useState<IDashboardModel[] | undefined>();
  const [makes, setMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>("All Vehicles");

  useEffect(() => {
    const fetchData = async () => {
      setDashboard(await vehicleService.getDashboard());
      setMakes(await vehicleService.getMakes());
    };
    fetchData();
  }, []);

  function getDashboardByMake(make: string) {
    if (make === "All Vehicles") {
      vehicleService.getDashboard().then((data) => setDashboard(data));
      setSelectedMake(make);
      return;
    }
    vehicleService.getDashboardByMake(make).then((data) => setDashboard(data));
    setSelectedMake(make);
  }

  return (
    <>
      <Navbar fluid={true} rounded={true} className="bg-[#F9FAFB]">
        <Navbar.Brand href="https://carbot.lol">
          🚗🤖&nbsp;
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            carbot
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Vehicles
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <div className="flex justify-center ">
        <div className="w-11/12 text-center items-center content-center self-center">
          <div className="mt-5 mb-2">
            <Dropdown label={selectedMake} color={"gray"} size="xs">
              {selectedMake !== "All Vehicles" && (
                <Dropdown.Item
                  onClick={() => getDashboardByMake("All Vehicles")}
                >
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
                  Price&nbsp;
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
                        The number of sales that have been recorded in the past
                        90 days
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
      </div>
      <Footer container={true}>
        <div className="w-full text-center">
          <Footer.Copyright href="#" by="CARBOT" year={2023} />
        </div>
      </Footer>
    </>
  );
}

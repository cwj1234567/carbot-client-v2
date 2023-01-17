import { NextPage } from "next";
import { useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import HyperButtonGroup from "../../../components/hyper-button-group/HyperButtonGroup";
import HyperButton from "../../../components/hyper-button/HyperButton";
import StatCard from "../../../components/stat-card/StatCard";
import IVehicleModel from "../../../interfaces/IVehicleModel";
import AuctionTable from "../../../widgets/auction-table/AuctionTable";
import CarbotLineChart from "../../../widgets/carbot-line-chart/CarbotLineChart";
import { carbotService } from "../../api/ServiceInitializer";

const VehiclePage: NextPage<{ vehicle: IVehicleModel }> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState<string>("price");

  return (
    <>
      {vehicle && (
        <>
          <div className="mt-3 mb-3 ml-3 mr-3">
            <Breadcrumb>
              <BreadcrumbItem text="Vehicles" href="/" />
              <BreadcrumbItem
                text={`${vehicle.vehicleMake} ${vehicle.vehicleModel}`}
              />
            </Breadcrumb>
          </div>

          <nav className="flex border-b border-t border-[#E5E7EB] text-xs font-medium mt-2 text-gray-600">
            <a
              href=""
              className={`-mb-px border-b ${
                activeTab === "price"
                  ? "border-current text-[#1A56DB]"
                  : "border-transparent"
              } p-3 `}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("price");
              }}
            >
              Price
            </a>
            <a
              href=""
              className={`-mb-px border-b ${
                activeTab === "volume"
                  ? "border-current text-[#1A56DB]"
                  : "border-transparent"
              } p-3 `}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("volume");
              }}
            >
              Volume
            </a>
            <a
              href=""
              className={`-mb-px border-b ${
                activeTab === "insights"
                  ? "border-current text-[#1A56DB]"
                  : "border-transparent"
              } p-3 `}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("insights");
              }}
            >
              Insights
            </a>
            <a
              href=""
              className={`-mb-px border-b ${
                activeTab === "data"
                  ? "border-current text-[#1A56DB]"
                  : "border-transparent"
              } p-3 `}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("data");
              }}
            >
              Data
            </a>
          </nav>

          {activeTab === "price" ? (
            <div className="flex flex-col mb-6 overflow-x-auto">
              <div className="items-center justify-items-center ml-3 mr-3 overflow-x-auto">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                  <div className="row-span-1">
                    <StatCard text="asdf" />
                  </div>
                  <div className="row-span-1">
                    {/* <StatCard text="asdf" /> */}
                  </div>
                </div>
              </div>
              <div className="h-full items-center text-center col-span-4 overflow-x-auto ml-2 mr-2">
                <CarbotLineChart vehicleId={vehicle.vehicleId} />
                <div className="mt-2 mb-3">
                  <HyperButtonGroup>
                    <HyperButton
                      text="90d"
                      onClick={function (): void {
                        console.log("Function not implemented.");
                      }}
                    />
                    <HyperButton
                      text="365d"
                      onClick={function (): void {
                        console.log("Function not implemented.");
                      }}
                    />
                    <HyperButton
                      text="All"
                      onClick={function (): void {
                        console.log("Function not implemented.");
                      }}
                    />
                  </HyperButtonGroup>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <AuctionTable vehicleId={vehicle.vehicleId} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: {
  params: { vehicleid: string };
}) => {
  const vehicle = await carbotService.getVehicle(ctx.params.vehicleid);
  return {
    props: {
      vehicle,
    },
  };
};

export default VehiclePage;

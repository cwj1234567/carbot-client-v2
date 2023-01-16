import { NextPage } from "next";
import { useEffect, useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import HyperButtonGroup from "../../../components/hyper-button-group/HyperButtonGroup";
import HyperButton from "../../../components/hyper-button/HyperButton";
import StatCard from "../../../components/stat-card/StatCard";
import IPriceReportModel from "../../../interfaces/IPriceReportModel";
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
              <div className="flex w-full mt-6 mb-6">
                <div className="w-full h-full items-center text-center basis-2/3">
                  <div><HyperButtonGroup>
                    <HyperButton text="90d" onClick={function (): void {
                    console.log("Function not implemented.");
                  } } />
                    <HyperButton text="365d" onClick={function (): void {
                    console.log("Function not implemented.");
                  } } />
                    <HyperButton text="All" onClick={function (): void {
                    console.log("Function not implemented.");
                  } } />
                  </HyperButtonGroup>
                  <CarbotLineChart vehicleId={vehicle.vehicleId} />
                </div>
                </div>
                <div className="w-full items-center basis-1/3 ml-6 mr-6">
                  <StatCard text="asdf"/>
                  <StatCard text="asdf"/>
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

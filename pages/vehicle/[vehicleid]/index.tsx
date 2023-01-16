import { NextPage } from "next";
import { useEffect, useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import IPriceReportModel from "../../../interfaces/IPriceReportModel";
import IVehicleModel from "../../../interfaces/IVehicleModel";
import AuctionTable from "../../../widgets/auction-table/AuctionTable";
import CarbotLineChart from "../../../widgets/carbot-line-chart/CarbotLineChart";
import { carbotService } from "../../api/ServiceInitializer";

const VehiclePage: NextPage<{ vehicle: IVehicleModel }> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");

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
                  activeTab === "overview"
                    ? "border-current text-[#1A56DB]"
                    : "border-transparent"
                } p-3 `}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("overview");
                }}
              >
                Overview
              </a>
              <a
                href=""
                className={`-mb-px border-b ${
                  activeTab === "records"
                    ? "border-current text-[#1A56DB]"
                    : "border-transparent"
                } p-3 `}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("records");
                }}
              >
                Records
              </a>
            </nav>

            {activeTab === "overview" ? (
              <div className="flex w-full mt-6 mb-6">
                <div className="w-full items-center text-center">
                  <CarbotLineChart vehicleId={vehicle.vehicleId} />
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

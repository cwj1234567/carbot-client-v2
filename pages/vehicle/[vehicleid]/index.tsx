import { NextPage } from "next";
import { useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import IVehicleModel from "../../../interfaces/IVehicleModel";
import AuctionTable from "../../../widgets/auction-table/AuctionTable";
import { carbotService } from "../../api/ServiceInitializer";

const VehiclePage: NextPage<{ vehicle: IVehicleModel }> = ({ vehicle }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <>
      <div className="mx-auto w-11/12 ">
        <div className="border-b border-gray-100  text-l">
          <div className="mb-3 mt-3 ml-3 mr-3">
          🚗🤖&nbsp;carbot.lol
          </div >
        </div>
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

            <nav className="flex border-b border-t border-gray-100 text-xs font-medium mt-2">
              <a
                href=""
                className={`-mb-px border-b ${
                  activeTab === "overview"
                    ? "border-current text-[#1A56DB]"
                    : "border-transparent"
                } p-4 `}
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
                } p-4 `}
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
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-1/4"></div>
                <div className="divider divider-horizontal border-r"></div>
                <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center w-3/4">
                  and here is a chart 📈
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
      </div>
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

import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import HyperButtonGroup from "../../../components/hyper-button-group/HyperButtonGroup";
import HyperButton from "../../../components/hyper-button/HyperButton";
import StatCard from "../../../components/stat-card/StatCard";
import IPriceReportModel from "../../../interfaces/IPriceReportModel";
import AuctionTable from "../../../widgets/auction-table/AuctionTable";
import CarbotLineChart from "../../../widgets/carbot-line-chart/CarbotLineChart";
import { carbotService } from "../../api/ServiceInitializer";

const VehiclePage: NextPage = () => {
  const router = useRouter();
  const { vehicleId, vehicleName } = router.query;

  const [activeTab, setActiveTab] = useState<string>("price");
  const [rollingMedian, setRollingMedian] = useState<
    IPriceReportModel[] | undefined
  >(undefined);
  const [statDate, setStatDate] = useState<string | undefined>(undefined);

  const [currentPrice, setCurrentPrice] = useState<number | undefined>(
    undefined
  );
  const [percentChange, setPercentChange] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (vehicleId) {
      const fetchRollingMedian = async () => {
        let data = await carbotService.getRollingMedianReport(
          vehicleId.toString()
        );
        setRollingMedian(data);
        setCurrentPrice(data[0].price);
        setPercentChange(
          ((data[0].price - data[data.length - 1].price) /
            data[data.length - 1].price) *
            100
        );
        setStatDate(data[data.length - 1].date.toString());
      };
      fetchRollingMedian();
    }
  }, [vehicleId]);

  return (
    <>
      <div className="mt-3 mb-3 ml-3 mr-3">
        <Breadcrumb>
          <BreadcrumbItem text="Vehicles" href="/" />
          <BreadcrumbItem text={`${vehicleName}`} />
        </Breadcrumb>
      </div>

      <nav className="flex border-b border-t border-[#E5E7EB] text-xs font-medium mt-2 text-gray-600">
        <a
          href=""
          className={`-mb-px  ${
            activeTab === "price"
              ? "border-b-2 border-current font-black"
              : "border-b border-transparent"
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
          className={`-mb-px  ${
            activeTab === "volume"
              ? "border-b-2 border-current font-black"
              : "border-b border-transparent"
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
          className={`-mb-px  ${
            activeTab === "insights"
              ? "border-b-2 border-current font-black"
              : "border-b border-transparent"
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
          className={`-mb-px  ${
            activeTab === "data"
              ? "border-b-2 border-current font-black"
              : "border-b border-transparent"
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
        <>
          <div className="text-2xl font-medium text-gray-900 mt-6 mb-2 ml-2 flex items-center">
            <img
              src="https://icons.media.carbot.lol/Porsche.svg"
              alt="image"
              className="h-8 w-8 mr-2"
            />
            Porsche 996
          </div>
          <div className="flex flex-col md:flex-row w-full p-4">
            <div className="md:basis-96">
              <div className="flex items-center text-sm text-gray-500 mt-4">
                90-Day Stats
              </div>
              <div className="p-4 md:mt-4 w-full flex flex-col">
                <div className="border-b">
                  <div className="mb-4">
                    {currentPrice && percentChange && statDate && (
                      <>
                        <StatCard
                          title="Median Price"
                          value={currentPrice}
                          subtitle={``}
                          cash={true}
                          percentage={percentChange}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="border-b">
                  <div className="mb-4 mt-4">
                    {currentPrice && percentChange && statDate && (
                      <>
                        <StatCard
                          title="Sales Volume"
                          value={2604920}
                          subtitle={``}
                          cash={true}
                          percentage={percentChange}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-1">
                  {currentPrice && percentChange && statDate && (
                    <>
                      <StatCard
                        title="Vehicles Sold"
                        value={21}
                        subtitle={``}
                        cash={false}
                        percentage={percentChange}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="basis-full">
              <div className="flex items-center text-sm text-gray-500 mt-4">
                Price History
              </div>
              <div className="mt-4 flex flex-col">
                <div className="items-center text-center col-span-4 overflow-x-auto md:mt-6">
                  {rollingMedian && (
                    <>
                      <CarbotLineChart priceReport={rollingMedian} />
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 mb-3 grid place-items-center">
                <HyperButtonGroup>
                  <HyperButton
                    text="90d"
                    onClick={function (): void {
                      console.log("Function not implemented.");
                    }}
                  />
                  <HyperButton
                    text="1y"
                    onClick={function (): void {
                      console.log("Function not implemented.");
                    }}
                  />
                  <HyperButton
                    text="3y"
                    onClick={function (): void {
                      console.log("Function not implemented.");
                    }}
                  />
                </HyperButtonGroup>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <AuctionTable vehicleId={parseInt(vehicleId as string)} />
          </div>
        </>
      )}
    </>
  );
};

export default VehiclePage;

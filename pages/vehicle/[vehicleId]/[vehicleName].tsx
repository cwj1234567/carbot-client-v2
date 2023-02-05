import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadcrumbItem from "../../../components/breadcrumb/breadcrum-item/BreadcrumItem";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import HyperButtonGroup from "../../../components/hyper-button-group/HyperButtonGroup";
import HyperButton from "../../../components/hyper-button/HyperButton";
import StatCard from "../../../components/stat-card/StatCard";
import IPriceReportModel from "../../../interfaces/IPriceReportModel";
import IStatModel from "../../../interfaces/IStatModel";
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

  const [priceStat, setPriceStat] = useState<IStatModel | undefined>(undefined);
  const [transactionStat, setTransactionStat] = useState<
    IStatModel | undefined
  >(undefined);
  const [volumeStat, setVolumeStat] = useState<IStatModel | undefined>(
    undefined
  );

  const [vehicleMake, setVehicleMake] = useState<string | undefined>(undefined);

  const [selectedReport, setSelectedReport] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (vehicleId) {

      const fetchPriceStat = async () => {
        let priceStat = await carbotService.getStat(vehicleId.toString(), "1");
        setPriceStat(priceStat);
      };
      fetchPriceStat();

      const fetchVolumeStat = async () => {
        let volumeStat = await carbotService.getStat(vehicleId.toString(), "2");
        setVolumeStat(volumeStat);
      };
      fetchVolumeStat();

      const fetchTransactionStat = async () => {
        let transactionStat = await carbotService.getStat(
          vehicleId.toString(),
          "3"
        );
        setTransactionStat(transactionStat);
      };
      fetchTransactionStat();
    }
  }, [vehicleId]);

  useEffect(() => {
    if (typeof vehicleName === "string") {
      const arr = (vehicleName as string).split(" ");
      setVehicleMake(arr[0]);
    }
  }, [vehicleName]);

  useEffect(() => {
    if (
      selectedReport === "90d" ||
      selectedReport === "1yr" ||
      selectedReport === "3yr"
    ) {
      const fetchRollingMedian = async () => {
        let data;
        if (selectedReport === "90d" && vehicleId) {
          data = await carbotService.get90DayPriceReport(vehicleId.toString());
        } else if (selectedReport === "1yr" && vehicleId) {
          data = await carbotService.get1yrPriceReport(vehicleId.toString());
        } else if (selectedReport === "3yr" && vehicleId) {
          data = await carbotService.get3yrPriceReport(vehicleId.toString());
        }

        setRollingMedian(data);
      };

      if (selectedReport && vehicleId) {
        fetchRollingMedian();
      }
    }
  }, [selectedReport, vehicleId]);

  interface ReportProps {
    priceReport: any;
  }

  function Report90d({ priceReport }: ReportProps) {
    return <CarbotLineChart priceReport={priceReport}/>;
  }

  function Report1yr({ priceReport }: ReportProps) {
    return <CarbotLineChart priceReport={priceReport}/>;
  }

  function Report3yr({ priceReport }: ReportProps) {
    return <CarbotLineChart priceReport={priceReport}/>;
  }

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
          Overview
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
          Transactions
        </a>
      </nav>

      {activeTab === "price" ? (
        <>
          <div className="text-2xl font-medium text-gray-900 mt-6 mb-2 ml-2 flex items-center">
            {vehicleMake && (
              <img
                src={`https://icons.media.carbot.lol/${vehicleMake}.svg`}
                alt="image"
                className="h-8 w-8 mr-2"
              />
            )}
            {`${vehicleName}`}
          </div>
          <div className="flex flex-col md:flex-row w-full p-4">
            <div className="md:basis-96">
              <div className="flex items-center text-sm text-gray-500">
                90-Day Stats
              </div>
              <div className="p-4 md:mt-4 w-full flex flex-col">
                <div className="border-b">
                  <div className="mb-4">
                    {priceStat && (
                      <>
                        <StatCard
                          title="Median Price"
                          value={priceStat.value}
                          subtitle={``}
                          cash={true}
                          percentage={priceStat.percentage}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="border-b">
                  <div className="mb-4 mt-4">
                    {volumeStat && (
                      <>
                        <StatCard
                          title="Sales Volume"
                          value={volumeStat.value}
                          subtitle={``}
                          cash={true}
                          percentage={volumeStat.percentage}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-1">
                  {transactionStat && (
                    <>
                      <StatCard
                        title="Transactions"
                        value={transactionStat.value}
                        subtitle={``}
                        cash={false}
                        percentage={transactionStat.percentage}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="basis-full">
              <div className="flex items-center text-sm text-gray-500">
                Price History
              </div>
              <div className="mt-4 flex flex-col">
                <div className="items-center text-center col-span-4 overflow-x-auto md:mt-6">
                  {rollingMedian && (
                    <>
                      {selectedReport === "90d" && (
                        <Report90d priceReport={rollingMedian} />
                      )}
                      {selectedReport === "1yr" && (
                        <Report1yr priceReport={rollingMedian} />
                      )}
                      {selectedReport === "3yr" && (
                        <Report3yr priceReport={rollingMedian} />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 mb-3 grid place-items-center">
                <HyperButtonGroup>
                  <HyperButton
                    text="90d"
                    onClick={function (): void {
                      setSelectedReport("90d");
                    }}
                    active={selectedReport === "90d"}
                  />
                  <HyperButton
                    text="1y"
                    onClick={function (): void {
                      setSelectedReport("1yr");
                    }}
                    active={selectedReport === "1yr"}
                  />
                  <HyperButton
                    text="3y"
                    onClick={function (): void {
                      setSelectedReport("3yr");
                    }}
                    active={selectedReport === "3yr"}
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

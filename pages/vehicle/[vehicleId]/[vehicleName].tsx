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
import IStatResponse from "../../../interfaces/responses/IStatResponse";
import AuctionTable from "../../../widgets/auction-table/AuctionTable";
import CarbotLineChart from "../../../widgets/carbot-line-chart/CarbotLineChart";
import { carbotService } from "../../api/ServiceInitializer";

const VehiclePage: NextPage = () => {
  const router = useRouter();
  const { vehicleId, vehicleName } = router.query;

  const [activeTab, setActiveTab] = useState<string>("price");
 
  const [stat, setStat] = useState<IStatResponse | undefined>(undefined);
  
  const [vehicleMake, setVehicleMake] = useState<string | undefined>(undefined);

  const [selectedReport, setSelectedReport] = useState<string | undefined>(undefined);
  const [s90dReport, sets90dReport] = useState<IPriceReportModel[] | undefined>(undefined);
  const [s1yrReport, sets1yrReport] = useState<IPriceReportModel[] | undefined>(undefined);
  const [s3yrReport, sets3yrReport] = useState<IPriceReportModel[] | undefined>(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  useEffect(() => {
    if (vehicleId) {

      const fetchReport = async () => {
        setIsLoading(true);
        sets90dReport(await carbotService.get90DayPriceReport(vehicleId.toString()));
        setIsLoading(false);
      };
    
      fetchReport();

      const fetchStat = async () => {
        let stat = await carbotService.getStat(vehicleId.toString());
        setStat(stat);
      };
      fetchStat();
    }
  }, [vehicleId]);

  useEffect(() => {
    if (typeof vehicleName === "string") {
      const arr = (vehicleName as string).split(" ");
      setVehicleMake(arr[0]);
    }
  }, [vehicleName]);

  interface ReportProps {
    vehicleId: any;
  }

  function Report90d({ vehicleId }: ReportProps) {

    if (s90dReport) return <CarbotLineChart priceReport={s90dReport} />;
    if (isLoading) return <></>;
  
    return <></>;
  }
  
  if(selectedReport===undefined)
  {
    setSelectedReport("90d");
  }

  function Report1Yr({ vehicleId }: ReportProps) {
    if(s1yrReport)
      return <CarbotLineChart priceReport={s1yrReport}/>;

    const fetchReport = async () => {
      sets1yrReport(await carbotService.get1yrPriceReport(vehicleId.toString()));
    }
    fetchReport();
    return <></>;
  }

  function Report3Yr({ vehicleId }: ReportProps) {
    if(s3yrReport)
      return <CarbotLineChart priceReport={s3yrReport}/>;

    const fetchReport = async () => {
      sets3yrReport(await carbotService.get3yrPriceReport(vehicleId.toString()));
    }
    fetchReport();
    return <></>;
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
                    {stat && (
                      <>
                        <StatCard
                          title="Median Price"
                          value={stat.price.currentValue}
                          subtitle={``}
                          cash={true}
                          percentage={stat.price.percentageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="border-b">
                  <div className="mb-4 mt-4">
                    {stat && (
                      <>
                        <StatCard
                          title="Sales Volume"
                          value={stat.volume.currentValue}
                          subtitle={``}
                          cash={true}
                          percentage={stat.volume.percentageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-1">
                  {stat && (
                    <>
                      <StatCard
                        title="Transactions"
                        value={stat.transactions.currentValue}
                        subtitle={``}
                        cash={false}
                        percentage={stat.transactions.percentageChange}
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
                  {vehicleId && (
                    <>
                      {selectedReport === "90d" && (
                        <Report90d vehicleId={vehicleId} />
                      )}
                      {selectedReport === "1yr" && (
                        <Report1Yr vehicleId={vehicleId} />
                      )}
                      {selectedReport === "3yr" && (
                        <Report3Yr vehicleId={vehicleId} />
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

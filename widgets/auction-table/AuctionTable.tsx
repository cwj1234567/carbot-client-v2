import { Table } from "flowbite-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import IAuctionModel from "../../interfaces/IAuctionModel";
import { carbotService } from "../../pages/api/ServiceInitializer";
import parseDate from "../../utils/ParseDate";
import IAuctionTable from "./IAuctionTable";

const AuctionTable = observer(({ vehicleId }: IAuctionTable) => {
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [] = useState<string | null>(null);
  const [auctionList, setAuctionList] = useState<IAuctionModel[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getAuctionList = async () => {

    let auctions = await carbotService.getAuctions(
      vehicleId.toString(),
      nextPage as string
    );

    setAuctionList([...auctionList, ...auctions.items]);

    if (auctions.nextPage !== null && auctions.nextPage !== undefined)
      setNextPage(auctions.nextPage);
    else setHasMore(false);
  };

  useEffect(() => {
    if (auctionList?.length == 0) getAuctionList();
  }, []);

  return (
    
    <>

{(auctionList?.length > 0) && (
    <><InfiniteScroll dataLength={auctionList.length} hasMore={hasMore} next={async () => { getAuctionList(); } } loader={<b></b>}>
          <Table className="mt-3 shadow content-center text-xs">
            <Table.Head>
              <Table.HeadCell>date</Table.HeadCell>
              <Table.HeadCell>year</Table.HeadCell>
              <Table.HeadCell>model</Table.HeadCell>
              <Table.HeadCell>price</Table.HeadCell>
              <Table.HeadCell>source</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {auctionList.map((item: IAuctionModel) => (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{parseDate(item.endDate)}</Table.Cell>
                  <Table.Cell>{item.year}</Table.Cell>
                  <Table.Cell>{item.model}</Table.Cell>
                  <Table.Cell>
                    {formatter
                      .format(item.bidValue)
                      .toString()
                      .replace(".00", "")}
                  </Table.Cell>
                  <Table.Cell>
                    <a href={item.auctionUrl} target="_blank">
                      {item.marketplace}
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          </InfiniteScroll>
        </>
      )}
    </>
  );
});

export default AuctionTable;

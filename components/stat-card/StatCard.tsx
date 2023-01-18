import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "flowbite-react";
import IStatCard from "./IStatCard";

const upArrow = (
  <FontAwesomeIcon
    icon={faCaretUp}
    style={{ color: "white" }}
    size="sm"
    className="ml-1 mr-1"
  />
);
const downArrow = (
  <FontAwesomeIcon
    icon={faCaretDown}
    style={{ color: "white" }}
    size="sm"
    className="mr-1"
  />
);

const StatCard: React.FC<IStatCard> = ({}) => (
  <>
    <article className="rounded-lg lg:border bg-white ml-2 mt-6 mb-6">
      <div>
        <div className="flex items-center text-sm text-gray-500">
          Price (90D)
          <Tooltip
            content={
              <span>
                The median price of all sales that have occurred in the past 90
                days (RMD 90) 😉
              </span>
            }
            animation="duration-500"
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-cool-gray-500 ml-1"
            />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <p className="text-2xl font-medium text-gray-900 ml-1">$26,500</p>
          <span>
            {" "}
            <div className="focus:outline-none text-white bg-down-red font-xs rounded-lg text-xs px-2 py-1 mr-1 ml-2">
              {downArrow} 67.81%
            </div>
          </span>
        </div>
      </div>

      <div className="text-gray-400 ml-3 mt-0.5 font-thin text-xs">
        Since 1/18/2022
      </div>
    </article>
  </>
);

export default StatCard;

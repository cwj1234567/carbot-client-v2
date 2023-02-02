import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "flowbite-react";
import IStatCard from "./IStatCard";

const upArrow = (
  <FontAwesomeIcon icon={faCaretUp} size="sm" className="mr-1 text-white" />
);
const downArrow = (
  <FontAwesomeIcon icon={faCaretDown} size="sm" className="mr-1 text-white" />
);

const StatCard: React.FC<IStatCard> = ({
  title,
  value,
  subtitle,
  percentage,
}) => (
  <>
    <article className="rounded-lg lg:border bg-white">
      <div>
        <div className="flex items-center text-sm text-gray-500">
          {title}
        </div>
        <div className="flex items-center">
          <p className="text-2xl font-medium text-gray-900">
            {formatter.format(value)}
          </p>

          <span>
            {" "}
            <div
              className={`focus:outline-none text-white font-xs rounded-lg text-xs px-2 py-1 mr-1 ml-2 ${
                percentage > 0 ? "bg-up-green" : "bg-down-red"
              }`}
            >
              <div className="flex items-center">
                {percentage > 0 ? upArrow : downArrow}&nbsp;
                {Math.abs(percentage).toFixed(1)}%
              </div>
            </div>
          </span>
        </div>
      </div>

      <div className="text-gray-400 ml-3 mt-0.5 font-thin text-xs">
        {subtitle}
      </div>
    </article>
  </>
);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export default StatCard;

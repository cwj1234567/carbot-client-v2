import {
  faCaretDown,
  faCaretUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IStatCard from "./IStatCard";

const upArrow = (
  <FontAwesomeIcon icon={faCaretUp} size="sm" className="mr-1 text-up-green" />
);
const downArrow = (
  <FontAwesomeIcon icon={faCaretDown} size="sm" className="mr-1 text-down-red" />
);

const StatCard: React.FC<IStatCard> = ({
  title,
  value,
  subtitle,
  percentage,
  cash,
}) => (
  <>
    <article className=" bg-white">
      <div>
        <div className="flex items-center text-sm text-gray-500">
          {title}
        </div>
        <div className="flex items-center">
          <p className="text-xl font-medium text-gray-900">
            {cash && formatter.format(value)}
            {!cash && value}
          </p>

          <span>
            {" "}
            <div
              className={`focus:outline-none text-red font-xs rounded-lg text-xs ml-2 mt-2 ${
                percentage < 0 ? "text-down-red" : "text-up-green"
              }`}
            >
              <div className="flex items-center">
                {percentage < 0 ? downArrow : upArrow }&nbsp;
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

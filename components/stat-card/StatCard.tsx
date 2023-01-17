import IStatCard from "./IStatCard";

const StatCard: React.FC<IStatCard> = ({
}) => (
  <>
  <article className="rounded-lg lg:border bg-white ml-2 mt-6 mb-6">
  <div>
    <p className="text-sm text-gray-500">Price</p>

    <p className="text-2xl font-medium text-gray-900">$26,500</p>
  </div>

  <div className="mt-1 flex gap-1 text-green-600">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>

    <p className="flex gap-2 text-xs">
      <span className="font-medium"> 67.81% </span>

      <span className="text-gray-500"> Past 365 days </span>
    </p>
  </div>
</article>

  </>
);

export default StatCard;
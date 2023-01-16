import IHyperButtonGroup from "./IHyperButtonGroup";

const Breadcrumb: React.FC<IHyperButtonGroup> = ({ children }) => (
  <>
    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
      {children?.map((child: any, index: any) => (
        <>{child}</>
      ))}
    </span>
  </>
);

export default Breadcrumb;

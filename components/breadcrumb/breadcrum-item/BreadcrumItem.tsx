import IBreadcrumItem from "./IBreadcrumItem";

const BreadcrumbItem: React.FC<IBreadcrumItem> = ({ href,text }) => (
  <>
     {text}
  </>
);

export default BreadcrumbItem;

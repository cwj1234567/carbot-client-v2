import Link from "next/link";
import IBreadcrumItem from "./IBreadcrumItem";

const BreadcrumbItem: React.FC<IBreadcrumItem> = ({ href, text }) => (
  href ? <Link href={href}>{text}</Link> : <>{text}</>
);

export default BreadcrumbItem;

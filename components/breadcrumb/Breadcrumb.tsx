import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IBreadcrumb from './IBreadcrumb';

const Breadcrumb: React.FC<IBreadcrumb> = ({ children }) => (
  <>
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 text-xs text-gray-600 ">
        {children?.map((child: any, index: any) => (
          <>
            <li className="block transition hover:text-gray-700">{child}</li>
            {index < children.length - 1 && (
               <li>
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-4 w-4"
                 viewBox="0 0 20 20"
                 fill="currentColor"
               >
                 <path
                   fill-rule="evenodd"
                   d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                   clip-rule="evenodd"
                 />
               </svg>
             </li>
            )}
          </>
        ))}
      </ol>
    </nav>
  </>
);

export default Breadcrumb;

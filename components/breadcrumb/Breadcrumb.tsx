import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IBreadcrumb from './IBreadcrumb';

const Breadcrumb: React.FC<IBreadcrumb> = ({ children }) => (
  <>
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {children?.map((child: any, index: any) => (
          <>
            <li className="inline-flex items-center text-xs font-light text-gray-700">{child}</li>
            {index < children.length - 1 && (
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-500 ml-2 mr-2" size='xs' />
            )}
          </>
        ))}
      </ol>
    </nav>
  </>
);

export default Breadcrumb;

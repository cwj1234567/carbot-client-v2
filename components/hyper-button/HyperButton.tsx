import IHyperButton from "./IHyperButton";

const HyperButton: React.FC<IHyperButton> = ({ text, onClick, disabled, active }) => (
  <>
    <button
      className={`inline-block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative ${active ? 'bg-gray-50' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  </>
);


export default HyperButton;

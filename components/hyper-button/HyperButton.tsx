import IHyperButton from "./IHyperButton";

const HyperButton: React.FC<IHyperButton> = ({
  text,
  onClick,
  disabled,
}) => (
  <>
    <button className="inline-block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative">
      {text}
    </button>
  </>
);

export default HyperButton;
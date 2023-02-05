
interface IHyperButton {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    active?: boolean;
}

export default IHyperButton;
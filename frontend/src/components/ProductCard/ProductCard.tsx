import { Card } from "antd";

const { Meta } = Card;
type ProductCardProps = {
    imageSource: string;
    name: string;
    onCardClicked: (name: string) => void;
    disabled: boolean;
};
const ProductCard = ({
    imageSource,
    name,
    onCardClicked,
    disabled,
}: ProductCardProps) => {
    return (
        <Card
            onClick={() => onCardClicked(name)}
            hoverable
            style={{
                textAlign: "center",
                backgroundColor: disabled ? "white" : "#009933",
            }}
            cover={<img alt={name} src={imageSource} />}
        >
            <Meta title={name} />
        </Card>
    );
};
export default ProductCard;

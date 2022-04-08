import { Card } from "antd";
const { Meta } = Card;
type ProductCardProps = {
    imageSource: string;
    name: string;
};
const ProductCard = ({ imageSource, name }: ProductCardProps) => {
    return (
        <Card
            hoverable
            style={{ textAlign: "center" }}
            cover={<img alt={name} src={imageSource} />}
        >
            <Meta title={name} />
        </Card>
    );
};
export default ProductCard;

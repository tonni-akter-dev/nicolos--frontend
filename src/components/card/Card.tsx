import './card.scss'
import Image from 'next/image'

interface CardProps {
  title: string;
  price: number;
  trend: number;
  icon: string;
  yesterdayPrice: number;
  expenses: number;
}

const Card: React.FC<CardProps> = ({ title, price, trend, icon, yesterdayPrice, expenses }) => {
    const trendClass = price > yesterdayPrice ? 'up' : 'down';
    const formattedPrice = price.toFixed(2);
    const formattedExpenses = expenses.toFixed(2);

    return (
        <div className='card-component'>
            <div className="upper">
                <h3>{title}</h3>
                <span className='p5'>Today</span>
            </div>

            <div className="lower">
                <div className="price-section">
                    <h1>$ {formattedPrice}</h1>
                    <div className={`trend ${trendClass}`}>
                        <Image src={icon} alt="Icon" /> {trend}%
                    </div>
                </div>
                
                <div className="last">
                    <h6>Compared to ${yesterdayPrice} yesterday</h6>
                    <div className="expenses">
                        <h6>Last week expenses</h6>
                        <h6>${formattedExpenses}</h6>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Card;
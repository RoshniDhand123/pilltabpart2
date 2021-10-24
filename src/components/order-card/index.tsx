import "./style.scss";

const OrderCard = ({ order }: any) => {
    const renderData = (key: any, i: number) => (
        <div key={i} className="flex-space-between">
            <p>{key}:</p>
            <p>{order[key]}</p>
        </div>
    )
    return (
        <>
            {order ?
                <div className='order-card'>
                    {Object.keys(order).map(renderData)}
                </div> :
                <div className="full-container">
                    <h1>No Upcoming Order</h1>
                </div>
            }
        </>
    );
};

export default OrderCard;

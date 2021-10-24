import "./style.scss";

const UserInfoCard = (order: any) => {
	const renderData = (key: any, i: number) => (
		<div key={i} className="flex-width">			
			<p>
				{key} : {order.order[key]}
			</p>
		</div>
	);
	return (
		<div className="userInfo-card">			
			{Object.keys(order.order).map(renderData)}
		</div>
	);
};

export default UserInfoCard;

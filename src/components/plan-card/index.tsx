import "./style.scss";
import Card from "../card";
import { Link } from "react-router-dom";
import FormHeading from "../form-heading";
import Primary from "../../assets/img/card-primary.png";
import Success from "../../assets/img/card-success.png";
import Warning from "../../assets/img/card-warning.png";
import Danger from "../../assets/img/card-danger.png";

interface PlanProps {
	plan: string;
	drugName: string;
	dosage: string;
	frequency: string;
	amount: number;
	id: string | number;
	onSelect?: (id: string | number) => void;
	detail: string;	
	headerStyle?:string;
	heighlight?:string;
}

const getCardStyle = (plan: string) => {
	console.log("plan", plan)
	var card, btnClass, amountClass, backgroundClass, titleClass, txtClass;
	switch (plan) {
		case "basic": {
			card = Danger;
			btnClass = "btn-danger";
			amountClass = "amount-danger";
			backgroundClass = "background-light";
			titleClass = "text-light";
			txtClass = "text-dark";
			break;
		}
		case "pro": {
			card = Primary;
			btnClass = "btn-primary";
			amountClass = "amount-primary";
			backgroundClass = "background-dark";
			titleClass = "text-dark";
			txtClass = "text-light";
			break;
		}
		case "active": {
			card = Success;
			btnClass = "btn-success";
			amountClass = "amount-success";
			backgroundClass = "background-light";
			titleClass = "text-light";
			txtClass = "text-dark";
			break;
		}
		case "mid": {
			card = Warning;
			btnClass = "btn-warning";
			amountClass = "amount-warning";
			backgroundClass = "background-light";
			titleClass = "text-light";
			txtClass = "text-dark";
			break;
		}
		default: {
			card = Danger;
			btnClass = "btn-danger";
			amountClass = "amount-danger";
			backgroundClass = "background-light";
			titleClass = "text-light";
			txtClass = "text-dark";
			break;
		}
	}
	return {
		card,
		btnClass,
		amountClass,
		backgroundClass,
		titleClass,
		txtClass,
	};
};

const Subscribe = ({
	plan,
	id,
	drugName,
	dosage,
	frequency,
	amount,
	detail,
	onSelect,
	headerStyle,
	heighlight
}: PlanProps) => {
	var {
		card,
		btnClass,
		amountClass,
		backgroundClass,
		titleClass,
		txtClass,
	} = getCardStyle(plan.toLowerCase());

	const onCardClick = () => {
		onSelect && onSelect(id);
	};
	return (
		<div className="center-card" id="subscriber">
			<Card className={`form-card ${backgroundClass} ${heighlight}`}>
				<FormHeading
					title={plan}
					card={card}
					cardStyle="card-style"
					titleStyle={`${headerStyle} ${titleClass}`}
				></FormHeading>
				<div className={`center ${txtClass}`}>
					<div className="txt">{drugName}</div>
					<div className="txt">{dosage}</div>
					<div className="txt">{frequency}</div>
				</div>
				<div className="flex-center">
					<div>
						<div className={`amount ${txtClass}`}>
							<small>$</small>
							{amount}
						</div>
						<div className={`font-16 ${txtClass}`}>{detail}</div>
					</div>
					<div className={`back-amount ${amountClass}`}>{amount}</div>
				</div>

				<div>
					{onSelect?<button onClick={onCardClick} className={`sub-btn ${btnClass} under-line`} type="submit">
						Get Started
					</button>:""}
				</div>
			</Card>
		</div>
	);
};

export default Subscribe;

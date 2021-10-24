import React from "react";
import ButtonComponent from "../../../components/button";

interface Iprops{
    closeModel:()=>void;
}
class Review extends React.PureComponent<Iprops, {}> {
	render() {
		return (
			<div className="parentContainer">
                <div className="patientDescription">

                </div>
				<div className="buttonContainer">
					<ButtonComponent
						btnText="Sign Chart"
						className="nurse btn buttonStyle"
						//onClick={this.props.closeModel}
					/>
					<ButtonComponent
						btnText="Cancel"
						className="nurse btn"
						onClick={this.props.closeModel}
					/>
				</div>
			</div>
		);
	}
}
export default Review;
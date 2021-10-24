import React from "react";
import Button from "../button";
import "./index.scss";

interface Props {
	dropDownMenu: string[];
	//onEnter: () => void;
	btnText: string;
	buttonCss: string;
	setSearchBy: (value: string) => void;
}

const DropDown: React.FC<Props> = React.memo(
	({ btnText, dropDownMenu, buttonCss, setSearchBy }) => {
		const [open, setOpen] = React.useState(false);
		const handleClick = () => {
			setOpen(!open);
		};

		const handleListClick = (value: string) => {			
			setSearchBy(value);
			setOpen(!open);
		};

		const renderOption = (value: string, index: number) => (
			<div
				className="item"
				onClick={() => handleListClick(value)}
				key={index}
			>				
				{value}
			</div>
		);
		return (
			<div className="drop-down">
				<Button					
					btnText={btnText}
					onClick={handleClick}
					className={`${buttonCss} button-width`}
				/>
				{open && (
					<div className="drop-down-panel">
						<div className="panel">
							<div className="triangle"></div>
							<div className="search-by-text">Search By</div>
							{dropDownMenu.map(renderOption)}
						</div>
					</div>
				)}
			</div>
		);
	}
);

export default DropDown;

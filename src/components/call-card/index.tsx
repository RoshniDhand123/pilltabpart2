import "./style.scss";
import React from "react";

class CallCard extends React.PureComponent<{ time: string }, {}> {
	state = { hr: "", min: "", sec: "", videoStart: false };
	timer: any;
	componentDidMount = () => {
		this.timer = setInterval(this.checkTime, 1000);
	};
	componentWillUnmount = () => {
		clearInterval(this.timer);
	};

	checkTime = () => {
		console.log("props time",this.props.time ,this.state.hr,this.state.min,this.state.sec,this.state.videoStart);
		if(this.props.time=="")
		{
			this.setState({hr:"",min:"",sec:""});
		}
		//let time = "20:00";
		let date = new Date();	
		let current_hr = date.getHours();		
		let current_min = date.getMinutes();
		let current_sec = 60 - date.getSeconds();		
		let hr = parseInt(this.props.time.substring(0, 2));
		let min = parseInt(this.props.time.substring(3, 5));
		// let h = hr - current_hr;
		// let m = min - current_min;
		// if (h < 0) h = h * -1;
		// if (m < 0) m = m * -1;
		// if (!Number.isNaN(h) && !Number.isNaN(m) && !Number.isNaN(current_sec))
		// 	this.setState({
		// 		hr: h.toString(),
		// 		min: m.toString(),
		// 		sec: current_sec,
		// 	});

		let current_sum = current_hr * 60 + current_min;
		let appointment_sum = hr * 60 + min;
		let diff = appointment_sum - current_sum;
		let hour = diff / 60;
		let minute = diff % 60;		
		if (hour < 0 || minute < 0) {
			this.setState({ videoStart: true });
		}
		 else {
			this.setState({ videoStart: false });
		}
		if (!Number.isNaN(hour) && !Number.isNaN(minute) && !Number.isNaN(current_sec))
			this.setState({
				hr:  ~~hour.toString(),
				min: minute.toString(),
				sec: current_sec,
			});
	};

	render() {
		const { hr, min, sec, videoStart } = this.state;
		return (
			<div className="call-card">
				{hr || min || sec ? (
					<>
						<p className="heading">Next call in:</p>
						{videoStart ? (
							<div>calling Time</div>
						) : (
							<div className="content-arrange">
								<h2>{hr}</h2>hr
								<h2>{min}</h2>min
								<h2>{sec}</h2>sec
							</div>
						)}
					</>
				) : (
					<div className="content-arrange">
						<h3>No appointments available</h3>
					</div>
				)}
			</div>
		);
	}
}

export default CallCard;

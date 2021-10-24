import LinearProgress from '@material-ui/core/LinearProgress';
import "./style.scss"

type props_type = {
  value: number;
};

export default function ProgressBar({value} : props_type) {
  return (
    <div className="linear-slider">
      <LinearProgress variant="determinate" value={value} />
      <p>{value}%</p>
    </div>
  );
}

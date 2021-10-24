import Dialog from "@material-ui/core/Dialog";
import {ClipLoader,BounceLoader,BeatLoader,CircleLoader,ClimbingBoxLoader, ClockLoader,DotLoader,GridLoader,PropagateLoader	,PuffLoader,HashLoader} from "react-spinners";
import "./style.scss"

const colorPrimary = "#ba54f5"
const defaultSize = 150

type props_type = {
  show: boolean;
  size?:number;
  type?:string;
};

export default ({ show,size,type }: props_type) => {
  const renderLoader = (type?:string) =>{
    if(type){
      switch (type) {
        case 'ClipLoader':
          return <ClipLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />
        case 'BounceLoader':
          return <BounceLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />  
        case 'BeatLoader':
          return <BeatLoader color= {colorPrimary} loading={show}  size={size?size:30} />  
        case 'CircleLoader':
          return <CircleLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />
        case 'ClimbingBoxLoader':
          return <ClimbingBoxLoader color= {colorPrimary} loading={show}  size={size?size:15} />  
        case 'ClockLoader':
          return <ClockLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} /> 
        case 'DotLoader':
          return <DotLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />    
        case 'GridLoader':
          return <GridLoader color= {colorPrimary} loading={show}  size={size?size:30} />  
        case 'PropagateLoader':
          return <PropagateLoader color= {colorPrimary} loading={show}  size={size?size:15} /> 
        case 'PuffLoader':
          return <PuffLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />    
        case 'HashLoader':
          return <HashLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />   
        default:
          return <ClipLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />
      }
    }
    return <ClipLoader color= {colorPrimary} loading={show}  size={size?size:defaultSize} />
  }
  return (
    <Dialog  open={show} className="loading">
      <>
      {renderLoader(type)}
      </>
    </Dialog>
  );
};

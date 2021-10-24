import React from "react";
import Loading from "../../../components/loader";
import TreatmentCard from "../../../components/treatment-card";
import Header from "../../../components/Header"
import Typography from '@material-ui/core/Typography';
import "../style.scss"
import {CHOOSE_PLAN,LOGIN,CONSTANTS} from "../../constants"
import {getTreatments} from "../../../services/apis"
import {getItem, setItem} from "../../../services/storage"

interface types {
  name:string,
  id?: string | number,
  status?:boolean
}

class ChooseTreatment extends React.PureComponent<any, {}> {
  state = { loading: true,treatments:[] }

  componentDidMount = async() => {
    let response = await getTreatments()
    if(response.data.status) this.setState({treatments: response.data.data})
    this.setState({loading:false})
  }

  onTreatmentSelection =(id?:string | number)=>{
   
    let treatment = getItem("treatmentId")
    if(treatment && treatment != id) setItem("questionnaire",{})
    setItem("treatmentId",id)
    this.props.history.push({
      pathname: CHOOSE_PLAN + "/"+id,
    })
  }

  renderCard=(treatment:types,i:number)=>(
    <TreatmentCard key={treatment.id} text ={treatment.name} id= {treatment.id} status={treatment.status} className= {`treatment-card ${i%2==0?"treatment-card1":"treatment-card2"}`} onClick={this.onTreatmentSelection}/>
  )
  render() {
    const {treatments} = this.state
    return (
      <>
      <Header routeLink ={{path: LOGIN,text:CONSTANTS.TREATMENT_HEADER}}/>
      <div className="container sign-up">
        <div className="content" >
          <Typography variant="h4" gutterBottom> {CONSTANTS.TREATMENT_TITLE} </Typography>
          <Typography variant="h6" gutterBottom>{CONSTANTS.TREATMENT_SUBTITLE}</Typography>
          <div className="flex-row-center">{treatments.map(this.renderCard)}</div>   
        </div>    
        <Loading show={this.state.loading} />
      </div>
      </>
    );
  }
}

export default ChooseTreatment;

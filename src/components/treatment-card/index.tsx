import "./style.scss";

interface CardProps {
    text: string,
    detail?:string,
    id?: string | number,
    onClick? : (id?: string | number) => void,
    className?: string,
    status?:boolean
}
const TreatmentCard = ({ text, id,onClick ,className,status,detail }: CardProps) => {

    const onCardClick =() =>{
        if(!status) return
        onClick && id && onClick(id)
    }

    return (
        <div className={`treat-card ${className}`} onClick={onCardClick}>
            <div>
                <p>{text}</p>
                {detail && <p>{detail}</p>}
            </div>
        </div>
    );
};

export default TreatmentCard;

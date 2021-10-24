import Modal from '@material-ui/core/Modal';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './style.scss'

interface Ibuttons{
    action:()=>void;
    text:string;
    classes?:string;
}
interface modalProps {
    open: boolean,
    modalHeading?: string,
    modalText?: string,
    buttonAction?: () => void,
    buttonText?: string,
    children?: React.ReactNode,
    alongSidebar?: Boolean;
    className?: string;
    buttonStyles?:string;
    // cancelButton?:boolean;
    // cancelButtonAction?:()=>void;
    renderButtons?:Ibuttons[] | false;
    icon?:any;
}

export default function ModalComponent({icon, className, open, modalHeading,buttonStyles, modalText, buttonAction, buttonText, children, alongSidebar,renderButtons }: modalProps) {
    return (
        <Modal
            open={open}
        >
            <div className={`${alongSidebar ? "modal-beside-sidebar" : ""} modal ${className}`}>
                {children ?
                    children :
                    <div className={`modal-text-beside-sidebar complete-step modal-text`}>
                        <div className="flex-center">{icon?icon:<CheckCircleOutlineIcon />}</div>
                        <h3 className="m-0 font-30">{modalHeading}</h3>
                        <p className="success-txt font-17">{modalText}</p>
                        <div className="flex-center">
                            <div className="btn-link-txt">
                               {renderButtons && renderButtons.map((buttonList)=><div className={`${buttonList.classes} btn `} onClick={buttonList.action}>{buttonList.text}</div>)}
                               {/* {cancelButton && <div className="btn m-right" onClick={cancelButtonAction}>{"Cancel Button"}</div>} */}
                                <div className={`${buttonStyles} btn`} onClick={buttonAction}>{buttonText}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Modal>
    );
}

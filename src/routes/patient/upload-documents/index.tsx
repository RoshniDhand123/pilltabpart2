import React from "react";
import Loading from "../../../components/loader";
import { Typography } from "@material-ui/core";
import { CONSTANTS } from "../../constants";
import UploadForm from "./form";
import { uploadFileDetail } from "../../../services/apis/index";
import ModalComponent from "../../../components/modal";
import { getFileDetails } from "../../../services/apis/index";
import { parseFileDetails } from "../../../services/helper/index";
import TableCmp from "../../../components/tableCmp";
import { HeadCell } from "../../../components/tableCmp/type";
import { notifError, notifSuccess } from "../../util";

const headCells: HeadCell[] = [
	{ name: 'File Name', label: 'File Name',width:"5%" },
	{ name: 'File Content', label: 'File Content',width:"5%" },
	{ name: 'Date Uploaded', label: 'Date Uploaded' ,width:"5%"},
];

class UploadDocuments extends React.PureComponent<any, {}> {
	state = {
		loading: false,
		fileDetail: [],
		open: false,
		documentDetails: [],
		count: 0
	};

	componentDidMount() {
		let uploadMsg = localStorage.getItem("uploadDocumentMsg");
		if (uploadMsg) {
			notifSuccess(
				"Upload Document",
				"Please submit document if you have any for appointment"
			);
			localStorage.removeItem("uploadDocumentMsg");			
		}
		this.getUploadedDocuments("");
	}

	getUploadedDocuments = async (page = "") => {
		this.setState({ loading: true })
		let resp = await getFileDetails(page);
		let detail = [];
		if (resp.data && resp.data.status) {
			detail = parseFileDetails(resp.data.data);
		}
		this.setState({ documentDetails: detail, loading: false });
	};

	uploadFile = async (payload: any, { resetForm }: any) => {
		this.setState({ loading: true });
		let document = this.state.fileDetail;
		let resp = await uploadFileDetail({
			detail: payload.fileInfo,
			document,
		});
		this.setState({ loading: false });
		if (resp.data && resp.data.status) {
			this.setState({ open: true });
			resetForm({});
		}
		this.getUploadedDocuments();
	};

	handleInputChange = (e: any) => {
		if (e.target.files != null)
			this.setState({ fileDetail: e.target.files[0] });
	};
	closeModal = () => {
		this.setState({ open: false });
	};
	getRequestList = async () => {
		// let resp = await getUserRequestList("upcoming");
		// if (resp.data && resp.data.status) {
		// 	this.setState({ details: parseRequestsList(resp.data.data) });
		// }
		// console.log("status", resp);
		// this.setState({ loading: false });
	};
	_loadDetails = async (page = 0, perPage = 10) => {
	}

	onPageChange = async (perPage: number, page: number) => {
		const { count, documentDetails = [] } = this.state;
		if (count > documentDetails.length && (page + 1) * perPage > documentDetails.length)
			await this.getUploadedDocuments(`?page=${page}`);
		return this.state.documentDetails;
	}
	render() {
		const { open, loading, count, documentDetails } = this.state;
		return (
			<>
				<ModalComponent
					open={open}
					buttonText="OK"
					buttonAction={this.closeModal}
					modalHeading={CONSTANTS.THANK_YOU}
					modalText={CONSTANTS.FILE_UPLOAD}
					alongSidebar={true}
				/>
				<div className="content upload patientContainer">
					<Typography variant="h3" gutterBottom>
						{CONSTANTS.UPLOAD_DOC}
					</Typography>
					<div className="flex-column-start">
						<Typography variant="h5" gutterBottom>
							{CONSTANTS.UPLOAD_FILE}
						</Typography>
						<div className="form-container">
							<UploadForm
								onSubmit={this.uploadFile}
								handleInputChange={this.handleInputChange}
							/>
						</div>
						<div className="table-container">
							<TableCmp
								onPageChange={this.onPageChange}
								total={count}
								data={documentDetails}
								headers={headCells}
								title={""}
							/>
						</div>
					</div>
				</div>
				<Loading show={loading} />
			</>
		);
	}
}

export default UploadDocuments;

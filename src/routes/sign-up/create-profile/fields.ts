import Field from "../../../components/Field";
import { PASWORD_MATCHER } from "../../constants"
import { verifyPassword } from "../../util"

export default [
    {
        label: "First name",
        name: "firstName",
        component: Field,
        placeholder: "First name",
        type: "text",
        required: true,
    },
    {
        label: "Last name",
        name: "lastName",
        component: Field,
        placeholder: "Last name",
        type: "text",
        required: true,
    },
    {
        label: "Email",
        name: "email",
        component: Field,
        placeholder: "Email",
        type: "email",
        required: true,
    },
    {
        label: "Password",
        name: "password",
        component: Field,
        placeholder: "Password",
        type: "password",
        required: true,
        matches: PASWORD_MATCHER,
        create_err_msg: verifyPassword,
        displayable: true,
    }
];


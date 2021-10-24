import Field from "../../components/Field";
import {PASWORD_MATCHER} from "../constants";
import {verifyPassword} from "../util"

export default  [
    {
      name: "code",
      component: Field,
      placeholder: "code",
      type: "text",
      required: true,
    },
    {
      name: "password",
      component: Field,
      placeholder: "New Password",
      type: "password",
      required: true,
      matches: PASWORD_MATCHER,
      create_err_msg: verifyPassword,
      displayable: true,
    },
    {
      name: "cpassword",
      component: Field,
      placeholder: "Confirm Password",
      type: "password",
      required: true,
      matches: PASWORD_MATCHER,
      create_err_msg: verifyPassword,
      displayable: true,
    },
  ];
  
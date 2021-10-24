import Field from "../../../components/Field";
  const fields = [
    {
        label:"Old Password",
        name: "oldPassword",
        component: Field,
        placeholder: "Old Password",
        type: "text",
        required: true,
        gridItem:6
    },
    {
        label:"New Password",
        name: "newPassword",
        component: Field,
        placeholder: "New Password",
        type: "text",
        required: true,
        gridItem:6
    },
    {
        label:"Confirm Password",
        name: "confirmPassword",
        component: Field,
        placeholder: "Confirm Password",
        type: "text",
        required: true,
        gridItem:6
    },
 ]
 export default fields;
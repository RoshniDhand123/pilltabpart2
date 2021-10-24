import Field from "../../components/Field";

export default [
  {
    name: "email",
    component: Field,
    placeholder: "Email",
    type: "email",
    icon: "",
    required: true,
  },
  {
    name: "password",
    component: Field,
    placeholder: "Password",
    type: "password",
    required: true,
    displayable: true,
  },
];

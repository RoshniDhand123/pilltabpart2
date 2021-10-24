export type PropType = {
  name: string;
  type: string;
  field: any;
  form: any;
  icon?: any;
  placeholder?: string;
  create_err_msg?(value: string): string;
  displayable?: boolean;
};

export type StateType = {
  name: string;
  type: string;
};

import React from 'react';
import Cards from 'react-credit-cards';
import "react-credit-cards/lib/styles.scss"

type card_props ={
    name :string;
    number: string|number;
    expiry: string|number;
    cvc :string|number;
}
 
export default class CreditCard extends React.Component<card_props> {
  render() {
    const {number,name,expiry,cvc} = this.props
    return (
      <>
        <Cards
          cvc={cvc}
          expiry={expiry}
          name={name}
          number={number}
          preview={true}
        />
      </>
    );
  }
}
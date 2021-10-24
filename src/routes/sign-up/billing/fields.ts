import Field from "../../../components/Field";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
  } from "@stripe/react-stripe-js";

export default [
    {
        label:"Billing Address",
        name: "billingAddress",
        component: Field,
        placeholder: "Billing Address",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"Billing Address 2",
        name: "billingAddress2",
        component: Field,
        placeholder: "Billing Address 2",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"City",
        name: "billingCity",
        component: Field,
        placeholder: "City",
        type: "text",
        required: true,
        gridItem:4
    },
    {
        label:"State",
        name: "billingState",
        component: Field,
        placeholder: "State",
        type: "text",
        required: true,
        gridItem:4
    },
    {
        label:"Zip Code",
        name: "billingZipCode",
        component: Field,
        placeholder: "Zip Code",
        type: "text",
        required: true,
        gridItem:4
    },
    {
        label:"Shipping Address",
        name: "shippingAddress",
        component: Field,
        placeholder: "Shipping Address",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"Shipping Address 2",
        name: "shippingAddress2",
        component: Field,
        placeholder: "Shipping Address 2",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"City",
        name: "shippingCity",
        component: Field,
        placeholder: "City",
        type: "text",
        required: true,
        gridItem:4
    },
    {
        label:"State",
        name: "shippingState",
        component: Field,
        placeholder: "State",
        type: "text",
        required: true,
        gridItem:4
    },
    {
        label:"Zip Code",
        name: "shippingZipCode",
        component: Field,
        placeholder: "Zip Code",
        type: "text",
        required: true,
        gridItem:4
    }
];

export const billingFields = [
    {
        name: "cardNumber",
        component: CardNumberElement,
        placeholder: "XXXX-XXXX-XXXX-0000",
        type: "cardElement",
    },
    {
        name: "cardExpiry",
        component: CardExpiryElement,
        placeholder: "MM/YY",
        type: "cardElement",
      },
      {
        name: "cardCvc",
        component: CardCvcElement,
        placeholder: "CVV",
        type: "cardElement",
      },
      {
        name: "cardName",
        component: Field,
        placeholder: "Name on card",
        type: "text",
        required: true,
      }
]

export const editBillingFields = [
    {
        label:"Billing Address",
        name: "billingAddress",
        component: Field,
        placeholder: "Billing Address",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"Billing Address 2",
        name: "billingAddress2",
        component: Field,
        placeholder: "Billing Address 2",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"City",
        name: "billingCity",
        component: Field,
        placeholder: "City",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"State",
        name: "billingState",
        component: Field,
        placeholder: "State",
        type: "text",
        required: true,
        gridItem:12
    },
    {
        label:"Zip Code",
        name: "billingZipCode",
        component: Field,
        placeholder: "Zip Code",
        type: "text",
        required: true,
        gridItem:12
    }
]
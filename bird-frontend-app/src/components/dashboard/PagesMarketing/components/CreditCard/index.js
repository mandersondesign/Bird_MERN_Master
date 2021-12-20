import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import css from './index.less'

const CreditCard = ({ isCard, onSubmit, cardError, setIsComplete, setCardError }) => {
  const cards = {
    true: () => (
      <>
        <div className={css.labelCard}><strong>Card number</strong> ****4242</div>
        <div className={css.labelCard}><strong>Expiration date</strong> 12/2024</div>
      </>
    ),
    false: () => (
      <>
        <CardElement
          className={css.cardInput}
          onChange={e => setIsComplete(e?.complete)}
          options={{
            placeholder: 'Yes',
            hidePostalCode: true,
            style: {
              base: {
                marginTop: "16px",
                fontSize: "14px",
                backgroundColor: "#FFFFFF",
                fontWeight: 400,
                iconColor: '#000000',
                lineHeight: "48px",
                "::placeholder": {
                  color: "#aab7c4"
                }
              },
              invalid: {
                color: "#9e2146"
              }
            }
          }}
        />

        {cardError.length ? <div className={[css.labelError, css.labelErrorCard].join(' ')}>{cardError}</div> : null}
      </>
    )
  }

  const title = isCard ? 'Payment information' : 'Payment'

  return (
    <div className={css.container}>
      <div className={css.title}>{title}</div>
      {cards[isCard]()}
    </div>
  )
}

export default CreditCard

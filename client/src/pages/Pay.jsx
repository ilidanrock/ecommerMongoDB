import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const Pay = () => {
    const [token, setToken] = useState(null)
    const onToken = (token) => {
        setToken(token)
    }

    useEffect(() => {
        console.log(token)
        const makeRequest = async () => {
            try {
                await axios.post('http://localhost:5000/api/stripe/payment', {
                    tokenId: token.id,
                    amount: 2000
                })
            } catch (error) {
                console.log(error)
            }
        }
        token && makeRequest()
    }, [token])

    return (
        <StripeCheckout
            name="Lama"
            billingAddress
            shippingAddress
            description="Your total"
            amount={2000}
            token={onToken}
            stripeKey={process.env.REACT_APP_STRIPE}
        />
    )
}

export default Pay

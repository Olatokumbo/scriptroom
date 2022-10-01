import * as functions from "firebase-functions";
import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../../config";
// // import cors from "cors"
// // cors({origin: true})
// const cors = require('cors')
// cors({origin: "http://localhost:3000"});

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export const createStripeCheckout = functions
  .region("us-central1")
  .https.onCall(async (data: any, context: functions.https.CallableContext) => {
    const { origin, title, price } = data;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      cancel_url: `${origin}/payment/cancelled`,
      success_url: `${origin}/payment/success`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: price * 100,
            product_data: {
              name: title,
              images: [
                "https://play-lh.googleusercontent.com/Ufl3zYT2bmhDbB9_hSGBJkJcvFyJ0G-acacGDJaMPhODb1fMynEGuNlaboTBeXwDGw",
              ],
            },
          },
        },
      ],
    });

    return {
      id: session.id,
    };
  });

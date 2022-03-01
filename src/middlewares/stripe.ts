// import { Request, Response } from "express";
// import { Stripe } from "stripe";

// const CreateCheckoutSession = (stripe_private_key: string) => {
//   const stripe = require("stripe")(stripe_private_key);

//   return async (req: Request, res: Response) => {
//     let line_items = req.body;
//     const params: Stripe.Checkout.SessionCreateParams = {
//       submit_type: "pay",
//       payment_method_types: ["card"],
//       line_items,
//       success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
//     };
//     const checkoutSession: Stripe.Checkout.Session =
//       await stripe.checkout.sessions.create(params);
//     res.json(checkoutSession);
//   };
// };

// export default CreateCheckoutSession;

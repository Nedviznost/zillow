import { getHomeTypes } from 'src/store/static'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

async function CreateStripeSession(
  req: { body: { id: string; plan: number; imgs: string[]; address: string } },
  res: { json: (arg0: { id: any }) => void }
) {
  const { id, plan: planID, imgs, address } = req.body

  const plan = getHomeTypes(planID)

  const transformedItem = {
    price_data: {
      currency: 'usd',
      product_data: {
        images: [imgs && imgs[0]],
        name: plan.displayName,
        description: address,
      },
      unit_amount: plan.price * 100,
    },

    quantity: 1,
  }

  const redirectURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://nedviznost.mk'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [transformedItem],
    mode: 'payment',
    success_url: `${redirectURL}/dom/${id}`,
    cancel_url: `${redirectURL}/dom/new`,
    metadata: {
      id,
      plan: planID,
    },
  })

  res.json({ id: session.id })
}

export default CreateStripeSession

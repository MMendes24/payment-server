const secretKey = require("../secrets")
const stripe = require("stripe")(secretKey.secretKEY)

async function postCharge(req, res) {
  console.log(secretKey)
  try {
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source,
      receipt_email
    })

    if (!charge) throw new Error("Charge unsuccessful!")

    res.status(200).json({
      message: "Charge posted successfully!",
      charge
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = postCharge
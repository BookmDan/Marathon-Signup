# from .pets import *
from .users import *
# from .results import *
from .raceSignups import *
from .raceEvents import *
from .creditCards import *
from .authentication import *
from .checkSession import *
from .shoppingCart import *

# const stripe = require('stripe')(process.env.STRIPE_SECRET)
# router.post('/create-checkout-session', async(req, res)=>{
#   const{products}= req.body
#   const lineItems = products.map((project)=>({
#     price_date:{
#       currency:'usd',
#       product_data:{
#         name:product.name,
#         images:[product.image]
#       },
#       unit_amount:Math.round(product.price * 100),
#     },
#     quantity: product.quantity
#   }))
#   const session = await stripe.checkout.sessions.create({
#     payment_method_types:['card'],
#     line_items: lineItems,
#     mode:'payment',
#     success_url:"http://localhost:5174/success",
#     cancel_url:"http://localhost:5174/cancel"
#   })
#   res.json({id:session.id})
# })

# module.exports = router
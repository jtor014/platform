---
title: "Checkpoint: After Project 4"
description: "Self-assessment exercises after completing Project 4"
page_type: "checkpoint"
section: "web-dev"
---
# Judgment Checkpoint: After Project 4

You've integrated a third-party service, verified AI output against external documentation, and managed ticket dependencies in a growing codebase. These exercises test your verification and communication skills.

---

## Exercise 1: Hallucination Detection

Below are three code snippets that integrate with third-party services. **One uses a hallucinated API method that doesn't exist.** Identify which one.

You don't need to know Python to spot the problem. Look at the method names and parameters — do they look like real API calls, or do they look like something AI invented? The detection skill is the same in any language: check the official documentation.

**Snippet A: Sending email with SendGrid**
```python
import sendgrid
sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
message = sendgrid.helpers.mail.Mail(
    from_email='noreply@example.com',
    to_emails='customer@example.com',
    subject='Booking Confirmation',
    html_content='<p>Your booking is confirmed.</p>'
)
response = sg.send(message)
```

**Snippet B: Creating a Stripe Checkout session**
```python
import stripe
session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
        'price_data': {
            'currency': 'aud',
            'product_data': {'name': 'Consultation Booking'},
            'unit_amount': 5000,
        },
        'quantity': 1,
    }],
    mode='payment',
    success_url='https://example.com/success',
    cancel_url='https://example.com/cancel',
)
```

**Snippet C: Geocoding an address with Google Maps**
```python
import googlemaps
gmaps = googlemaps.Client(key=os.environ.get('GOOGLE_MAPS_KEY'))
result = gmaps.smart_geocode(
    address='123 Collins St, Melbourne VIC 3000',
    auto_correct=True,
    confidence_threshold=0.85
)
lat = result['location']['lat']
lng = result['location']['lng']
```

<details>
<summary>Check your answer</summary>

**Snippet C is hallucinated.** The Google Maps Python client has no `smart_geocode` method. The correct method is `geocode()`. The parameters `auto_correct` and `confidence_threshold` don't exist. The response structure is also wrong — it returns a list, not a dict with a `location` key.

The correct code would be:
```python
result = gmaps.geocode('123 Collins St, Melbourne VIC 3000')
lat = result[0]['geometry']['location']['lat']
lng = result[0]['geometry']['location']['lng']
```

**How to check:** Go to the library's documentation or GitHub repo. Search for the method name. If you can't find it in the docs, it's hallucinated. This takes 2 minutes and prevents hours of debugging.

Snippets A and B use real APIs with correct method signatures. (Though you should still verify versions — APIs change.)
</details>

---

## Exercise 2: Financial Accuracy

A customer orders:
- 2x Relaxation Candle @ $24.50 each
- 1x Citrus Burst Candle @ $18.00
- Discount code "SUMMER15" for 15% off

**Calculate the correct total. Show your work.**

Then: the system displays $57.38 at checkout. **Is that correct? If not, what went wrong?**

<details>
<summary>Check your answer</summary>

**Correct calculation:**
- 2 × $24.50 = $49.00
- 1 × $18.00 = $18.00
- Subtotal: $67.00
- Discount: 15% of $67.00 = $10.05
- Total: $67.00 − $10.05 = **$56.95**

**The system shows $57.38, which is wrong.** The likely bug: the discount was applied to each item individually and rounded before summing.

- 15% of $24.50 = $3.675, rounded to $3.68 → $24.50 − $3.68 = $20.82 × 2 = $41.64
- 15% of $18.00 = $2.70 → $18.00 − $2.70 = $15.30
- Total: $41.64 + $15.30 = $56.94 — that's not $57.38 either.

Actually, if the discount was applied per-unit (not per-line):
- 15% of $24.50 = $3.675, rounded UP to $3.68 → per unit: $20.82
- But if it rounds DOWN: $3.67 → per unit: $20.83 × 2 = $41.66
- Plus $15.30 = $56.96 — still not matching.

The point: **any answer other than $56.95 is wrong.** The correct approach is: calculate subtotal, apply discount to subtotal, round once at the end. Per-item rounding causes discrepancies. Your acceptance criteria should specify: "Discount is calculated on the order subtotal, not per item. Final total is rounded to 2 decimal places once."

If the system shows a different number, you investigate — don't assume it's right.
</details>

---

## Exercise 3: Client Communication

The client asks: "Will my website handle it if I get a big rush of orders from an Instagram post?"

**Write a response in 3-4 sentences.** It must be: honest, non-technical, and actionable.

<details>
<summary>Check your answer — example response</summary>

A good response:

"For the typical rush you'd see from an Instagram post — say 50-100 orders spread over an hour — the current setup should handle it fine. If you're expecting something much larger, like hundreds of people trying to check out at the exact same moment, we'd want to do a quick load test beforehand to confirm. I'd suggest giving me a heads up 48 hours before any big promotion so I can verify everything's ready. If the numbers are much bigger than what we've tested, we can discuss options."

**Why this works:**
- Honest: doesn't say "yes definitely" or "no"
- Non-technical: no mention of servers, databases, connection pools
- Actionable: "give me 48 hours notice" is something the client can do
- Proportionate: assesses the likely scale before jumping to expensive solutions
</details>

---

## What These Exercises Tell You

- **Exercise 1:** Can you spot a hallucinated API? The detection skill is simple: check the docs. The habit is what matters.
- **Exercise 2:** Can you verify financial accuracy by calculating independently? Don't trust the system — verify with a calculator.
- **Exercise 3:** Can you communicate technical capacity to a non-technical client? Honest, proportionate, actionable.

If you struggled with Exercise 1, practise the detection habit: for any library or method Claude uses, search the official docs before approving the PR. If Exercise 2 was hard, always verify financial calculations independently with a calculator — never trust the system's output. If Exercise 3 felt uncomfortable, practice with a friend: explain a technical concept without using any jargon.

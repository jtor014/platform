---
title: "Arc B: Online store"
description: "Business story arc for Projects 3-5"
page_type: "arc-landing"
section: "web-dev"
prev: "/web-dev/bridge/choose-arc"
next: "/web-dev/arcs/b/flawed-prd"
---
# Arc B: The Online Store

## The client

A handmade candle business. Currently sells at markets and through Instagram DMs. Losing sales because they can't respond to enquiries fast enough. Wants a proper online shop.

## The story

You start with someone selling candles from a kitchen table who just wants people to be able to buy online. By Project 5, you're verifying that the dashboard revenue number matches the Stripe charge total to the cent, investigating why they don't, and building analytics the owner actually trusts. Money makes everything harder — AI will confidently write payment code that looks right but calculates wrong. This arc teaches you to verify with exact values, not vibes.

## What you'll build

- **Project 3:** Shopping cart with Stripe payment checkout — browse products, add to cart, pay
- **Project 4:** Inventory management and order dashboard — stock tracking, sold-out prevention, order processing
- **Project 5:** Sales analytics dashboard — revenue, best sellers, trends, data accuracy verification

## What you'll learn that's unique

- Third-party API verification: checking Claude's Stripe integration against actual Stripe documentation
- Financial accuracy chain: cart total = Stripe charge = order record. Test with exact values, not approximations
- Concurrent operations: two buyers, one item — who gets it?
- Data discrepancy investigation: your dashboard says $2,340, Stripe says $2,287 — find the actual cause

## Best for

E-commerce, digital business, or accounting students. Anyone who wants to work with money and external APIs where "close enough" isn't good enough.

## What makes this arc hard in practice

Financial accuracy. AI will produce payment code that looks correct and calculates wrong. You'll need to manually verify every calculation with a calculator, cross-reference your records against the Stripe dashboard, and investigate discrepancies that could be rounding, date boundaries, or genuine bugs.

## How you'll verify

Numerical verification. Cart total = Stripe charge = order record = dashboard figure. Test with exact values, not approximations. When numbers don't match, investigate — don't assume either system is right.

## Estimated time

4-6 weeks for Projects 3-5.

---
title: "Arc D: Event platform"
description: "Business story arc for Projects 3-5"
page_type: "arc-landing"
section: "web-dev"
prev: "/web-dev/bridge/choose-arc"
next: "/web-dev/arcs/d/flawed-prd"
---
# Arc D: The Event Platform

## The client

A workshop organiser running monthly coding workshops and quarterly community markets. Currently managing everything through Eventbrite, wants their own platform to build their brand and avoid fees.

## The story

Dates and times are AI's most unreliable domain. You'll discover this when a registration that should close "2 hours before the event" closes at the wrong time because AI forgot about daylight savings. By Project 5, you're building a QR code check-in app that has to work when the wifi drops at the venue door with 40 people queuing. This arc teaches you to test in physical environments, not just browsers — and to specify temporal logic so precisely that AI can't get it wrong.

## What you'll build

- **Project 3:** Event listings with registration and capacity management — dates, times, sign up, full = closed
- **Project 4:** Ticketing with multiple tiers, payments, and waitlists — early bird, standard, VIP, discount codes
- **Project 5:** QR code check-in app that works offline — scan at the door, sync when wifi returns

## What you'll learn that's unique

- Date/time precision: AI's most unreliable domain. Timezones, daylight savings, "registration closes 2 hours before" — in which timezone?
- Combinatorial scoping: ticket types × pricing × discounts = complexity explosion. Define what's supported, anti-scope the rest
- Offline-first design: the wifi drops during check-in with 40 people queuing. What happens?
- Physical environment testing: scanning QR codes, testing in sunlight, going deliberately offline

## Best for

Event management, IT, or community development students. Anyone who wants to build software that works in the real world, not just the browser.

## What makes this arc hard in practice

Time. Dates and timezones are AI's most unreliable domain, and the consequences are visible — an event showing the wrong start time, a registration that closes at the wrong moment, a QR code that won't scan when 40 people are queuing. You'll learn to specify temporal logic so precisely that AI can't get it wrong.

## How you'll verify

Physical environment testing. Scan a QR code in sunlight. Go offline and keep scanning. Check that an event created during standard time shows the correct time during daylight savings. These aren't things you can verify in a browser tab — you need a phone and a real scenario.

## Estimated time

4-6 weeks for Projects 3-5.

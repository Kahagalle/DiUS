# DiUS Checkout System

## Setup

Assuming [node](https://nodejs.org/) is already installed, in your terminal:

```shell
# Clone this repository
`git clone git@github.com:Kahagalle/DiUS.git`

# Install npm dependencies
`npm install`

# Run app
`npm start`

# Test app
`npm test`
```

## Introduction

This project contains a simple implementation of a checkout system for DiUS. Following are some of the assumptions and explanations for the code design.

- Assumed the checkout system will eventually turned into an API for DiUS, no UI was implemented. So the API implementation eventually utilize `calculateTotal` function to calculate and send back the total of scanned SKUs.
- The `src/Database.ts` file was used to mimic the database.
- Database contains the rule so rule can be changed without changing the code.
- The code only need to be changed if any new rule type is introduced.
- Minimal amount of test cases were introduced.
- Need to write more test cases to identify exception and edge cases if the rules are expanded. (EX: Scenario for one item has 2 discounts applied.)

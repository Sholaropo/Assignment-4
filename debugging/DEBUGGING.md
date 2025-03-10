# Debugging Analysis

## Scenario 1: Get All Loans

-   **Breakpoint Location:** loanController line 18
-   **Objective:** getAllLoans function

### Debugger Observations

-   **Variable States:** loans = [
  {
    id: "Oa3uYWGmou4WKMwxPjJc",
    amount: "1000",
    description: "Medical Loan",
    reviewed: true,
    approved: true,
  },
]
-   **Call Stack:** getAllLoans, next function
-   **Behavior:** loans was initially undefined then was defined after getAllLoans function was run

### Analysis

-   The getAllLoans function successfully retrieves loan data from the database, returning an array 
-   The loan objects contain expected fields: id, amount, description, reviewed, and approved status

## Scenario 2: How token is decoded

-   **Breakpoint Location:** authenticate.ts line 31
-   **Objective:** authenticate middleware function

### Debugger Observations

-   **Variable States:** decodedToken = {
  role: "manager",
  iss: "https://securetoken.google.com/back-endproject4",
  aud: "back-endproject4",
  auth_time: 1741590399,
  user_id: "Ywzsq8jvWOc7Bh4Cg6X1TIm3Oyo1",
  sub: "Ywzsq8jvWOc7Bh4Cg6X1TIm3Oyo1",
  iat: 1741590399,
  exp: 1741593999,
  email: "ojoropo93@gmail.com",
  email_verified: false,
  firebase: {
    identities: {
      email: [
        "ojoropo93@gmail.com",
      ],
    },
    sign_in_provider: "password",
  },
  uid: "Ywzsq8jvWOc7Bh4Cg6X1TIm3Oyo1",
}
-   **Call Stack:** authenticate, next, router
-   **Behavior:** decodedToken was initially undefined then was defined after authenticate middleware function was run

### Analysis

-   The token contains critical user information including role, user ID, email, and Firebase-specific data
-   The authentication middleware successfully decodes the token to extract user information

## Scenario 3: Role-Based Access Control

-   **Breakpoint Location:** authorize.ts line 30
-   **Objective:** authorize middleware function

### Debugger Observations

-   **Variable States:** role = "manager", id = undefined, uid = "Ywzsq8jvWOc7Bh4Cg6X1TIm3Oyo1"
-   **Call Stack:** authenticate, next, router, 
-   **Behavior:** the user role was retrieved and checked if valid for the andpoint called

### Analysis

-   User roles are extracted from the previously decoded token and used to control access to endpoints
-   The middleware validates whether the authenticated user's role has permission to access the requested endpoint
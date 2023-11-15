## ArBlog

## Server API

<details>
    <summary>POST /api/v1/email</summary>

#### Description

The endpoint adds a new email to the database and sends a confirmation email to the user.

#### Request body

```ts
type RequestBody = {
  email: string;
};
```

#### Response

```ts
type Response =
  | { success: true } // status: 201
  | {
      success: false;
      error: string;
    };
```

</details>

<details>
    <summary>GET /api/v1/email/confirm</summary>

#### Description

The endpoint marks the user email as **confirmed** using the **confirmation token** generated when the user added his email.

| Param   | Description                                                                                        |
| ------- | -------------------------------------------------------------------------------------------------- |
| `token` | The token generated when the user added his email (it will be in the email sent to the user inbox) |

**Example:** `/api/v1/email/confirm?token=mytoken`

#### Response

```ts
type Response =
  | { success: true } // status: 200
  | {
      success: false;
      error: string;
    };
```

</details>

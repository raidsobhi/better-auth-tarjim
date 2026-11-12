# Better Auth error codes

Generated from Better Auth **1.7.22** by `npm run sync`. Do not edit by hand.

| Code | Group | English message |
| --- | --- | --- |
| `ACCESS_DENIED` | device-authorization | Access denied |
| `ACCOUNT_NOT_FOUND` | base | Account not found |
| `ACCOUNT_TEMPORARILY_LOCKED` | two-factor | Too many failed verification attempts. Your account is temporarily locked. Please try again later. |
| `ALREADY_SUBSCRIBED_PLAN` | stripe | You're already subscribed to this plan |
| `ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY` | anonymous | Anonymous users cannot sign in again anonymously |
| `ASYNC_VALIDATION_NOT_SUPPORTED` | base | Async validation is not supported |
| `AUTHENTICATION_FAILED` | passkey | Authentication failed |
| `AUTHENTICATION_REQUIRED` | device-authorization | Authentication required |
| `AUTHORIZATION_PENDING` | device-authorization | Authorization pending |
| `AUTHORIZE_REFERENCE_REQUIRED` | stripe | Organization subscriptions require authorizeReference callback to be configured |
| `AUTH_CANCELLED` | passkey | Auth cancelled |
| `BACKUP_CODES_NOT_ENABLED` | two-factor | Backup codes aren't enabled |
| `BANNED_USER` | admin | You have been banned from this application |
| `BODY_MUST_BE_AN_OBJECT` | base | Body must be an object |
| `CALLBACK_URL_REQUIRED` | base | callbackURL is required |
| `CANNOT_DELETE_A_PRE_DEFINED_ROLE` | organization | Cannot delete a pre-defined role |
| `CHALLENGE_NOT_FOUND` | passkey | Challenge not found |
| `CHANGE_EMAIL_DISABLED` | base | Change email is disabled |
| `COULD_NOT_CREATE_SESSION` | anonymous | Could not create session |
| `CREDENTIAL_ACCOUNT_NOT_FOUND` | base | Credential account not found |
| `CROSS_SITE_NAVIGATION_LOGIN_BLOCKED` | base | Cross-site navigation login blocked. This request appears to be a CSRF attack. |
| `CUSTOMER_NOT_FOUND` | stripe | Stripe customer not found for this user |
| `DELETE_ANONYMOUS_USER_DISABLED` | anonymous | Deleting anonymous users is disabled |
| `DEVICE_CODE_ALREADY_PROCESSED` | device-authorization | Device code already processed |
| `DEVICE_CODE_NOT_CLAIMED` | device-authorization | Device code has not been claimed by a verifying session; call `GET /device` with the `user_code` while signed in before approving or denying |
| `EMAIL_ALREADY_VERIFIED` | base | Email is already verified |
| `EMAIL_CAN_NOT_BE_UPDATED` | base | Email can not be updated |
| `EMAIL_MISMATCH` | base | Email mismatch |
| `EMAIL_NOT_VERIFIED` | base | Email not verified |
| `EMAIL_VERIFICATION_REQUIRED` | stripe | Email verification is required before you can subscribe to a plan |
| `EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION` | organization | Email verification required before accepting or rejecting invitation |
| `EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION` | organization | Email verification required to view or list invitations for the session email |
| `EXPIRED_DEVICE_CODE` | device-authorization | Device code has expired |
| `EXPIRED_USER_CODE` | device-authorization | User code has expired |
| `EXPIRES_IN_IS_TOO_LARGE` | api-key | The expiresIn is larger than the predefined maximum value. |
| `EXPIRES_IN_IS_TOO_SMALL` | api-key | The expiresIn is smaller than the predefined minimum value. |
| `FAILED_TO_CONSTRUCT_STRIPE_EVENT` | stripe | Failed to construct Stripe event |
| `FAILED_TO_CREATE_SESSION` | base | Failed to create session |
| `FAILED_TO_CREATE_USER` | base | Failed to create user |
| `FAILED_TO_CREATE_VERIFICATION` | base | Unable to create verification |
| `FAILED_TO_DELETE_ANONYMOUS_USER` | anonymous | Failed to delete anonymous user |
| `FAILED_TO_DELETE_ANONYMOUS_USER_SESSIONS` | anonymous | Failed to delete anonymous user sessions |
| `FAILED_TO_FETCH_PLANS` | stripe | Failed to fetch plans |
| `FAILED_TO_GET_SESSION` | base | Failed to get session |
| `FAILED_TO_GET_USER_INFO` | base | Failed to get user info |
| `FAILED_TO_RETRIEVE_INVITATION` | organization | Failed to retrieve invitation |
| `FAILED_TO_UNLINK_LAST_ACCOUNT` | base | You can't unlink your last account |
| `FAILED_TO_UPDATE_API_KEY` | api-key | Failed to update API key |
| `FAILED_TO_UPDATE_PASSKEY` | passkey | Failed to update passkey |
| `FAILED_TO_UPDATE_USER` | base | Failed to update user |
| `FAILED_TO_VERIFY_REGISTRATION` | passkey | Failed to verify registration |
| `FIELD_NOT_ALLOWED` | base | Field not allowed to be set |
| `ID_TOKEN_NOT_SUPPORTED` | base | id_token not supported |
| `INSUFFICIENT_API_KEY_PERMISSIONS` | api-key | You do not have permission to perform this action on organization API keys. |
| `INVALID_API_KEY` | api-key | Invalid API key. |
| `INVALID_API_KEY_GETTER_RETURN_TYPE` | api-key | API Key getter returned an invalid key type. Expected string. |
| `INVALID_BACKUP_CODE` | two-factor | Invalid backup code |
| `INVALID_CALLBACK_URL` | base | Invalid callbackURL |
| `INVALID_CODE` | two-factor | Invalid code |
| `INVALID_DEVICE_CODE` | device-authorization | Invalid device code |
| `INVALID_DEVICE_CODE_STATUS` | device-authorization | Invalid device code status |
| `INVALID_DISPLAY_USERNAME` | username | Display username is invalid |
| `INVALID_EMAIL` | base | Invalid email |
| `INVALID_EMAIL_FORMAT` | anonymous | Email was not generated in a valid format |
| `INVALID_EMAIL_OR_PASSWORD` | base | Invalid email or password |
| `INVALID_ERROR_CALLBACK_URL` | base | Invalid errorCallbackURL |
| `INVALID_METADATA_TYPE` | api-key | metadata must be an object or undefined |
| `INVALID_NAME_LENGTH` | api-key | The name length is either too large or too small. |
| `INVALID_NEW_USER_CALLBACK_URL` | base | Invalid newUserCallbackURL |
| `INVALID_OAUTH_CONFIGURATION` | generic-oauth | Invalid OAuth configuration |
| `INVALID_ORIGIN` | base | Invalid origin |
| `INVALID_OTP` | email-otp | Invalid OTP |
| `INVALID_PASSWORD` | base | Invalid password |
| `INVALID_PHONE_NUMBER` | phone-number | Invalid phone number |
| `INVALID_PHONE_NUMBER_OR_PASSWORD` | phone-number | Invalid phone number or password |
| `INVALID_PREFIX_LENGTH` | api-key | The prefix length is either too large or too small. |
| `INVALID_REDIRECT_URL` | base | Invalid redirectURL |
| `INVALID_REFERENCE_ID_FROM_API_KEY` | api-key | The reference id from the API key is invalid. |
| `INVALID_REMAINING` | api-key | The remaining count is either too large or too small. |
| `INVALID_REQUEST_BODY` | stripe | Invalid request body |
| `INVALID_RESOURCE` | organization | The provided permission includes an invalid resource |
| `INVALID_ROLE_TYPE` | admin | Invalid role type |
| `INVALID_SESSION_TOKEN` | multi-session | Invalid session token |
| `INVALID_TEAM_ID` | organization | Team id contains a reserved character |
| `INVALID_TOKEN` | base | Invalid token |
| `INVALID_TWO_FACTOR_COOKIE` | two-factor | Invalid two factor cookie |
| `INVALID_USER` | base | Invalid user |
| `INVALID_USERNAME` | username | Username is invalid |
| `INVALID_USERNAME_OR_PASSWORD` | username | Invalid username or password |
| `INVALID_USER_CODE` | device-authorization | Invalid user code |
| `INVALID_USER_ID_FROM_API_KEY` | api-key | The user id from the API key is invalid. |
| `INVITATION_LIMIT_REACHED` | organization | Invitation limit reached |
| `INVITATION_NOT_FOUND` | organization | Invitation not found |
| `INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION` | organization | Inviter is no longer a member of the organization |
| `KEY_DISABLED` | api-key | API Key is disabled |
| `KEY_DISABLED_EXPIRATION` | api-key | Custom key expiration values are disabled. |
| `KEY_EXPIRED` | api-key | API Key has expired |
| `KEY_NOT_FOUND` | api-key | API Key not found |
| `KEY_NOT_RECOVERABLE` | api-key | API Key is not recoverable |
| `LINKED_ACCOUNT_ALREADY_EXISTS` | base | Linked account already exists |
| `MEMBER_NOT_FOUND` | organization | Member not found |
| `METADATA_DISABLED` | api-key | Metadata is disabled. |
| `METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED` | base | POST method requires deferSessionRefresh to be enabled in session config |
| `MISSING_AC_INSTANCE` | organization | Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information |
| `MISSING_FIELD` | base | Field is required |
| `MISSING_OR_NULL_ORIGIN` | base | Missing or null Origin |
| `MISSING_RESPONSE` | captcha | Missing CAPTCHA response |
| `MISSING_SECRET_KEY` | captcha | Missing secret key |
| `NAME_REQUIRED` | api-key | API Key name is required. |
| `NO_ACTIVE_ORGANIZATION` | organization | No active organization |
| `NO_DATA_TO_UPDATE` | admin | No data to update |
| `NO_DEFAULT_API_KEY_CONFIGURATION_FOUND` | api-key | No default api-key configuration found. |
| `NO_VALUES_TO_UPDATE` | api-key | No values to update. |
| `ORGANIZATION_ALREADY_EXISTS` | organization | Organization already exists |
| `ORGANIZATION_HAS_ACTIVE_SUBSCRIPTION` | stripe | Cannot delete organization with active subscription |
| `ORGANIZATION_ID_REQUIRED` | api-key | Organization ID is required for organization-owned API keys. |
| `ORGANIZATION_MEMBERSHIP_LIMIT_REACHED` | organization | Organization membership limit reached |
| `ORGANIZATION_NOT_FOUND` | organization | Organization not found |
| `ORGANIZATION_PLUGIN_REQUIRED` | api-key | Organization plugin is required for organization-owned API keys. Please install and configure the organization plugin. |
| `ORGANIZATION_REFERENCE_ID_REQUIRED` | stripe | Reference ID is required. Provide referenceId or set activeOrganizationId in session |
| `ORGANIZATION_SLUG_ALREADY_TAKEN` | organization | Organization slug already taken |
| `ORGANIZATION_SUBSCRIPTION_NOT_ENABLED` | stripe | Organization subscription is not enabled |
| `ORIGIN_NOT_CONFIGURED` | passkey | Passkey origin is not configured. Set the `origin` option of the passkey plugin or configure `baseURL`. |
| `OTP_EXPIRED` | email-otp | OTP expired |
| `OTP_HAS_EXPIRED` | two-factor | OTP has expired |
| `OTP_NOT_CONFIGURED` | two-factor | OTP is not available |
| `OTP_NOT_ENABLED` | two-factor | OTP not enabled |
| `OTP_NOT_FOUND` | phone-number | OTP not found |
| `PASSKEY_NOT_FOUND` | passkey | Passkey not found |
| `PASSWORD_ALREADY_SET` | base | User already has a password set |
| `PASSWORD_CANNOT_BE_UPDATED_VIA_UPDATE_USER` | admin | Password cannot be updated through update-user. Use the set-user-password endpoint instead |
| `PASSWORD_TOO_LONG` | base | Password too long |
| `PASSWORD_TOO_SHORT` | base | Password too short |
| `PHONE_NUMBER_CANNOT_BE_SET` | phone-number | Phone number can only be set by verifying it |
| `PHONE_NUMBER_CANNOT_BE_UPDATED` | phone-number | Phone number cannot be updated |
| `PHONE_NUMBER_EXIST` | phone-number | Phone number already exists |
| `PHONE_NUMBER_NOT_EXIST` | phone-number | phone number isn't registered |
| `PHONE_NUMBER_NOT_VERIFIED` | phone-number | Phone number not verified |
| `PHONE_NUMBER_PENDING_VERIFICATION` | phone-number | Phone number requires account ownership proof |
| `POLLING_TOO_FREQUENTLY` | device-authorization | Polling too frequently |
| `POPUP_BLOCKED` | oauth-popup | Sign-in popup was blocked by the browser |
| `POPUP_CLOSED` | oauth-popup | Sign-in popup was closed before completing |
| `POPUP_SIGN_IN_FAILED` | oauth-popup | Popup sign-in failed |
| `POPUP_TIMEOUT` | oauth-popup | Sign-in popup timed out |
| `PREVIOUSLY_REGISTERED` | passkey | Previously registered |
| `PROVIDER_NOT_FOUND` | base | Provider not found |
| `RATE_LIMIT_EXCEEDED` | api-key | Rate limit exceeded. |
| `REFERENCE_ID_NOT_ALLOWED` | stripe | Reference id is not allowed |
| `REFILL_AMOUNT_AND_INTERVAL_REQUIRED` | api-key | refillAmount is required when refillInterval is provided |
| `REFILL_INTERVAL_AND_AMOUNT_REQUIRED` | api-key | refillInterval is required when refillAmount is provided |
| `REGISTRATION_CANCELLED` | passkey | Registration cancelled |
| `RESOLVED_USER_INVALID` | passkey | Resolved user is invalid |
| `RESOLVE_USER_REQUIRED` | passkey | Passkey registration requires either an authenticated session or a resolveUser callback when requireSession is false |
| `ROLE_IS_ASSIGNED_TO_MEMBERS` | organization | Cannot delete a role that is assigned to members. Please reassign the members to a different role first |
| `ROLE_NAME_IS_ALREADY_TAKEN` | organization | That role name is already taken |
| `ROLE_NOT_FOUND` | organization | Role not found |
| `SEND_OTP_NOT_IMPLEMENTED` | phone-number | sendOTP not implemented |
| `SERVER_ONLY_PROPERTY` | api-key | The property you're trying to set can only be set from the server auth instance only. |
| `SERVICE_UNAVAILABLE` | captcha | CAPTCHA service unavailable |
| `SESSION_EXPIRED` | base | Session expired. Re-authenticate to perform this action. |
| `SESSION_NOT_FRESH` | base | Session is not fresh |
| `SESSION_REQUIRED` | passkey | Passkey registration requires an authenticated session |
| `SOCIAL_ACCOUNT_ALREADY_LINKED` | base | Social account already linked |
| `STRIPE_SIGNATURE_NOT_FOUND` | stripe | Stripe signature not found |
| `STRIPE_WEBHOOK_ERROR` | stripe | Stripe webhook error |
| `STRIPE_WEBHOOK_SECRET_NOT_FOUND` | stripe | Stripe webhook secret not found |
| `SUBSCRIPTION_NOT_ACTIVE` | stripe | Subscription is not active |
| `SUBSCRIPTION_NOT_FOUND` | stripe | Subscription not found |
| `SUBSCRIPTION_NOT_PENDING_CHANGE` | stripe | Subscription has no pending cancellation or scheduled plan change |
| `SUBSCRIPTION_NOT_SCHEDULED_FOR_CANCELLATION` | stripe | Subscription is not scheduled for cancellation |
| `SUBSCRIPTION_PLAN_NOT_FOUND` | stripe | Subscription plan not found |
| `TEAM_ALREADY_EXISTS` | organization | Team already exists |
| `TEAM_MEMBER_LIMIT_REACHED` | organization | Team member limit reached |
| `TEAM_NOT_FOUND` | organization | Team not found |
| `TOKEN_EXPIRED` | base | Token expired |
| `TOKEN_URL_NOT_FOUND` | generic-oauth | Invalid OAuth configuration. Token URL not found. |
| `TOO_MANY_ATTEMPTS` | email-otp | Too many attempts |
| `TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE` | two-factor | Too many attempts. Please request a new code. |
| `TOO_MANY_ROLES` | organization | This organization has too many roles |
| `TOTP_ALREADY_ENABLED` | two-factor | TOTP is already enabled |
| `TOTP_NOT_CONFIGURED` | two-factor | TOTP is not available |
| `TOTP_NOT_ENABLED` | two-factor | TOTP not enabled |
| `TWO_FACTOR_NOT_ENABLED` | two-factor | Two factor isn't enabled |
| `UNABLE_TO_CREATE_BILLING_PORTAL` | stripe | Unable to create billing portal session |
| `UNABLE_TO_CREATE_CUSTOMER` | stripe | Unable to create customer |
| `UNABLE_TO_CREATE_SESSION` | passkey | Unable to create session |
| `UNABLE_TO_REMOVE_LAST_TEAM` | organization | Unable to remove last team |
| `UNAUTHORIZED` | stripe | Unauthorized access |
| `UNAUTHORIZED_SESSION` | api-key | Unauthorized or invalid session |
| `UNEXPECTED_ERROR` | phone-number | Unexpected error |
| `UNKNOWN_ERROR` | captcha | Something went wrong |
| `USAGE_EXCEEDED` | api-key | API Key has reached its usage limit |
| `USERNAME_IS_ALREADY_TAKEN` | username | Username is already taken. Please try another. |
| `USERNAME_IS_IMMUTABLE` | username | Username cannot be updated |
| `USERNAME_TOO_LONG` | username | Username is too long |
| `USERNAME_TOO_SHORT` | username | Username is too short |
| `USER_ALREADY_EXISTS` | base | User already exists. |
| `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL` | base | User already exists. Use another email. |
| `USER_ALREADY_HAS_PASSWORD` | base | User already has a password. Provide that to delete the account. |
| `USER_BANNED` | api-key | User is banned |
| `USER_EMAIL_NOT_FOUND` | base | User email not found |
| `USER_ID_CANNOT_BE_UPDATED` | admin | User id cannot be updated |
| `USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION` | organization | User is already a member of this organization |
| `USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION` | organization | User is already invited to this organization |
| `USER_IS_NOT_ANONYMOUS` | anonymous | User is not anonymous |
| `USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION` | organization | User is not a member of the organization |
| `USER_IS_NOT_A_MEMBER_OF_THE_TEAM` | organization | User is not a member of the team |
| `USER_NOT_FOUND` | base | User not found |
| `USER_NOT_MEMBER_OF_ORGANIZATION` | api-key | You are not a member of the organization that owns this API key. |
| `VALIDATION_ERROR` | base | Validation Error |
| `VERIFICATION_EMAIL_NOT_ENABLED` | base | Verification email isn't enabled |
| `VERIFICATION_FAILED` | captcha | Captcha verification failed |
| `YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION` | organization | You are not allowed to access this organization as an owner |
| `YOU_ARE_NOT_ALLOWED_TO_BAN_USERS` | admin | You are not allowed to ban users |
| `YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION` | organization | You are not allowed to cancel this invitation |
| `YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE` | admin | You are not allowed to change users role |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION` | organization | You are not allowed to create a new organization |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM` | organization | You are not allowed to create a new team |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER` | organization | You are not allowed to create a new member |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE` | organization | You are not allowed to create a role |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION` | organization | You are not allowed to create teams in this organization |
| `YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS` | admin | You are not allowed to create users |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE` | organization | You are not allowed to delete a role |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION` | organization | You are not allowed to delete teams in this organization |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER` | organization | You are not allowed to delete this member |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION` | organization | You are not allowed to delete this organization |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM` | organization | You are not allowed to delete this team |
| `YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS` | admin | You are not allowed to delete users |
| `YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE` | organization | You are not allowed to get a role |
| `YOU_ARE_NOT_ALLOWED_TO_GET_USER` | admin | You are not allowed to get user |
| `YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS` | admin | You are not allowed to impersonate users |
| `YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION` | organization | You are not allowed to invite users to this organization |
| `YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE` | organization | You are not allowed to invite a user with this role |
| `YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE` | organization | You are not allowed to list a role |
| `YOU_ARE_NOT_ALLOWED_TO_LIST_INVITATIONS` | organization | You are not allowed to list invitations for this organization |
| `YOU_ARE_NOT_ALLOWED_TO_LIST_USERS` | admin | You are not allowed to list users |
| `YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS` | admin | You are not allowed to list users sessions |
| `YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE` | organization | You are not allowed to read a role |
| `YOU_ARE_NOT_ALLOWED_TO_REGISTER_THIS_PASSKEY` | passkey | You are not allowed to register this passkey |
| `YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER` | organization | You are not allowed to remove a team member |
| `YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS` | admin | You are not allowed to revoke users sessions |
| `YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE` | admin | You are not allowed to set a non-existent role value |
| `YOU_ARE_NOT_ALLOWED_TO_SET_USERS_EMAIL` | admin | You are not allowed to update users email |
| `YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD` | admin | You are not allowed to set users password |
| `YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PHONE_NUMBER` | admin | You are not allowed to update users phone number |
| `YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE` | organization | You are not allowed to update a role |
| `YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER` | organization | You are not allowed to update this member |
| `YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION` | organization | You are not allowed to update this organization |
| `YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM` | organization | You are not allowed to update this team |
| `YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS` | admin | You are not allowed to update users |
| `YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION` | organization | You are not a member of this organization |
| `YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION` | organization | You are not the recipient of the invitation |
| `YOU_CANNOT_BAN_YOURSELF` | admin | You cannot ban yourself |
| `YOU_CANNOT_IMPERSONATE_ADMINS` | admin | You cannot impersonate admins |
| `YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER` | organization | You cannot leave the organization as the only owner |
| `YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER` | organization | You cannot leave the organization without an owner |
| `YOU_CANNOT_REMOVE_YOURSELF` | admin | You cannot remove yourself |
| `YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM` | organization | You are not allowed to list the members of this team |
| `YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM` | organization | You do not have an active team |
| `YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS` | organization | You have reached the maximum number of organizations |
| `YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS` | organization | You have reached the maximum number of teams |
| `YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE` | organization | You must be in an organization to create a role |

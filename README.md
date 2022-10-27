# TrackMember
This is an app built with MERN and TypeScript.

## Stacks
* Plan: React, React Router Dom, Express, MongoDB(mongoose), SCSS
* APIs: Map APIs, text, email

## Flows
* User can login with email or text verification
* Add or Remove members
* Added member get confirmation email or text
* Only added verified, confirmed member
* Share their current location
* Send alert

### Verification
* First login will have 48 hours token
* Try login with expired token will be denied
* Try login with new token will reset token and success

# twilio-otp-verification-demo

--There will be two APIs:
  -One is for sendind OTP to the user for user verification or other purpose.
  -Second one is for OTP verification to verify the user.

# Send OTP API:
  -HTTP Method 'POST'
  -API endpoint 'host/v1/otp/send-otp'
  -Request body:      
    {
      "phone_no": "+916294175525" // Need to use country code before phone number.
    }

  -Response body:     
    {
      "status": true,
      "message": "OTP send successfully."
    }

# Verify OTP API:
  -HTTP Method 'POST'
  -API endpoint 'host/v1/otp/verify-otp'
  -OTP Expiration time 5 minutes
  -Request body: 
    {
      "phone_no": "+916294175525",
      "otp": "676757"
    }

  -Response body: 
    {
      "status": true,
      "message": "OTP verified successfully."
    }

--Thease are the two APIs. No validations added on request body.

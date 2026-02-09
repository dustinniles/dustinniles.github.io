# Formspree API Contract

**Service**: Formspree Contact Form Backend
**Endpoint**: `https://formspree.io/f/{FORM_ID}`
**Documentation**: https://formspree.io/docs

## Overview

Formspree provides form-to-email service for static sites. Form submissions are sent via HTTP POST to Formspree's endpoint, which forwards the data to configured email addresses.

## Authentication

- **Public Form ID**: Embedded in client-side code (safe to expose)
- **No API Keys Required**: Form ID acts as identifier
- **Rate Limiting**: Free tier allows 5 submissions/month per form

## Request Specification

### Endpoint
```
POST https://formspree.io/f/{FORM_ID}
```

### Headers
```
Content-Type: application/x-www-form-urlencoded
Accept: application/json
Origin: https://dustinniles.github.io
```

### Request Body (Form Data)
```typescript
interface FormspreeRequest {
  name: string;           // Required, visitor name
  email: string;          // Required, visitor email
  message: string;        // Required, message content
  _replyto?: string;      // Optional, sets reply-to header
  _subject?: string;      // Optional, email subject override
  _cc?: string;          // Optional, CC email addresses
}
```

### Example Request (JavaScript fetch)
```typescript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('message', 'Hello, I would like to discuss...');

const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: {
    'Accept': 'application/json'
  }
});
```

## Response Specification

### Success Response (200 OK)
```json
{
  "ok": true,
  "next": "https://formspree.io/thanks"
}
```

### Error Response (400 Bad Request)
```json
{
  "ok": false,
  "errors": [
    {
      "field": "email",
      "message": "is invalid"
    }
  ]
}
```

### Error Response (429 Too Many Requests)
```json
{
  "ok": false,
  "error": "Too many requests"
}
```

### Response Interface
```typescript
interface FormspreeSuccessResponse {
  ok: true;
  next: string;
}

interface FormspreeErrorResponse {
  ok: false;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  error?: string;
}

type FormspreeResponse = FormspreeSuccessResponse | FormspreeErrorResponse;
```

## Error Handling

### Client-Side Validation
```typescript
function validateContactForm(data: FormData): string[] {
  const errors: string[] = [];

  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const message = data.get('message') as string;

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Please enter a valid email address');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return errors;
}
```

### Network Error Handling
```typescript
async function submitContactForm(formData: FormData): Promise<FormspreeResponse> {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error('Failed to send message. Please try again.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}
```

## Security Considerations

### CORS
- Formspree allows cross-origin requests from any domain
- Origin header sent automatically by browser
- No additional CORS configuration needed

### CSP Requirements
```
Content-Security-Policy:
  form-action 'self' https://formspree.io;
  connect-src 'self' https://formspree.io;
```

### Rate Limiting
- Free tier: 5 submissions/month
- Pro tier: Unlimited submissions ($25/month)
- Rate limit errors return 429 status code

### Spam Protection
- Formspree includes built-in spam filtering
- Optional: Add honeypot field (hidden from users)
- Optional: Enable CAPTCHA in Formspree dashboard

### Honeypot Example
```html
<input
  type="text"
  name="_gotcha"
  style="display:none"
  tabindex="-1"
  autocomplete="off"
/>
```

## Setup Instructions

1. **Create Formspree Account**
   - Visit https://formspree.io
   - Sign up with email (free tier)

2. **Create New Form**
   - Dashboard → New Project → Add Form
   - Form name: "Portfolio Contact Form"
   - Email destination: your-email@example.com

3. **Copy Form ID**
   - Format: `xxxxxxxxxxxxxxxx` (random alphanumeric)
   - Example: `mqkvrznb`

4. **Configure Form Settings** (optional)
   - Enable email notifications
   - Set custom reply-to email
   - Enable spam protection
   - Add confirmation message

5. **Integrate in Next.js**
   - Replace `YOUR_FORM_ID` in contact form component
   - Test submission in development
   - Deploy and verify production

## Testing

### Development Testing
```bash
# Test with curl
curl -X POST https://formspree.io/f/YOUR_FORM_ID \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -d "name=Test User&email=test@example.com&message=Test message"
```

### Expected Behavior
- **First submission**: Formspree sends confirmation email to verify ownership
- **Subsequent submissions**: Delivered immediately to configured email
- **Response time**: Typically 200-500ms
- **Email delivery**: Within 1-2 minutes

## Monitoring

### Success Metrics
- Monitor 200 OK responses
- Track form submission completion rate
- Review email delivery in Formspree dashboard

### Error Tracking
- Log 400 errors (validation failures)
- Alert on 429 errors (rate limit exceeded)
- Monitor network errors (timeouts, connection failures)

## Migration Path

### If Switching Away from Formspree
1. Export submission data from Formspree dashboard
2. Update contact form to use new endpoint
3. Update CSP headers
4. Test thoroughly before deploying

### Upgrade to Pro Tier
- Trigger: Exceeding 5 submissions/month
- Cost: $25/month
- Benefits: Unlimited submissions, priority support, analytics


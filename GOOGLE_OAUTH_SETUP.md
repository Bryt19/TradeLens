# Google OAuth Setup for TradeLens

To enable Google OAuth authentication in your TradeLens app, you need to configure Google OAuth in your Supabase project.

## Steps to Configure Google OAuth:

### 1. Go to Google Cloud Console

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API

### 2. Create OAuth 2.0 Credentials

1. Go to "Credentials" in the Google Cloud Console
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized redirect URIs:
   - `https://uabknquqcpcbhhiafeqw.supabase.co/auth/v1/callback`
   - For local development: `http://localhost:3000/auth/v1/callback`

### 3. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to Authentication → Providers
3. Enable Google provider
4. Add your Google OAuth credentials:
   - Client ID: (from Google Cloud Console)
   - Client Secret: (from Google Cloud Console)

### 4. Update Site URL (Optional)

In Supabase Authentication → URL Configuration:

- Site URL: `http://localhost:3000` (for development)
- Redirect URLs: Add your production domain when ready

## Testing

Once configured, users can click "Continue with Google" in the authentication modal to sign in using their Google account.

## Notes

- The Google OAuth button is already implemented in the AuthModal component
- Session persistence is handled automatically by Supabase
- Users will be redirected back to your app after successful authentication

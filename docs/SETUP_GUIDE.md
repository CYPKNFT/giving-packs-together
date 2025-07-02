# Setup and Installation Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Development Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd <project-name>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
The project uses Supabase with the following configuration:
- **Project ID**: 94611ddc-6a69-4836-8f73-9bc8ae2043d0
- **Supabase URL**: https://spasnvnxvvkrfigxurhy.supabase.co
- **Anon Key**: Configured in `src/integrations/supabase/client.ts`

No additional environment variables are required for basic setup.

### 4. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:8080`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run build:dev` - Create development build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Quality
- ESLint configuration in `eslint.config.js`
- TypeScript configuration in `tsconfig.json`
- Prettier (if configured)

## Database Setup

### Supabase Configuration
The project connects to a Supabase instance with:

#### Tables
- `profiles` - User profile information
  - id (uuid, primary key)
  - created_at (timestamp)
  - updated_at (timestamp)
  - first_name (text)
  - last_name (text)

#### Row Level Security (RLS)
- Users can only access their own profile data
- Insert/Update/Select policies implemented
- No delete permissions on profiles

#### Functions
- `handle_new_user()` - Automatically creates profile on user registration

### Local Development with Supabase
1. Ensure Supabase project is accessible
2. Verify connection in browser console
3. Test authentication flow

## Deployment

### Build Process
```bash
npm run build
```
Generates optimized files in `dist/` directory.

### Deployment Options
1. **Lovable Platform** (Recommended)
   - Click "Publish" in Lovable editor
   - Automatic deployment and hosting

2. **Custom Hosting**
   - Deploy `dist/` folder to any static hosting service
   - Ensure proper routing configuration for SPA

### Environment Variables for Production
- No environment variables required
- All configuration is hardcoded for Supabase connection

## Troubleshooting

### Common Issues
1. **Build Errors**: Ensure all TypeScript types are properly defined
2. **Supabase Connection**: Verify network connectivity and credentials
3. **Route Issues**: Ensure React Router is properly configured
4. **Styling Issues**: Check Tailwind CSS compilation

### Debug Mode
Enable development tools:
1. Open browser developer console
2. Check Network tab for API calls
3. Use React Developer Tools extension
4. Monitor Supabase logs in dashboard

### Performance Monitoring
- Use browser Performance tab
- Monitor bundle size with build output
- Check for unnecessary re-renders with React Profiler
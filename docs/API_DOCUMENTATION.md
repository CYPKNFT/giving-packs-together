# API Documentation

## Supabase Integration

### Authentication API

#### User Registration
```typescript
// Sign up new user
const { data, error } = await supabase.auth.signUp({
  email: string,
  password: string,
  options: {
    data: {
      first_name: string,
      last_name: string
    }
  }
})
```
**Response**: User object with confirmation status
**Side Effects**: Triggers `handle_new_user()` function to create profile

#### User Login
```typescript
// Sign in existing user
const { data, error } = await supabase.auth.signInWithPassword({
  email: string,
  password: string
})
```
**Response**: User session with access token
**Storage**: Session automatically stored in localStorage

#### Password Reset
```typescript
// Request password reset
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: 'https://yourapp.com/reset-password'
})
```
**Response**: Success confirmation
**Flow**: User receives email with reset link

#### Session Management
```typescript
// Get current session
const { data: { session } } = await supabase.auth.getSession()

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  // Handle auth state changes
})
```

### Database API

#### Profiles Table
**Table**: `public.profiles`
**RLS**: Enabled (users can only access their own data)

##### Get User Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```
**Response**: User profile object
**Security**: RLS ensures user can only access their own profile

##### Update User Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({
    first_name: string,
    last_name: string
  })
  .eq('id', userId)
```
**Response**: Updated profile object
**Constraints**: Only authenticated user can update their own profile

##### Create User Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .insert({
    id: userId,
    first_name: string,
    last_name: string
  })
```
**Note**: Typically handled automatically by database trigger

### Database Schema

#### Tables Structure

##### profiles
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT,
  last_name TEXT
);
```

**Indexes**:
- Primary key on `id`
- Foreign key reference to `auth.users(id)`

**Triggers**:
- `handle_new_user()` on `auth.users` INSERT

#### Row Level Security Policies

##### profiles Table Policies
```sql
-- SELECT Policy
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- INSERT Policy  
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- UPDATE Policy
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- DELETE Policy
-- Users cannot delete their profiles (not implemented)
```

### Database Functions

#### handle_new_user()
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';
```
**Trigger**: Executes after user registration
**Purpose**: Automatically creates profile record for new users
**Security**: SECURITY DEFINER allows function to bypass RLS

### Error Handling

#### Common Error Responses
```typescript
// Authentication Errors
{
  error: {
    message: "Invalid login credentials",
    status: 400
  }
}

// Database Errors  
{
  error: {
    message: "Row Level Security Policy violated",
    status: 403
  }
}

// Network Errors
{
  error: {
    message: "Failed to fetch",
    status: 0
  }
}
```

#### Error Handling Patterns
```typescript
// React Query Error Handling
const { data, error, isLoading } = useQuery({
  queryKey: ['profile', userId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },
  onError: (error) => {
    toast.error('Failed to load profile')
    console.error('Profile error:', error)
  }
})
```

### React Query Integration

#### Query Keys Convention
```typescript
// User-related queries
['user'] // Current user session
['profile', userId] // User profile
['profiles'] // All profiles (admin only)

// Project-related queries (future implementation)
['projects'] // All projects
['project', projectId] // Single project
['categories'] // Project categories
['items', projectId] // Project items
```

#### Custom Hooks Pattern
```typescript
// useAuth hook
export const useAuth = () => {
  const queryClient = useQueryClient()
  
  const { data: session } = useQuery({
    queryKey: ['user'],
    queryFn: () => supabase.auth.getSession()
  })
  
  const signOut = useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      queryClient.clear() // Clear all cached data
    }
  })
  
  return { session, signOut }
}
```

### Future API Extensions

#### Projects API (To Be Implemented)
```typescript
// Get all projects
const { data: projects } = await supabase
  .from('projects')
  .select(`
    *,
    organization:organizations(*),
    items:project_items(*)
  `)

// Get project by ID
const { data: project } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .single()
```

#### Donations API (To Be Implemented)
```typescript
// Create donation
const { data: donation } = await supabase
  .from('donations')
  .insert({
    user_id: userId,
    project_id: projectId,
    item_id: itemId,
    quantity: number,
    status: 'pending'
  })

// Get user donations
const { data: donations } = await supabase
  .from('donations')
  .select(`
    *,
    project:projects(*),
    item:project_items(*)
  `)
  .eq('user_id', userId)
```

### API Rate Limits

#### Supabase Limits
- **API Requests**: 1000 requests per minute (free tier)
- **Database Connections**: 60 concurrent connections
- **Storage**: 500MB (free tier)
- **Auth Users**: 50,000 monthly active users

#### Client-Side Caching
```typescript
// React Query default configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
})
```

### Security Considerations

#### Client-Side Security
- All API keys are public (anon key)
- Authentication handled by JWT tokens
- RLS policies enforce data access rules
- XSS protection via React's built-in sanitization

#### Best Practices
1. **Never expose service role key** on client
2. **Use RLS policies** for all data access
3. **Validate input** on both client and server
4. **Implement rate limiting** for sensitive operations
5. **Log security events** for monitoring
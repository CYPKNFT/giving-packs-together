# Component Documentation

## Core Components

### Navigation Components

#### Navbar
**Location**: `src/components/Navbar.tsx`
**Purpose**: Main navigation bar with authentication state
**Props**: None (uses AuthContext)

**Features**:
- Responsive design with mobile menu
- Authentication state display
- User avatar and dropdown menu
- Navigation links to key pages

**Dependencies**:
- AuthContext for user state
- React Router for navigation
- Lucide React for icons

**Usage**:
```tsx
<Navbar />
```

#### Footer
**Location**: `src/components/Footer.tsx`
**Purpose**: Site footer with links and information
**Props**: None

**Features**:
- Company information
- Quick links
- Social media links
- Copyright information

### Content Components

#### Hero
**Location**: `src/components/Hero.tsx`
**Purpose**: Landing page hero section
**Props**: None

**Features**:
- Compelling headline and description
- Call-to-action buttons
- Background image
- Responsive layout

#### CategoryCard
**Location**: `src/components/CategoryCard.tsx`
**Purpose**: Display donation categories
**Props**:
```typescript
interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectCount: number;
}
```

**Features**:
- Category image display
- Project count indicator
- Navigation to category projects
- Hover effects

#### ProjectCard
**Location**: `src/components/ProjectCard.tsx`
**Purpose**: Display individual project information
**Props**:
```typescript
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  organization: string;
  itemsFulfilled: number;
  itemsNeeded: number;
}
```

**Features**:
- Project image and details
- Progress bar for completion
- Organization attribution
- Navigation to project detail

### Interactive Components

#### ProgressBar
**Location**: `src/components/ProgressBar.tsx`
**Purpose**: Visual progress indicator
**Props**:
```typescript
interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}
```

**Features**:
- Color-coded status (danger/warning/success)
- Percentage calculation
- Optional label display
- Smooth animations

#### ItemNeeds
**Location**: `src/components/ItemNeeds.tsx`
**Purpose**: Display specific items needed for projects
**Props**: 
```typescript
interface Item {
  id: string;
  name: string;
  description: string;
  quantityNeeded: number;
  quantityFulfilled: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  estimatedCost?: number;
  imageUrl?: string;
}
```

**Features**:
- Item list with progress tracking
- Priority indicators
- Donation buttons
- Cost estimation

### Special Components

#### ImpactStoriesSection
**Location**: `src/components/ImpactStoriesSection.tsx`
**Purpose**: Showcase beneficiary testimonials
**Props**: None

**Features**:
- Rotating testimonials
- Beneficiary photos and quotes
- Navigation controls
- Responsive carousel

#### TestimonialCarousel
**Location**: `src/components/TestimonialCarousel.tsx`
**Purpose**: Rotating testimonial display
**Props**: None

**Features**:
- Auto-rotating slides
- Manual navigation
- Smooth transitions
- Responsive design

#### UrgencyBanner
**Location**: `src/components/UrgencyBanner.tsx`
**Purpose**: Highlight urgent donation needs
**Props**: None

**Features**:
- Time-sensitive messaging
- Progress indicators
- Action buttons
- Animated elements

### Utility Components

#### StoryCard
**Location**: `src/components/StoryCard.tsx`
**Purpose**: Individual story/testimonial display
**Props**:
```typescript
interface StoryCardProps {
  image: string;
  quote: string;
  beneficiaryName: string;
  donationLink: string;
}
```

**Features**:
- Beneficiary photo
- Quote display
- Call-to-action button
- Consistent styling

#### PrimaryDonationCTA
**Location**: `src/components/PrimaryDonationCTA.tsx`
**Purpose**: Sticky donation call-to-action
**Props**:
```typescript
interface PrimaryDonationCTAProps {
  variant?: "default" | "alternative";
  onDonate: () => void;
}
```

**Features**:
- Sticky positioning
- Multiple variants
- Icon integration
- Click handling

## Page Components

### Index (Landing Page)
**Location**: `src/pages/Index.tsx`
**Purpose**: Main landing page
**Components Used**:
- Navbar
- Hero
- CategoryCard (multiple)
- ProjectCard (multiple)
- ImpactStoriesSection
- Footer

**Features**:
- Category browsing
- Featured projects
- Impact stories
- Full navigation structure

### ProjectDetail
**Location**: `src/pages/ProjectDetail.tsx`
**Purpose**: Detailed project view
**Props**: Route parameter `id`

**Current Issues**:
- Monolithic component (500+ lines)
- Mixed responsibilities
- Type definition conflicts
- Performance concerns

**Refactoring Plan**:
1. Extract ProjectHeader component
2. Extract ProjectAbout component
3. Extract ProjectItems component
4. Extract ProjectStats component
5. Create ProjectDetailLayout wrapper

### Authentication Pages

#### Login
**Location**: `src/pages/Login.tsx`
**Purpose**: User authentication
**Features**:
- Email/password form
- Supabase integration
- Error handling
- Navigation to signup

#### Signup
**Location**: `src/pages/Signup.tsx`
**Purpose**: User registration
**Features**:
- Registration form
- Profile creation
- Validation
- Welcome flow

## UI Component Library (Shadcn)

### Core UI Components
Located in `src/components/ui/`

#### Button
- Multiple variants (default, outline, ghost, etc.)
- Size variations
- Icon support
- Loading states

#### Card
- Structured content layout
- Header, content, footer sections
- Consistent spacing
- Hover effects

#### Input
- Form input controls
- Validation states
- Label integration
- Accessibility features

#### Dialog/Modal
- Overlay modals
- Accessibility compliant
- Animation support
- Portal rendering

### Form Components
- Form wrapper with validation
- Input, textarea, select controls
- Checkbox and radio groups
- Error message display

### Navigation Components
- Navigation menu
- Dropdown menu
- Breadcrumb navigation
- Pagination controls

### Feedback Components
- Toast notifications
- Alert messages
- Progress indicators
- Loading skeletons

## Component Best Practices

### Design Patterns
1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Use component composition
3. **Props Interface**: Define clear TypeScript interfaces
4. **Default Props**: Provide sensible defaults
5. **Error Boundaries**: Handle component errors gracefully

### Performance Optimization
1. **React.memo**: Memoize expensive components
2. **useCallback**: Memoize event handlers
3. **useMemo**: Memoize expensive calculations
4. **Lazy Loading**: Split components with React.lazy

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Provide screen reader support
3. **Keyboard Navigation**: Support keyboard interaction
4. **Color Contrast**: Ensure adequate contrast ratios

### Testing Strategy
1. **Unit Tests**: Test component logic
2. **Integration Tests**: Test component interactions
3. **Visual Tests**: Test UI rendering
4. **Accessibility Tests**: Test screen reader compatibility
# Admin System & Project Creation Specification

## Overview
Implementation of a comprehensive admin system that allows organizations to submit projects for review and super admins to manage the approval process.

## Core Features

### 1. User Roles & Permissions

#### Role Hierarchy
- **Super Admin**: Full system access, can approve/reject projects, manage organizations
- **Organization Admin**: Can submit projects for their organization, manage their projects
- **Project Manager**: Can edit specific projects within their organization

#### Permission Matrix
| Action | Super Admin | Org Admin | Project Manager |
|--------|-------------|-----------|-----------------|
| Create Projects | ✅ | ✅ | ❌ |
| Edit Own Projects | ✅ | ✅ | ✅ |
| Approve/Reject Projects | ✅ | ❌ | ❌ |
| Manage Organizations | ✅ | ❌ | ❌ |
| View All Projects | ✅ | Own Org Only | Assigned Only |

### 2. Authentication System

#### Admin Login Flow
1. **Admin Login Page** (`/admin/login`)
   - Email/password authentication
   - Role-based redirect after login
   - "Register Organization" link for new organizations

2. **Organization Registration** (`/admin/register`)
   - Organization details form
   - Creates organization and first admin user
   - Requires super admin approval

#### Security Features
- JWT-based authentication with role validation
- Protected routes based on user roles
- Session management with auto-logout

### 3. Project Creation & Management

#### Project Submission Flow
1. **Create Project Page** (`/admin/create-project`)
   - Multi-step form with validation
   - File upload for project images
   - Item needs specification
   - Draft/submit options

2. **Project Status States**
   - `draft`: Being edited by organization
   - `pending`: Submitted for review
   - `active`: Approved and live
   - `rejected`: Rejected with feedback
   - `completed`: Project finished
   - `paused`: Temporarily inactive

#### Project Form Sections
- **Basic Information**: Title, description, category
- **Organization Details**: Auto-filled from user's organization
- **Project Timeline**: Start/end dates, urgency level
- **Items Needed**: Dynamic list of required items
- **Media**: Hero image, additional photos
- **Location & Beneficiaries**: Geographic and demographic info

### 4. Admin Dashboard

#### Super Admin Dashboard
- **Pending Reviews**: Projects awaiting approval
- **Organization Management**: Register/approve new organizations
- **System Analytics**: User activity, project statistics
- **Bulk Actions**: Mass approve/reject functionality

#### Organization Admin Dashboard
- **My Projects**: All projects for their organization
- **Create New Project**: Quick access to project creation
- **Project Analytics**: Donation tracking, fulfillment rates
- **Organization Profile**: Edit organization details

### 5. Review & Approval System

#### Review Workflow
1. Organization submits project (status: `pending`)
2. Super admin receives notification
3. Review process includes:
   - Project details verification
   - Organization legitimacy check
   - Content moderation
4. Decision: Approve → `active` or Reject → `rejected` with feedback

#### Review Interface
- **Project Preview**: How it will appear on public site
- **Organization History**: Previous projects, success rate
- **Checklist**: Predefined approval criteria
- **Comments System**: Internal notes and feedback

### 6. Database Schema Changes

#### New Tables Required
```sql
-- Organizations (already exists, may need updates)
-- admin_users (already exists)
-- projects (already exists, needs status field updates)

-- New: Project Review Log
CREATE TABLE project_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  reviewer_id UUID REFERENCES admin_users(id),
  status TEXT NOT NULL, -- 'approved', 'rejected'
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- New: Organization Applications
CREATE TABLE organization_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Implementation Phases

### Phase 1: Foundation (Priority: High)
- [ ] Admin login page with role-based authentication
- [ ] Admin dashboard layout and navigation
- [ ] Protected route system for admin areas
- [ ] Basic admin user management

### Phase 2: Project Management (Priority: High)
- [ ] Project creation form for organizations
- [ ] Project status management system
- [ ] Organization dashboard for managing projects
- [ ] File upload system for project images

### Phase 3: Review System (Priority: Medium)
- [ ] Super admin review interface
- [ ] Approval/rejection workflow
- [ ] Email notifications for status changes
- [ ] Feedback and comments system

### Phase 4: Advanced Features (Priority: Low)
- [ ] Organization registration and approval
- [ ] Advanced analytics and reporting
- [ ] Bulk operations for super admins
- [ ] Audit trail and activity logging

## User Interface Design

### Design Principles
- Clean, professional admin interface
- Responsive design for mobile/tablet access
- Consistent with existing public site branding
- Intuitive navigation and user flows

### Key Pages Layout
1. **Admin Login**: Centered form with organization registration link
2. **Dashboard**: Sidebar navigation, stats cards, quick actions
3. **Project Form**: Multi-step wizard with progress indicator
4. **Review Interface**: Split view - project preview and review tools
5. **Organization Management**: Table view with search and filters

## Technical Considerations

### Security
- Role-based access control (RBAC)
- Input validation and sanitization
- File upload security (image validation, size limits)
- Rate limiting on sensitive operations

### Performance
- Lazy loading for large project lists
- Image optimization and CDN integration
- Efficient database queries with proper indexing
- Caching for frequently accessed data

### User Experience
- Auto-save for long forms
- Progress indicators for multi-step processes
- Toast notifications for user feedback
- Confirmation dialogs for destructive actions

## Success Metrics
- Time to create and submit a project
- Admin review completion time
- User adoption rate among organizations
- System uptime and performance

---

## Next Steps
1. Review and approve this specification
2. Set up database schema changes
3. Implement Phase 1 features
4. Test and iterate based on feedback
5. Progressive rollout to selected organizations
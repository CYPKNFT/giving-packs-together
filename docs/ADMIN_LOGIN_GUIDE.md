# Admin System Login Guide

## How to Access the Admin Portal

### 🔑 Admin Login Process

1. **Navigate to Admin Login**
   - Go to `/admin/login` 
   - Or click "Start a Project" from the main site, then "Admin Portal"

2. **Login Credentials**
   - Use your organization admin email and password
   - These are created during organization registration

3. **First-Time Setup (New Organizations)**
   - Go to `/admin/register` to apply as a new organization
   - Fill out organization details and contact information
   - Wait for super admin approval (1-2 business days)
   - Once approved, you can login and start creating projects

---

## 🏢 User Roles & Access

### Super Admin
- **Login**: Use super admin credentials
- **Access**: Full system access
- **Capabilities**:
  - Review and approve/reject projects
  - Manage all organizations
  - View system analytics
  - Approve new organization applications

### Organization Admin
- **Login**: Use organization admin credentials  
- **Access**: Organization-specific access
- **Capabilities**:
  - Create and manage projects for their organization
  - Submit projects for review
  - View organization analytics
  - Manage organization profile

### Project Manager
- **Login**: Use project manager credentials
- **Access**: Limited to specific projects
- **Capabilities**:
  - Edit assigned projects
  - View project analytics
  - Update project items

---

## 📋 Project Creation Workflow

### For Organization Admins:

1. **Login to Admin Portal**
   - Go to `/admin/login`
   - Enter your credentials

2. **Create New Project**
   - Navigate to "Projects" in admin dashboard
   - Click "Create New Project"
   - Fill out project details:
     - Basic information (title, description)
     - Items needed (quantities, categories, priorities)
     - Timeline and location details
     - Media and links

3. **Save or Submit**
   - **Save as Draft**: Keep working on it later
   - **Submit for Review**: Send to super admin for approval

4. **Project Review Process**
   - Super admin reviews submitted projects
   - Projects can be approved (become public) or rejected (with feedback)
   - You'll be notified of the decision

5. **Published Projects**
   - Approved projects become visible to public donors
   - You can track donations and fulfillment progress
   - Update project status as needed

---

## 🛡️ Super Admin Functions

### Project Review Dashboard
- **Pending Projects**: List of projects awaiting review
- **Review Interface**: 
  - Preview how project will appear publicly
  - Check organization legitimacy
  - Approve or reject with feedback

### Organization Management
- **New Applications**: Review organization registration requests
- **Existing Organizations**: Manage organization status and details
- **User Management**: Create/deactivate admin users

---

## 🔧 Initial Super Admin Setup

To set up the first super admin user, you'll need to manually insert into the database:

```sql
-- First, create a user account through normal signup
-- Then, run this SQL to make them a super admin:

INSERT INTO admin_users (user_id, email, role, active)
VALUES (
  'USER_ID_FROM_AUTH_USERS', 
  'superadmin@yourdomain.com', 
  'super_admin', 
  true
);
```

---

## 🚀 Getting Started Checklist

### For New Organizations:
- [ ] Apply at `/admin/register`
- [ ] Wait for approval email
- [ ] Login at `/admin/login` 
- [ ] Create your first project
- [ ] Submit for review

### For Super Admins:
- [ ] Set up super admin account (database)
- [ ] Login at `/admin/login`
- [ ] Review pending organization applications
- [ ] Approve organizations
- [ ] Review and approve first projects

---

## 📞 Support & Troubleshooting

### Common Issues:

**"Invalid email or password"**
- Verify your credentials
- Make sure your organization is approved
- Contact support if you're a new organization

**"You do not have admin access"**
- Your account may not be set up as an admin user
- Contact super admin or support

**Can't create projects**
- Make sure you have "org_admin" role or higher
- Check that your organization is active and verified

### Getting Help:
- Contact support through the main website
- Email technical support for database issues
- Check the "How it Works" page for general guidance

---

## 🔒 Security Notes

- Always logout when using shared computers
- Use strong passwords for admin accounts
- Report any suspicious activity immediately
- Super admin credentials should be highly protected
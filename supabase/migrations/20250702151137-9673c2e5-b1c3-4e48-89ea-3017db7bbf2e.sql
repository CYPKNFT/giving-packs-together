-- Clear existing projects and items to start fresh
DELETE FROM project_items;
DELETE FROM projects;

-- Education Projects
INSERT INTO projects (
  id, title, description, category_id, organization_id, 
  image_url, about_text, location, beneficiaries, timeline,
  urgency, estimated_cost, items_needed, items_fulfilled,
  website_url, status
) VALUES
(
  '550e8400-e29b-41d4-a716-446655440030',
  'Digital Learning Lab for Underserved Students',
  'Creating a state-of-the-art computer lab to bridge the digital divide and provide technology access to students in low-income communities.',
  '550e8400-e29b-41d4-a716-446655440004', -- Education
  '550e8400-e29b-41d4-a716-446655440012', -- Education for All
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
  'Our Digital Learning Lab initiative aims to establish fully equipped computer labs in schools serving underserved communities. These labs will provide students with access to modern technology, coding programs, and digital literacy training essential for success in today''s world.',
  'Lincoln Elementary School, Downtown District',
  '450 students aged 6-12',
  '6 months setup, ongoing program',
  'high',
  25000,
  35,
  8,
  'https://educationforall.org/digital-lab',
  'active'
),
(
  '550e8400-e29b-41d4-a716-446655440031',
  'STEM Workshop Mobile Unit',
  'A mobile science lab bringing hands-on STEM education directly to schools lacking adequate science facilities.',
  '550e8400-e29b-41d4-a716-446655440004', -- Education
  '550e8400-e29b-41d4-a716-446655440012', -- Education for All
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
  'Our mobile STEM unit travels to schools across rural and urban areas, delivering interactive science experiments, robotics workshops, and engineering challenges. This program ensures all students have access to quality STEM education regardless of their school''s resources.',
  'Multi-district mobile program',
  '1,200 students across 15 schools',
  '12 months ongoing',
  'medium',
  18000,
  42,
  15,
  'https://educationforall.org/stem-mobile',
  'active'
),

-- Healthcare Projects
(
  '550e8400-e29b-41d4-a716-446655440032',
  'Community Health Clinic Equipment Drive',
  'Equipping our neighborhood health clinic with essential medical equipment to serve uninsured and underinsured families.',
  '550e8400-e29b-41d4-a716-446655440003', -- Healthcare
  '550e8400-e29b-41d4-a716-446655440013', -- Community Health First
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
  'The Community Health Clinic serves over 2,000 low-income families annually. We need modern medical equipment to expand our services and provide better care. Every donation directly impacts our ability to serve those most in need.',
  'Riverside Community Health Center',
  '2,000+ families annually',
  '4 months procurement and setup',
  'critical',
  45000,
  28,
  12,
  'https://communityhealthfirst.org',
  'active'
),
(
  '550e8400-e29b-41d4-a716-446655440033',
  'Mental Health Support Program',
  'Establishing counseling resources and mental health support services for teenagers and young adults in our community.',
  '550e8400-e29b-41d4-a716-446655440003', -- Healthcare
  '550e8400-e29b-41d4-a716-446655440013', -- Community Health First
  'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800',
  'Mental health support is crucial for young people facing challenges. Our program provides counseling services, group therapy sessions, and wellness workshops specifically designed for teens and young adults aged 13-25.',
  'Youth Center and Mobile Outreach',
  '300+ young people',
  '9 months program development',
  'high',
  22000,
  25,
  7,
  'https://communityhealthfirst.org/mental-health',
  'active'
),

-- Housing Assistance Projects
(
  '550e8400-e29b-41d4-a716-446655440034',
  'Emergency Housing Starter Kits',
  'Providing complete household essentials for families transitioning from homelessness to permanent housing.',
  '550e8400-e29b-41d4-a716-446655440001', -- Housing Assistance
  '550e8400-e29b-41d4-a716-446655440014', -- Housing Solutions Alliance
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  'When families move from emergency shelters to permanent housing, they often lack basic household items. Our starter kits include furniture, kitchenware, bedding, and cleaning supplies to help families establish stable homes.',
  'Metro Housing Authority District',
  '150 families per year',
  'Ongoing program',
  'high',
  35000,
  75,
  23,
  'https://housingsolutions.org/starter-kits',
  'active'
),
(
  '550e8400-e29b-41d4-a716-446655440035',
  'Weatherization for Low-Income Families',
  'Improving home insulation and weatherproofing to reduce energy costs for struggling families.',
  '550e8400-e29b-41d4-a716-446655440001', -- Housing Assistance
  '550e8400-e29b-41d4-a716-446655440014', -- Housing Solutions Alliance
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800',
  'High energy bills burden low-income families. Our weatherization program provides insulation, weather stripping, energy-efficient windows, and heating system improvements to reduce utility costs by up to 30%.',
  'Citywide program for qualifying homes',
  '200 households',
  '8 months installation period',
  'medium',
  40000,
  60,
  18,
  'https://housingsolutions.org/weatherization',
  'active'
),

-- Food Security Projects
(
  '550e8400-e29b-41d4-a716-446655440036',
  'Community Garden Network',
  'Establishing neighborhood gardens to provide fresh produce and teach sustainable growing practices.',
  '550e8400-e29b-41d4-a716-446655440002', -- Food Security
  '550e8400-e29b-41d4-a716-446655440011', -- Local Food Bank Alliance
  'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
  'Our community gardens not only provide fresh, healthy produce to food-insecure families but also create gathering spaces that strengthen neighborhoods. Participants learn gardening skills, nutrition education, and food preservation techniques.',
  '5 neighborhood locations',
  '300 families in food desert areas',
  '12 months development',
  'medium',
  15000,
  85,
  34,
  'https://localfoodbank.org/gardens',
  'active'
),
(
  '550e8400-e29b-41d4-a716-446655440037',
  'Mobile Food Pantry Program',
  'Bringing nutritious food directly to underserved areas through our mobile distribution network.',
  '550e8400-e29b-41d4-a716-446655440002', -- Food Security
  '550e8400-e29b-41d4-a716-446655440011', -- Local Food Bank Alliance
  'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800',
  'Our mobile food pantry reaches families who cannot access traditional food banks due to transportation barriers, work schedules, or disabilities. We serve fresh produce, dairy, proteins, and shelf-stable items at convenient community locations.',
  'Mobile service to 8 communities',
  '800 families monthly',
  'Ongoing weekly service',
  'high',
  28000,
  45,
  19,
  'https://localfoodbank.org/mobile',
  'active'
);
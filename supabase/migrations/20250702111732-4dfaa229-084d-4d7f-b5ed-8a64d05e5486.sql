-- Insert organizations for our new projects
INSERT INTO public.organizations (id, name, description, verified, website_url, logo_url) VALUES
('org-shelter-hope', 'Shelter Hope Foundation', 'Dedicated to providing emergency housing and support services for homeless individuals and families.', true, 'https://shelterhope.org', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100'),
('org-education-all', 'Education for All', 'Ensuring every child has access to quality education and learning materials.', true, 'https://educationforall.org', 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=100'),
('org-health-first', 'Community Health First', 'Providing essential healthcare services and medical supplies to underserved communities.', true, 'https://healthfirst.org', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100'),
('org-food-network', 'Community Food Network', 'Fighting hunger through food distribution and nutrition programs.', true, 'https://communityfoodnetwork.org', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100'),
('org-housing-help', 'Housing Solutions Alliance', 'Creating affordable housing solutions and preventing homelessness.', true, 'https://housingsolutions.org', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100'),
('org-family-support', 'Family Support Services', 'Comprehensive support for families in crisis and transition.', true, 'https://familysupport.org', 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=100');

-- Insert projects for each category
INSERT INTO public.projects (id, title, description, organization_id, category_id, status, image_url, items_needed, items_fulfilled, about_text, location, beneficiaries, timeline, urgency, estimated_cost, website_url) VALUES

-- Housing Assistance Projects
('proj-emergency-housing', 'Emergency Housing Supplies', 'Critical supplies for families transitioning from homelessness to temporary housing.', 'org-shelter-hope', '550e8400-e29b-41d4-a716-446655440001', 'active', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', 100, 42, 'This project provides essential household items for families moving into emergency housing. Items include bedding, kitchen basics, hygiene products, and cleaning supplies to help families establish a safe and dignified living environment.', 'Downtown Shelter District', '25 families per month', '6 months', 'high', 5000.00, 'https://shelterhope.org/emergency-housing'),

('proj-transitional-housing', 'Transitional Housing Kits', 'Complete household starter kits for families moving to permanent housing.', 'org-housing-help', '550e8400-e29b-41d4-a716-446655440001', 'active', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', 80, 15, 'Supporting families as they transition from temporary to permanent housing with comprehensive household starter kits.', 'Westside Community', '15 families', '4 months', 'medium', 8000.00, 'https://housingsolutions.org/transitional'),

('proj-winter-warmth', 'Winter Warmth Initiative', 'Warm clothing and heating assistance for homeless individuals during winter months.', 'org-shelter-hope', '550e8400-e29b-41d4-a716-446655440001', 'active', 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400', 200, 85, 'Providing essential winter gear including coats, blankets, sleeping bags, and portable heaters for our homeless community members.', 'Multiple shelter locations', '150 individuals', '3 months (winter season)', 'critical', 12000.00, 'https://shelterhope.org/winter'),

-- Food Security Projects  
('proj-community-pantry', 'Community Food Pantry', 'Stocking our pantry with essential food items for families in need.', 'org-food-network', '550e8400-e29b-41d4-a716-446655440002', 'active', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 500, 320, 'Our community food pantry serves over 200 families monthly. We need non-perishable food items, fresh produce, and baby formula.', 'Central Community Center', '200 families monthly', 'Ongoing', 'high', 15000.00, 'https://communityfoodnetwork.org/pantry'),

('proj-school-meals', 'School Meal Support Program', 'Providing nutritious meals for children during school breaks.', 'org-food-network', '550e8400-e29b-41d4-a716-446655440002', 'active', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', 300, 180, 'When school is out, many children lose access to regular meals. This program provides nutritious food packages for families.', 'Local school districts', '450 children', 'Summer break (3 months)', 'medium', 8500.00, 'https://communityfoodnetwork.org/school-meals'),

-- Healthcare Projects
('proj-medical-supplies', 'Essential Medical Supplies', 'Critical medical supplies for community health clinic.', 'org-health-first', '550e8400-e29b-41d4-a716-446655440003', 'active', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 150, 60, 'Our community clinic serves uninsured and underinsured patients. We need basic medical supplies, medications, and equipment.', 'Eastside Health Clinic', '300 patients monthly', '6 months', 'high', 10000.00, 'https://healthfirst.org/supplies'),

('proj-mental-health', 'Mental Health Support Resources', 'Counseling and therapy resources for community members in need.', 'org-health-first', '550e8400-e29b-41d4-a716-446655440003', 'active', 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400', 75, 25, 'Providing accessible mental health services including therapy sessions, support groups, and crisis intervention.', 'Multiple community centers', '100 individuals', '12 months', 'medium', 20000.00, 'https://healthfirst.org/mental-health'),

-- Education Projects
('proj-school-supplies', 'Back to School Supplies', 'Essential school supplies for underprivileged students.', 'org-education-all', '550e8400-e29b-41d4-a716-446655440004', 'active', 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400', 400, 280, 'Providing backpacks, notebooks, pencils, calculators, and other essential supplies for students starting the new school year.', 'Local elementary and high schools', '350 students', '2 months (back to school)', 'medium', 6000.00, 'https://educationforall.org/supplies'),

('proj-digital-literacy', 'Digital Literacy Program', 'Computers and tablets for students learning from home.', 'org-education-all', '550e8400-e29b-41d4-a716-446655440004', 'active', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', 120, 35, 'Bridging the digital divide by providing refurbished computers and tablets to students for remote learning and homework.', 'Multiple school districts', '120 students', '6 months', 'high', 25000.00, 'https://educationforall.org/digital');

-- Insert project items for Emergency Housing Supplies project
INSERT INTO public.project_items (id, project_id, name, description, quantity_needed, quantity_fulfilled, estimated_cost, priority, category, image_url) VALUES

-- Emergency Housing Supplies items
('item-bedding-sets', 'proj-emergency-housing', 'Complete Bedding Sets', 'Sheets, pillows, blankets, and pillowcases for emergency housing', 25, 15, 45.00, 'high', 'Bedding', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400'),
('item-kitchen-basics', 'proj-emergency-housing', 'Kitchen Starter Kits', 'Basic cooking utensils, plates, cups, and cutlery', 25, 12, 35.00, 'high', 'Kitchen', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'),
('item-hygiene-kits', 'proj-emergency-housing', 'Personal Hygiene Kits', 'Toothbrush, toothpaste, soap, shampoo, and toiletries', 30, 10, 15.00, 'medium', 'Hygiene', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400'),
('item-cleaning-supplies', 'proj-emergency-housing', 'Cleaning Supply Packages', 'All-purpose cleaner, paper towels, trash bags, and disinfectant', 20, 5, 25.00, 'medium', 'Cleaning', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'),

-- Community Food Pantry items
('item-canned-goods', 'proj-community-pantry', 'Canned Food Items', 'Vegetables, fruits, soups, and protein sources', 200, 150, 8.00, 'high', 'Non-perishable', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'),
('item-fresh-produce', 'proj-community-pantry', 'Fresh Produce Boxes', 'Seasonal fruits and vegetables for families', 150, 80, 12.00, 'urgent', 'Fresh Food', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400'),
('item-baby-formula', 'proj-community-pantry', 'Baby Formula & Supplies', 'Infant formula, baby food, and diapers', 75, 40, 25.00, 'urgent', 'Baby Care', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('item-pantry-staples', 'proj-community-pantry', 'Pantry Staples', 'Rice, pasta, cereal, and cooking oils', 75, 50, 10.00, 'medium', 'Staples', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'),

-- School Supplies items
('item-backpacks', 'proj-school-supplies', 'Student Backpacks', 'Durable backpacks for carrying school materials', 100, 70, 20.00, 'high', 'Bags', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'),
('item-notebooks', 'proj-school-supplies', 'Notebooks & Paper', 'Spiral notebooks, loose-leaf paper, and composition books', 150, 120, 5.00, 'medium', 'Writing', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'),
('item-writing-tools', 'proj-school-supplies', 'Pens & Pencils', 'Writing utensils, erasers, and pencil sharpeners', 100, 60, 8.00, 'medium', 'Writing', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400'),
('item-calculators', 'proj-school-supplies', 'Scientific Calculators', 'Calculators for math and science classes', 50, 30, 15.00, 'high', 'Electronics', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400'),

-- Medical Supplies items
('item-first-aid', 'proj-medical-supplies', 'First Aid Kits', 'Complete first aid kits with bandages and antiseptics', 30, 15, 35.00, 'high', 'Emergency', 'https://images.unsplash.com/photo-1603398938431-0c8a83471a43?w=400'),
('item-medications', 'proj-medical-supplies', 'Basic Medications', 'Over-the-counter pain relievers and common medications', 50, 20, 20.00, 'urgent', 'Pharmacy', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'),
('item-medical-equipment', 'proj-medical-supplies', 'Basic Medical Equipment', 'Thermometers, blood pressure cuffs, and stethoscopes', 35, 12, 75.00, 'high', 'Equipment', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400'),
('item-hygiene-medical', 'proj-medical-supplies', 'Medical Hygiene Supplies', 'Hand sanitizer, masks, gloves, and disinfectants', 35, 13, 15.00, 'medium', 'Hygiene', 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400');
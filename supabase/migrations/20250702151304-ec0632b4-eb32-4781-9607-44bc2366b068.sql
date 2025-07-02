-- Healthcare Project Items
INSERT INTO project_items (
  id, project_id, name, description, category, image_url,
  quantity_needed, quantity_fulfilled, priority, estimated_cost
) VALUES
-- Community Health Clinic Equipment
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440032', 'Digital X-Ray Machine', 'Modern digital radiography system for accurate diagnostics', 'Medical Equipment', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 1, 0, 'urgent', 15000),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440032', 'Patient Examination Tables', 'Adjustable examination tables for patient comfort', 'Medical Equipment', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400', 6, 2, 'high', 800),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440032', 'Blood Pressure Monitors', 'Automatic digital blood pressure cuffs', 'Medical Equipment', 'https://images.unsplash.com/photo-1604891654717-2cf44f4dcf38?w=400', 10, 4, 'high', 120),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440032', 'Medical Supplies Kit', 'Basic medical supplies including bandages, syringes, thermometers', 'Medical Supplies', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 50, 20, 'medium', 45),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440032', 'EKG Machine', 'Electrocardiogram machine for heart monitoring', 'Medical Equipment', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', 1, 0, 'high', 3500),

-- Mental Health Support Program
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440033', 'Counseling Office Furniture', 'Comfortable seating and furniture for therapy sessions', 'Furniture', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400', 15, 5, 'high', 300),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440033', 'Mental Health Workbooks', 'Therapeutic resources and self-help materials', 'Educational Materials', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', 100, 25, 'medium', 20),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440033', 'Art Therapy Supplies', 'Creative materials for expressive therapy sessions', 'Art Supplies', 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400', 75, 30, 'medium', 15),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440033', 'Group Session Equipment', 'Projectors, whiteboards, and presentation materials', 'Technology', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400', 5, 2, 'high', 250),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440033', 'Mindfulness Resources', 'Meditation cushions, calming music, relaxation tools', 'Wellness Supplies', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', 25, 8, 'medium', 40);
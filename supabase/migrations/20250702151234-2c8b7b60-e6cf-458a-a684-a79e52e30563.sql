-- Project Items for Digital Learning Lab
INSERT INTO project_items (
  id, project_id, name, description, category, image_url,
  quantity_needed, quantity_fulfilled, priority, estimated_cost
) VALUES
-- Digital Learning Lab items
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440030', 'Desktop Computers', 'Modern desktop computers with educational software pre-installed', 'Technology', 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400', 20, 5, 'urgent', 800),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440030', 'Interactive Whiteboards', 'Smart boards for interactive lessons and presentations', 'Technology', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400', 3, 1, 'high', 1200),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440030', 'Student Tablets', 'Tablets for individual learning and coding exercises', 'Technology', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', 30, 8, 'high', 300),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440030', 'Coding Books & Resources', 'Programming textbooks and learning materials', 'Educational Materials', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', 50, 15, 'medium', 25),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440030', 'Network Equipment', 'Routers, switches, and cables for lab connectivity', 'Technology', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', 10, 3, 'urgent', 150),

-- STEM Mobile Unit items
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440031', 'Mobile Lab Vehicle', 'Equipped van for traveling to schools', 'Transportation', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400', 1, 0, 'urgent', 35000),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440031', 'Microscope Sets', 'Portable microscopes for biology experiments', 'Science Equipment', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400', 15, 6, 'high', 200),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440031', 'Robotics Kits', 'Educational robotics kits for hands-on learning', 'Technology', 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400', 25, 8, 'high', 120),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440031', 'Chemistry Lab Supplies', 'Safe chemicals and equipment for experiments', 'Science Equipment', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', 100, 35, 'medium', 15),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440031', 'STEM Activity Workbooks', 'Curriculum guides and student worksheets', 'Educational Materials', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400', 200, 75, 'medium', 8);
-- Housing Assistance Project Items
INSERT INTO project_items (
  id, project_id, name, description, category, image_url,
  quantity_needed, quantity_fulfilled, priority, estimated_cost
) VALUES
-- Emergency Housing Starter Kits
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440034', 'Bedroom Furniture Sets', 'Complete bedroom sets including bed, mattress, dresser', 'Furniture', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400', 30, 8, 'urgent', 400),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440034', 'Kitchen Starter Kits', 'Pots, pans, utensils, dishes, and basic appliances', 'Kitchen Supplies', 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400', 50, 15, 'high', 75),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440034', 'Bedding & Linens', 'Sheets, pillows, blankets, and towels', 'Textiles', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400', 75, 25, 'high', 45),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440034', 'Cleaning Supplies', 'Vacuum cleaners, mops, cleaning products', 'Household Items', 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400', 40, 12, 'medium', 35),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440034', 'Living Room Furniture', 'Sofas, coffee tables, lamps, and seating', 'Furniture', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 25, 8, 'medium', 250),

-- Weatherization Program
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440035', 'Insulation Materials', 'High-quality insulation for walls and attics', 'Building Materials', 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400', 100, 30, 'high', 150),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440035', 'Energy-Efficient Windows', 'Double-pane windows to reduce heat loss', 'Building Materials', 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400', 40, 12, 'high', 300),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440035', 'Weather Stripping', 'Door and window sealing materials', 'Building Materials', 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400', 200, 60, 'medium', 8),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440035', 'Programmable Thermostats', 'Smart thermostats for energy efficiency', 'Technology', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', 50, 15, 'medium', 85),
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440035', 'Heating System Repairs', 'HVAC maintenance and repair services', 'Services', 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400', 30, 8, 'urgent', 200);
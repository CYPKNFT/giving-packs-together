-- Add project items totals for housing assistance projects to test display
UPDATE projects 
SET items_needed = 220, items_fulfilled = 68, updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440034';

UPDATE projects 
SET items_needed = 420, items_fulfilled = 125, updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440035';
import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://spasnvnxvvkrfigxurhy.supabase.co';

export const handlers = [
  // Projects endpoints
  http.get(`${BASE_URL}/rest/v1/projects`, () => {
    return HttpResponse.json([
      {
        id: 'test-project-1',
        title: 'Emergency Housing Supplies',
        description: 'Essential items for families transitioning into emergency housing',
        organization_id: 'test-org-1',
        category_id: 'test-category-1',
        status: 'active',
        items_needed: 300,
        items_fulfilled: 125,
        image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        about_text: 'Our Emergency Housing Supplies program...',
        location: 'Downtown Community Center',
        beneficiaries: '45 families in transitional housing',
        urgency: 'high',
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        organization: {
          id: 'test-org-1',
          name: 'Hope Community Center',
          description: 'Dedicated to providing support...',
          website_url: 'https://hopecommunity.org',
          verified: true,
        },
        category: {
          id: 'test-category-1',
          name: 'Housing Assistance',
          description: 'Support for temporary and permanent housing solutions',
          image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        },
        items: [
          {
            id: 'test-item-1',
            project_id: 'test-project-1',
            name: 'Bedding Set',
            description: 'Complete bedding sets including sheets, pillows, and blankets',
            category: 'Housing',
            quantity_needed: 25,
            quantity_fulfilled: 15,
            priority: 'high',
            estimated_cost: 45.00,
            image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          },
        ],
      },
    ]);
  }),

  // Single project endpoint
  http.get(`${BASE_URL}/rest/v1/projects*`, ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id === 'eq.test-project-1') {
      return HttpResponse.json([
        {
          id: 'test-project-1',
          title: 'Emergency Housing Supplies',
          description: 'Essential items for families transitioning into emergency housing',
          organization_id: 'test-org-1',
          category_id: 'test-category-1',
          status: 'active',
          items_needed: 300,
          items_fulfilled: 125,
          image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
          about_text: 'Our Emergency Housing Supplies program...',
          location: 'Downtown Community Center',
          beneficiaries: '45 families in transitional housing',
          urgency: 'high',
          organization: {
            id: 'test-org-1',
            name: 'Hope Community Center',
            description: 'Dedicated to providing support...',
            website_url: 'https://hopecommunity.org',
            verified: true,
          },
          category: {
            id: 'test-category-1',
            name: 'Housing Assistance',
            description: 'Support for temporary and permanent housing solutions',
            image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
          },
          items: [
            {
              id: 'test-item-1',
              project_id: 'test-project-1',
              name: 'Bedding Set',
              description: 'Complete bedding sets including sheets, pillows, and blankets',
              category: 'Housing',
              quantity_needed: 25,
              quantity_fulfilled: 15,
              priority: 'high',
              estimated_cost: 45.00,
              image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
            },
          ],
        },
      ]);
    }
    
    return HttpResponse.json([]);
  }),

  // Categories endpoint
  http.get(`${BASE_URL}/rest/v1/categories`, () => {
    return HttpResponse.json([
      {
        id: 'test-category-1',
        name: 'Housing Assistance',
        description: 'Support for temporary and permanent housing solutions',
        image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        created_at: '2023-01-01T00:00:00Z',
      },
      {
        id: 'test-category-2',
        name: 'Food Security',
        description: 'Nutrition assistance and food programs',
        image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        created_at: '2023-01-01T00:00:00Z',
      },
    ]);
  }),

  // Donations endpoint
  http.post(`${BASE_URL}/rest/v1/donations`, () => {
    return HttpResponse.json(
      {
        id: 'test-donation-1',
        user_id: 'test-user-1',
        project_id: 'test-project-1',
        item_id: 'test-item-1',
        quantity: 1,
        status: 'pending',
        created_at: '2023-01-01T00:00:00Z',
      },
      { status: 201 }
    );
  }),

  // RPC function calls
  http.post(`${BASE_URL}/rest/v1/rpc/increment_item_fulfilled`, () => {
    return HttpResponse.json(null);
  }),

  // Auth endpoints
  http.get(`${BASE_URL}/auth/v1/user`, () => {
    return HttpResponse.json({
      data: {
        user: {
          id: 'test-user-1',
          email: 'test@example.com',
          user_metadata: {
            first_name: 'Test',
            last_name: 'User',
          },
        },
      },
    });
  }),

  http.get(`${BASE_URL}/auth/v1/session`, () => {
    return HttpResponse.json({
      data: {
        session: {
          user: {
            id: 'test-user-1',
            email: 'test@example.com',
            user_metadata: {
              first_name: 'Test',
              last_name: 'User',
            },
          },
          access_token: 'test-token',
        },
      },
    });
  }),
];
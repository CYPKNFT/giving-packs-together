import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ReactElement, ReactNode } from 'react';

// Create a test-specific query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

interface AllTheProvidersProps {
  children: ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const queryClient = createTestQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Test data factories
export const createMockProject = (overrides = {}) => ({
  id: 'test-project-1',
  title: 'Test Project',
  description: 'Test project description',
  organization: 'Test Organization',
  categoryId: 'test-category-1',
  itemsFulfilled: 5,
  itemsNeeded: 10,
  imageUrl: 'https://example.com/test.jpg',
  aboutText: 'About this test project',
  status: 'active' as const,
  urgency: 'medium' as const,
  items: [],
  ...overrides,
});

export const createMockCategory = (overrides = {}) => ({
  id: 'test-category-1',
  title: 'Test Category',
  description: 'Test category description',
  imageUrl: 'https://example.com/category.jpg',
  projectCount: 5,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: 'test-user-1',
  email: 'test@example.com',
  user_metadata: {
    first_name: 'Test',
    last_name: 'User',
  },
  ...overrides,
});
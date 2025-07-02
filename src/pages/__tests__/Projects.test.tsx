import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test-utils/render';
import { useProjects } from '@/hooks/queries/useProjects';
import { useCategories } from '@/hooks/queries/useCategories';
import Projects from '@/pages/Projects';

// Mock the query hooks
vi.mock('@/hooks/queries/useProjects');
vi.mock('@/hooks/queries/useCategories');

describe('Projects Page', () => {
  const mockProjects = [
    {
      id: 'project-1',
      title: 'Emergency Housing Supplies',
      description: 'Essential items for families',
      organization: 'Hope Community Center',
      categoryId: 'category-1',
      itemsFulfilled: 125,
      itemsNeeded: 300,
      imageUrl: 'https://example.com/project1.jpg',
    },
    {
      id: 'project-2',
      title: 'Food Security Program',
      description: 'Nutrition assistance program',
      organization: 'Local Food Bank',
      categoryId: 'category-2',
      itemsFulfilled: 80,
      itemsNeeded: 150,
      imageUrl: 'https://example.com/project2.jpg',
    },
  ];

  const mockCategories = [
    {
      id: 'category-1',
      title: 'Housing Assistance',
      description: 'Support for housing solutions',
      imageUrl: 'https://example.com/housing.jpg',
      projectCount: 5,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
    {
      id: 'category-2',
      title: 'Food Security',
      description: 'Nutrition assistance programs',
      imageUrl: 'https://example.com/food.jpg',
      projectCount: 3,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    vi.mocked(useProjects).mockReturnValue({
      data: mockProjects,
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    vi.mocked(useCategories).mockReturnValue({
      data: mockCategories,
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);
  });

  it('renders page header and navigation correctly', () => {
    render(<Projects />);

    expect(screen.getByText('Browse Projects')).toBeInTheDocument();
    expect(screen.getByText('Discover charitable projects that need your support.')).toBeInTheDocument();
  });

  it('displays all categories with "All Categories" option', () => {
    render(<Projects />);

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('Housing Assistance')).toBeInTheDocument();
    expect(screen.getByText('Food Security')).toBeInTheDocument();
  });

  it('displays all projects initially', async () => {
    render(<Projects />);

    await waitFor(() => {
      expect(screen.getByText('Emergency Housing Supplies')).toBeInTheDocument();
      expect(screen.getByText('Food Security Program')).toBeInTheDocument();
    });
  });

  it('filters projects by search term', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText('Search projects...');
    await user.type(searchInput, 'housing');

    await waitFor(() => {
      expect(screen.getByText('Emergency Housing Supplies')).toBeInTheDocument();
      expect(screen.queryByText('Food Security Program')).not.toBeInTheDocument();
    });
  });

  it('handles category filtering', async () => {
    const user = userEvent.setup();
    
    // Mock filtered projects for specific category
    vi.mocked(useProjects).mockReturnValue({
      data: [mockProjects[0]], // Only housing project
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    render(<Projects />);

    const housingButton = screen.getByText('Housing Assistance');
    await user.click(housingButton);

    await waitFor(() => {
      expect(screen.getByText('Emergency Housing Supplies')).toBeInTheDocument();
    });
  });

  it('shows loading state', () => {
    vi.mocked(useProjects).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    render(<Projects />);

    expect(screen.getByText('Loading projects...')).toBeInTheDocument();
  });

  it('shows empty state when no projects match filters', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText('Search projects...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No projects found matching your criteria')).toBeInTheDocument();
      expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    });
  });

  it('clears filters when Clear Filters button is clicked', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // First set a filter
    const searchInput = screen.getByPlaceholderText('Search projects...');
    await user.type(searchInput, 'nonexistent');

    await waitFor(() => {
      expect(screen.getByText('No projects found matching your criteria')).toBeInTheDocument();
    });

    // Then clear filters
    const clearButton = screen.getByText('Clear Filters');
    await user.click(clearButton);

    expect(searchInput).toHaveValue('');
  });

  it('handles query errors gracefully', () => {
    vi.mocked(useProjects).mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Failed to fetch'),
      isError: true,
      refetch: vi.fn(),
    } as any);

    render(<Projects />);

    // Component should still render but with empty state
    expect(screen.getByText('Browse Projects')).toBeInTheDocument();
  });
});
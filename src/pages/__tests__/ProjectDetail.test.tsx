import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '@/test-utils/render';
import { useProject } from '@/hooks/queries/useProject';
import { useDonation } from '@/hooks/mutations/useDonation';
import ProjectDetail from '@/pages/ProjectDetail';

// Mock the hooks
vi.mock('@/hooks/queries/useProject');
vi.mock('@/hooks/mutations/useDonation');
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user', email: 'test@example.com' },
  }),
}));

describe('ProjectDetail Page', () => {
  const mockProject = {
    id: 'test-project-1',
    title: 'Emergency Housing Supplies',
    description: 'Essential items for families transitioning into emergency housing',
    organization: 'Hope Community Center',
    categoryId: 'category-1',
    itemsFulfilled: 125,
    itemsNeeded: 300,
    imageUrl: 'https://example.com/project.jpg',
    aboutText: 'Our Emergency Housing Supplies program provides essential items...',
    location: 'Downtown Community Center',
    beneficiaries: '45 families in transitional housing',
    urgency: 'high' as const,
    status: 'active' as const,
    items: [
      {
        id: 'item-1',
        name: 'Bedding Set',
        description: 'Complete bedding sets including sheets, pillows, and blankets',
        category: 'Housing',
        quantityNeeded: 25,
        quantityFulfilled: 15,
        priority: 'high' as const,
        estimatedCost: 45.00,
        imageUrl: 'https://example.com/bedding.jpg',
        project_id: 'test-project-1',
      },
    ],
  };

  const mockDonationMutate = vi.fn();

  beforeEach(() => {
    vi.mocked(useProject).mockReturnValue({
      data: mockProject,
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    const mockMutation = {
      mutate: mockDonationMutate,
      isPending: false,
      isPaused: false,
      error: null,
      data: null,
      reset: vi.fn(),
      isError: false,
      isIdle: true,
      isSuccess: false,
      failureCount: 0,
      failureReason: null,
      status: 'idle' as const,
      variables: undefined,
      context: undefined,
      submittedAt: 0,
    };

    (useDonation as any).mockReturnValue(mockMutation);
  });

  it('renders project details correctly', async () => {
    render(<ProjectDetail />);

    await waitFor(() => {
      expect(screen.getByText('Emergency Housing Supplies')).toBeInTheDocument();
      expect(screen.getByText('Hope Community Center')).toBeInTheDocument();
      expect(screen.getByText('Our Emergency Housing Supplies program provides essential items...')).toBeInTheDocument();
      expect(screen.getByText('Downtown Community Center')).toBeInTheDocument();
      expect(screen.getByText('45 families in transitional housing')).toBeInTheDocument();
    });
  });

  it('renders project statistics', async () => {
    render(<ProjectDetail />);

    await waitFor(() => {
      // Check for the program overview stats
      expect(screen.getByText('Program Overview')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument(); // Families served
      expect(screen.getByText('125/300')).toBeInTheDocument(); // Items collected
    });
  });

  it('renders project items section', async () => {
    render(<ProjectDetail />);

    await waitFor(() => {
      expect(screen.getByText('Items Needed')).toBeInTheDocument();
      expect(screen.getByText('Bedding Set')).toBeInTheDocument();
      expect(screen.getByText('Complete bedding sets including sheets, pillows, and blankets')).toBeInTheDocument();
    });
  });

  it('handles donation flow for authenticated user', async () => {
    const user = userEvent.setup();
    render(<ProjectDetail />);

    await waitFor(() => {
      expect(screen.getByText('Bedding Set')).toBeInTheDocument();
    });

    const donateButton = screen.getByText('Donate');
    await user.click(donateButton);

    expect(mockDonationMutate).toHaveBeenCalledWith({
      project_id: 'test-project-1',
      item_id: 'item-1',
      quantity: 1,
      notes: 'Donation of 1 item(s)',
    });
  });

  it('shows loading state', () => {
    vi.mocked(useProject).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    render(<ProjectDetail />);

    expect(screen.getByText('Loading project details...')).toBeInTheDocument();
  });

  it('shows not found state for missing project', () => {
    vi.mocked(useProject).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isError: false,
      refetch: vi.fn(),
    } as any);

    render(<ProjectDetail />);

    expect(screen.getByText('Project not found')).toBeInTheDocument();
    expect(screen.getByText('The project you\'re looking for doesn\'t exist or has been moved.')).toBeInTheDocument();
    expect(screen.getByText('Back to Projects')).toBeInTheDocument();
  });

  it('handles query errors', () => {
    vi.mocked(useProject).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch project'),
      isError: true,
      refetch: vi.fn(),
    } as any);

    render(<ProjectDetail />);

    // Should show error state or not found state
    expect(screen.getByText('Project not found')).toBeInTheDocument();
  });

  it('renders donation impact calculator and testimonials', async () => {
    render(<ProjectDetail />);

    await waitFor(() => {
      // These components should be rendered in the sidebar
      expect(screen.getByTestId('donation-calculator')).toBeInTheDocument();
      expect(screen.getByTestId('testimonial-carousel')).toBeInTheDocument();
    });
  });
});
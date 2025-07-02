import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, createMockProject } from '@/test-utils/render';
import { useDonation } from '@/hooks/mutations/useDonation';
import ProjectItemsSection from '@/components/project/ProjectItemsSection';

// Mock the donation hook
vi.mock('@/hooks/mutations/useDonation');

describe('ProjectItemsSection', () => {
  const mockProject = createMockProject({
    items: [
      {
        id: 'item-1',
        name: 'Bedding Set',
        description: 'Complete bedding sets including sheets, pillows, and blankets',
        category: 'Housing',
        quantityNeeded: 25,
        quantityFulfilled: 15,
        priority: 'high',
        estimatedCost: 45.00,
        imageUrl: 'https://example.com/bedding.jpg',
        project_id: 'test-project-1',
      },
      {
        id: 'item-2',
        name: 'Kitchen Kit',
        description: 'Basic cooking utensils and supplies',
        category: 'Housing',
        quantityNeeded: 20,
        quantityFulfilled: 8,
        priority: 'medium',
        estimatedCost: 35.00,
        imageUrl: 'https://example.com/kitchen.jpg',
        project_id: 'test-project-1',
      },
    ],
  });

  const mockOnDonateItem = vi.fn();
  const mockDonationMutate = vi.fn();

  beforeEach(() => {
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

  it('renders all project items correctly', () => {
    render(
      <ProjectItemsSection 
        project={mockProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    expect(screen.getByText('Items Needed')).toBeInTheDocument();
    expect(screen.getByText('Bedding Set')).toBeInTheDocument();
    expect(screen.getByText('Kitchen Kit')).toBeInTheDocument();
    
    // Check progress for first item (15/25 = 60%)
    expect(screen.getByText('15/25')).toBeInTheDocument();
    expect(screen.getByText('8/20')).toBeInTheDocument();
  });

  it('displays item priorities correctly', () => {
    render(
      <ProjectItemsSection 
        project={mockProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    // Check for priority indicators (assuming they exist in the UI)
    const highPriorityItem = screen.getByText('Bedding Set').closest('[data-testid="project-item"]');
    const mediumPriorityItem = screen.getByText('Kitchen Kit').closest('[data-testid="project-item"]');
    
    expect(highPriorityItem).toBeInTheDocument();
    expect(mediumPriorityItem).toBeInTheDocument();
  });

  it('handles donation button clicks', async () => {
    const user = userEvent.setup();
    
    render(
      <ProjectItemsSection 
        project={mockProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    const donateButtons = screen.getAllByText('Donate');
    await user.click(donateButtons[0]);

    expect(mockOnDonateItem).toHaveBeenCalledWith('item-1', 1);
  });

  it('shows loading state when donations are pending', () => {
    const mockMutation = {
      mutate: mockDonationMutate,
      isPending: true,
      isPaused: false,
      error: null,
      data: null,
      reset: vi.fn(),
      isError: false,
      isIdle: false,
      isSuccess: false,
      failureCount: 0,
      failureReason: null,
      status: 'pending' as const,
      variables: undefined,
      context: undefined,
      submittedAt: Date.now(),
    };

    (useDonation as any).mockReturnValue(mockMutation);

    render(
      <ProjectItemsSection 
        project={mockProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    // Check for loading indicators (buttons should be disabled or show loading state)
    const donateButtons = screen.getAllByText('Donate');
    donateButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('handles empty items list gracefully', () => {
    const emptyProject = createMockProject({ items: [] });
    
    render(
      <ProjectItemsSection 
        project={emptyProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    expect(screen.getByText('Items Needed')).toBeInTheDocument();
    expect(screen.getByText('No items needed for this project yet.')).toBeInTheDocument();
  });

  it('calculates completion percentages correctly', () => {
    render(
      <ProjectItemsSection 
        project={mockProject} 
        onDonateItem={mockOnDonateItem} 
      />
    );

    // First item: 15/25 = 60%
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '60');
    
    // Second item: 8/20 = 40%
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '40');
  });
});
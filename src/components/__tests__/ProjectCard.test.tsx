import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, createMockProject } from '@/test-utils/render';
import ProjectCard from '@/components/ProjectCard';

describe('ProjectCard', () => {
  const mockProject = createMockProject();

  it('renders project information correctly', () => {
    render(
      <ProjectCard
        id={mockProject.id}
        title={mockProject.title}
        description={mockProject.description}
        imageUrl={mockProject.imageUrl}
        organization={mockProject.organization}
        itemsFulfilled={mockProject.itemsFulfilled}
        itemsNeeded={mockProject.itemsNeeded}
      />
    );

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockProject.organization}`)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    
    // Check progress display
    const progressText = `${mockProject.itemsFulfilled}/${mockProject.itemsNeeded}`;
    expect(screen.getByText(progressText)).toBeInTheDocument();
  });

  it('displays progress bar with correct percentage', () => {
    render(
      <ProjectCard
        id={mockProject.id}
        title={mockProject.title}
        description={mockProject.description}
        imageUrl={mockProject.imageUrl}
        organization={mockProject.organization}
        itemsFulfilled={5}
        itemsNeeded={10}
      />
    );

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('navigates to project detail when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <ProjectCard
        id={mockProject.id}
        title={mockProject.title}
        description={mockProject.description}
        imageUrl={mockProject.imageUrl}
        organization={mockProject.organization}
        itemsFulfilled={mockProject.itemsFulfilled}
        itemsNeeded={mockProject.itemsNeeded}
      />
    );

    const viewButton = screen.getByText('View Project');
    await user.click(viewButton);

    // Since we're mocking react-router, we can't test actual navigation
    // but we can test that the link has the correct href
    expect(viewButton.closest('a')).toHaveAttribute('href', `/projects/${mockProject.id}`);
  });

  it('handles missing image gracefully', () => {
    render(
      <ProjectCard
        id={mockProject.id}
        title={mockProject.title}
        description={mockProject.description}
        imageUrl=""
        organization={mockProject.organization}
        itemsFulfilled={mockProject.itemsFulfilled}
        itemsNeeded={mockProject.itemsNeeded}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockProject.title);
  });

  it('calculates and displays completion percentage correctly', () => {
    render(
      <ProjectCard
        id={mockProject.id}
        title={mockProject.title}
        description={mockProject.description}
        imageUrl={mockProject.imageUrl}
        organization={mockProject.organization}
        itemsFulfilled={75}
        itemsNeeded={100}
      />
    );

    const percentage = screen.getByText('75%');
    expect(percentage).toBeInTheDocument();
  });
});
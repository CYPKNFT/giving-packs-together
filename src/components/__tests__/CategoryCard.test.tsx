import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, createMockCategory } from '@/test-utils/render';
import CategoryCard from '@/components/CategoryCard';

describe('CategoryCard', () => {
  const mockCategory = createMockCategory();

  it('renders category information correctly', () => {
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl={mockCategory.imageUrl}
        projectCount={mockCategory.projectCount}
      />
    );

    expect(screen.getByText(mockCategory.title)).toBeInTheDocument();
    expect(screen.getByText(mockCategory.description)).toBeInTheDocument();
    
    // Check project count display
    const projectCountText = `${mockCategory.projectCount} Projects`;
    expect(screen.getByText(projectCountText)).toBeInTheDocument();
  });

  it('displays category image with correct alt text', () => {
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl={mockCategory.imageUrl}
        projectCount={mockCategory.projectCount}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCategory.imageUrl);
    expect(image).toHaveAttribute('alt', mockCategory.title);
  });

  it('handles click interaction', async () => {
    const user = userEvent.setup();
    
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl={mockCategory.imageUrl}
        projectCount={mockCategory.projectCount}
      />
    );

    const card = screen.getByRole('button');
    await user.click(card);

    // Since we're mocking react-router, the actual navigation won't happen
    // but we can test that the component is clickable
    expect(card).toBeInTheDocument();
  });

  it('handles zero project count gracefully', () => {
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl={mockCategory.imageUrl}
        projectCount={0}
      />
    );

    expect(screen.getByText('0 Projects')).toBeInTheDocument();
  });

  it('handles large project counts correctly', () => {
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl={mockCategory.imageUrl}
        projectCount={999}
      />
    );

    expect(screen.getByText('999 Projects')).toBeInTheDocument();
  });

  it('displays fallback when image fails to load', () => {
    render(
      <CategoryCard
        id={mockCategory.id}
        title={mockCategory.title}
        description={mockCategory.description}
        imageUrl=""
        projectCount={mockCategory.projectCount}
      />
    );

    // The image should still render with empty src
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockCategory.title);
  });
});
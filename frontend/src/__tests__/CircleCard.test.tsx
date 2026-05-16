import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircleCard } from '../../components/circle/CircleCard';
import React from 'react';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('CircleCard', () => {
  const mockCircle = {
    id: '1',
    name: 'Test Circle',
    memberCount: 6,
    amount: 100,
    frequencyDays: 30,
    payoutOrder: 'FixedQueue',
    status: 'Forming',
    members: [],
  };

  it('renders circle name and details', () => {
    render(<CircleCard circle={mockCircle as any} />);
    expect(screen.getByText('Test Circle')).toBeDefined();
    expect(screen.getByText('$100')).toBeDefined();
  });
});
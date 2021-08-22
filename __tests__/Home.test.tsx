import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import Index from '../pages/index'

describe('Home page', () => {
  it('renders properly ', () => {
    render(<Index />)

    const heading = screen.getByRole('heading', {
      name: /klickrent\.js!/i,
    });
    const button = screen.getByRole('button');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows modal when click on the button ', async () => {
    render(<Index />)

    const heading = screen.getByRole('heading', {
      name: /klickrent\.js!/i,
    });
    const button = screen.getByRole('button');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('shows modal when click on the button ', async () => {
    render(<Index />)

    const heading = screen.getByRole('heading', {
      name: /klickrent\.js!/i,
    });
    const button = screen.getByRole('button');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close modal', { role: 'button' });

    fireEvent.click(closeButton);

    expect(await screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
})
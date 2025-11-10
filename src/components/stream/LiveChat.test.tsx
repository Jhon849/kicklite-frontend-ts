import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LiveChat from './LiveChat';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('LiveChat', () => {
  it('renders the chat interface', () => {
    renderWithRouter(<LiveChat />);
    
    // Check if chat header elements are present
    expect(screen.getByText(/chatting/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/send a message/i)).toBeInTheDocument();
    
    // Check if initial messages are rendered (can exist in pinned + list)
    expect(screen.getAllByText('Welcome everyone to the stream! 🔥').length).toBeGreaterThanOrEqual(1);
  });

  it('allows sending messages', async () => {
    renderWithRouter(<LiveChat />);
    
    const input = screen.getByPlaceholderText(/send a message/i);
    const testMessage = 'Hello, chat!';
    
    fireEvent.change(input, { target: { value: testMessage } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    await waitFor(() => {
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  it('toggles emoji picker', () => {
    const { container } = renderWithRouter(<LiveChat />);

    // The emoji toggle button is the small icon button next to the textarea inside its wrapper
    const textarea = container.querySelector('textarea')!;
    const wrapper = textarea.parentElement!;
    const buttons = wrapper.querySelectorAll('button');
    const emojiButton = buttons[0] as HTMLButtonElement; // the only small icon button inside wrapper
    fireEvent.click(emojiButton);

    // Check if emoji picker is shown
    expect(screen.getByText('😀')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(emojiButton);
    // Animated unmount via framer-motion may be async
    return waitFor(() => {
      expect(screen.queryByText('😀')).not.toBeInTheDocument();
    });
  });

  it('shows settings panel', () => {
    const { container } = renderWithRouter(<LiveChat />);

    // Settings button is the only button in the header right area
    const header = container.querySelector('.p-4.border-b');
    const settingsButton = header?.querySelector('button') as HTMLButtonElement;
    fireEvent.click(settingsButton);

    expect(screen.getByText('Chat Settings')).toBeInTheDocument();
    expect(screen.getByText('Chat Mode')).toBeInTheDocument();
    expect(screen.getByText('Message Delay')).toBeInTheDocument();
  });

  
  it('prevents sending empty messages', () => {
    const { container } = renderWithRouter(<LiveChat />);

    const sendButton = container.querySelector('button.p-3.rounded-lg.bg-purple-500') as HTMLButtonElement;
    expect(sendButton).toBeDisabled();

    const input = screen.getByPlaceholderText(/send a message/i);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(sendButton).not.toBeDisabled();
  });

  it('clears input after sending a valid message', async () => {
    const { container } = renderWithRouter(<LiveChat />);
    const input = screen.getByPlaceholderText(/send a message/i) as HTMLTextAreaElement;
    fireEvent.change(input, { target: { value: 'Message to send' } });

    const sendButton = container.querySelector('button.p-3.rounded-lg.bg-purple-500') as HTMLButtonElement;
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(input.value).toBe('');
      expect(screen.getByText('Message to send')).toBeInTheDocument();
    });
  });

  it('appends emoji to the input when selecting from picker', () => {
    const { container } = renderWithRouter(<LiveChat />);

    const textarea = container.querySelector('textarea')!;
    const wrapper = textarea.parentElement!;
    const buttons = wrapper.querySelectorAll('button');
    const emojiToggle = buttons[0] as HTMLButtonElement;
    fireEvent.click(emojiToggle);

    const emoji = screen.getByText('😀');
    const input = screen.getByPlaceholderText(/send a message/i) as HTMLTextAreaElement;
    fireEvent.click(emoji);

    expect(input.value).toContain('😀');
  });

  it('renders pinned message section when a message is pinned', () => {
    renderWithRouter(<LiveChat />);
    expect(screen.getByText(/pinned message/i)).toBeInTheDocument();
    // The initial pinned message text should be visible (may appear multiple times)
    expect(screen.getAllByText('Welcome everyone to the stream! 🔥').length).toBeGreaterThanOrEqual(1);
  });

  it('closes settings panel when close button is clicked', () => {
    const { container } = renderWithRouter(<LiveChat />);
    const header = container.querySelector('.p-4.border-b');
    const settingsButton = header?.querySelector('button') as HTMLButtonElement;
    fireEvent.click(settingsButton);

    expect(screen.getByText('Chat Settings')).toBeInTheDocument();

    // Toggle off with the same settings button
    fireEvent.click(settingsButton);
    // Animated exit may be async; wait for panel to be removed
    return waitFor(() => {
      expect(screen.queryByText('Chat Settings')).not.toBeInTheDocument();
    });
  });

  it('does not add a message when only whitespace is entered', () => {
    const { container } = renderWithRouter(<LiveChat />);
    const input = screen.getByPlaceholderText(/send a message/i) as HTMLTextAreaElement;
    const initialMessages = screen.getAllByText(/stream|rules|amazing/i).length;

    fireEvent.change(input, { target: { value: '   ' } });
    const sendButton = container.querySelector('button.p-3.rounded-lg.bg-purple-500') as HTMLButtonElement;
    expect(sendButton).toBeDisabled();

    // Press Enter should be prevented when only whitespace
    fireEvent.keyDown(input, { key: 'Enter' });

    const afterMessages = screen.getAllByText(/stream|rules|amazing/i).length;
    expect(afterMessages).toBe(initialMessages);
  });
});
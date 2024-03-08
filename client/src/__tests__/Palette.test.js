import { render, screen, cleanup } from '@testing-library/react';
import Palette from '../components/Palette';

afterEach(() => {
  cleanup();
});

describe('Title', () => {
  test.each([
    ['John', "'s"],
    ['Jess', "'"],
  ])('username ends in correct possessive apostrophe', (username, ending) => {
    render(<Palette username={username} />);
    const title = screen.getByText((text) => text.endsWith('Colour Palette'));
    expect(title).toHaveTextContent(username + ending);
  });
});

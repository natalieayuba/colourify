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
    render(<Palette username={username} tracks={[]} />);
    const title = screen.getByText((text) => text.endsWith('Colour Palette'));
    expect(title).toHaveTextContent(username + ending);
  });
});

// describe('Tracks', () => {
//   test('displays all tracks', (username, ending) => {
//     expect(true).toBe(true);
//   });
// });

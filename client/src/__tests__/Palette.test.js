import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Palette from '../components/Palette';

afterEach(() => {
  cleanup();
});

describe('Title', () => {
  test.each([
    ['Natalie', "'s"],
    ['Jess', "'"],
  ])('username ends in correct possessive apostrophe', (username, ending) => {
    render(<Palette username={username} />);
    const title = screen.getByText((content) =>
      content.includes('Colour Palette')
    );
    expect(title).toHaveTextContent(username + ending);

    // render(<CustomiseForm username={username1} setUsername={() => setUsername()}/>);
    // const nameInput = screen.getByDisplayValue(username1);
    // fireEvent.change(nameInput, {target: {value: username2}});
    // expect(title).toHaveTextContent(username2 + "'");
  });
});

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import DownloadScreen from '../screens/DownloadScreen';

const exampleUser = {
  display_name: 'John',
};

afterEach(() => {
  cleanup();
});

describe('Palette customisation', () => {
  test('changing name input updates username in palette title', () => {
    render(<DownloadScreen user={exampleUser} />);
    const nameInput = screen.getByDisplayValue(exampleUser.display_name);
    const paletteTitle = screen.getByText('Colour Palette', { exact: false });

    expect(paletteTitle).toHaveTextContent(exampleUser.display_name);
    fireEvent.change(nameInput, {target: {value: 'Jess'}});
    expect(paletteTitle).toHaveTextContent('Jess');
  });
});

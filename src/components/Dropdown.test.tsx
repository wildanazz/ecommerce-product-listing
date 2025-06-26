import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { Dropdown } from './Dropdown';

const options = [
    { value: 'apple', label: 'Apple' }, 
    { value: 'banana', label: 'Banana' }
];

describe('Dropdown', () => {
  it('renders options and sets the selected value', () => {
    render(<Dropdown value="banana" options={options} onChange={() => {}} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('banana');  // from jest-dom
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('calls onChange handler when option changes', () => {
    const onChangeMock = jest.fn();
    render(<Dropdown value="apple" options={options} onChange={onChangeMock} />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'banana' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('banana');
  });
});

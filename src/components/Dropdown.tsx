interface DropdownProps {
  label?: string; 
  value: string; 
  options: { value: string; label: string }[]; 
  onChange: (value: string) => void;
}

/**
 * Dropdown Component
 *
 * Renders a customizable select dropdown with options and controlled selection.
 * Supports an optional accessible label and calls back when the selected value changes.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional aria-label for accessibility
 * @param {string} props.value - Currently selected value (controlled)
 * @param {{ value: string; label: string }[]} props.options - Array of option objects with value and label
 * @param {(value: string) => void} props.onChange - Callback fired when selection changes, receives the new value
 */
export function Dropdown({ label, value, options, onChange }: DropdownProps) {
  return (
    <select
      aria-label={label}
      className="border px-3 py-2 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(({ value: optionValue, label: optionLabel }) => (
        <option key={optionValue} value={optionValue}>{optionLabel}</option>
      ))}
    </select>
  );
}
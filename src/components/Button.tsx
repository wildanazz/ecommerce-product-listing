interface ButtonProps {
  onClick: () => void;
  productName: string;
  label: string;
}

/**
 * Button Component
 *
 * A reusable button that triggers a callback when clicked.
 *
 * @param onClick - Callback function to handle click events.
 * @param productName - Name of the product for accessibility label.
 * @param label - The visible button label text.
 */
export default function Button({ onClick, productName, label }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      aria-label={`${label} ${productName}`}
    >
      {label}
    </button>
  );
}
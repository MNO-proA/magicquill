/* eslint-disable react/prop-types */
const Loader = ({ size = 30 }) => {
  return (
    <div className="mr-0">
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <circle
          className="stroke-amber-500"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="80, 200"
        />
      </svg>
    </div>
  );
};

export default Loader;
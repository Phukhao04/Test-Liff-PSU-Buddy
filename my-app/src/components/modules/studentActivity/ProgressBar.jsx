const ProgressBar = ({ value, color }) => (
  <div className="h-1.5 w-full rounded-full bg-gray-200">
    <div
      className="h-1.5 rounded-full transition-all"
      style={{
        width: `${Math.min(value, 100)}%`,
        backgroundColor: color,
      }}
    />
  </div>
);

export default ProgressBar;
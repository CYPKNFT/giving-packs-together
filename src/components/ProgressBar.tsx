
interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}

const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  // Determine status based on percentage
  const getProgressStatus = () => {
    if (percentage < 30) return "danger";
    if (percentage < 70) return "warning";
    return "success";
  };
  
  const status = getProgressStatus();

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1 text-sm">
          <span>{label}</span>
          <span className="font-medium">
            {current}/{target} ({percentage}%)
          </span>
        </div>
      )}
      <div className="progress-bar">
        <div 
          className={`progress-bar-inner progress-bar-${status}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

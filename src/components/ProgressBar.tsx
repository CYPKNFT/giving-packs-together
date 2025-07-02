
interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}

const ProgressBar = ({ current, target, label }: ProgressBarProps) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (percentage < 30) return "bg-destructive";
    if (percentage < 70) return "bg-orange-500";
    return "bg-green-500";
  };
  
  const progressColor = getProgressColor();

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
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ease-in-out ${progressColor}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

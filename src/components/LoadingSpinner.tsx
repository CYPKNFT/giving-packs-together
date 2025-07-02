import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const LoadingSpinner = ({ size = 'md', className, label = 'Loading...' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-border border-t-primary',
          sizeClasses[size]
        )}
        role="status"
        aria-label={label}
      >
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
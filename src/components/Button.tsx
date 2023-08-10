import { ComponentPropsWithRef } from 'react';
import clsx, { ClassValue } from 'clsx';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  const effect: ClassValue = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  const variants: Record<string, ClassValue> = {
    primary: 'bg-mint-500 hover:bg-mint-800',
    // secondary: 'bg-gray-900 text-white hover:bg-gray-700',
  };

  const sizes: Record<string, ClassValue> = {
    sm: 'min-w-[80px] px-2 py-1.5 text-sm',
    md: 'min-w-[140px] px-4 py-3.5 text-base',
    lg: 'min-w-[180px] px-6 py-4 text-lg font-bold',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={clsx([
        'w-full rounded-md flex justify-center items-center gap-2 box-border font-bold transition-colors duration-200 ease-in-out',
        effect,
        !disabled ? variants[variant] : 'bg-gray-300 text-gray-500',
        loading ? 'animate-pulse cursor-wait' : '',
        sizes[size],
      ])}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

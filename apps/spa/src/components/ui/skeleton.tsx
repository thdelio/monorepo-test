import type * as React from 'react';
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-6 w-full animate-pulse rounded-md bg-accent', className)}
      {...props}
    />
  );
}

export { Skeleton };

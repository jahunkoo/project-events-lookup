import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/shadcn-utils';

const Typescale = {
  Body1: 'body1',
  Body2: 'body2',
} as const;
type Typescale = (typeof Typescale)[keyof typeof Typescale];

const textVariants = cva('font-pretendard text-inherit', {
  variants: {
    typescale: {
      [Typescale.Body1]: 'text-sm font-medium',
      [Typescale.Body2]: 'text-xs font-normal',
    } as Record<Typescale, string>,
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textVariants> {}

export const Text: React.FC<TextProps> = forwardRef<HTMLDivElement, TextProps>(
  ({ className, typescale, children }, ref) => {
    return (
      <div className={cn(textVariants({ typescale, className }))} ref={ref}>
        {children}
      </div>
    );
  },
);

Text.displayName = 'Text';

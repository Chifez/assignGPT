import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const QuizLoader = () => {
  return (
    <Card className="w-full max-w-sm p-2">
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    </Card>
  );
};

import { Question } from '@/utils/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { QuizCard } from '../cards/quizcard';
import { Card, CardHeader, CardContent } from '../ui/card';
import { useSidebar } from '../ui/sidebar';

export const QuizCarousel = ({
  questions,
  numQuestions,
}: {
  questions: Question[];
  numQuestions: number;
}) => {
  const { isMobile } = useSidebar();
  return (
    <Carousel className="w-full max-w-xs md:max-w-sm mx-auto">
      <CarouselContent>
        {questions?.map((quiz, index) => (
          <CarouselItem key={index}>
            <Card className="w-full mx-auto mt-2 shadow-none border-none">
              <CardHeader className="pb-1">
                <p className="text-sm text-muted-foreground">
                  Question {index + 1} of {numQuestions}
                </p>
              </CardHeader>
              <CardContent>
                <QuizCard
                  quiz={quiz}
                  index={index}
                  handleSelectAnswer={(_, index) => console.log(index)}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {!isMobile && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

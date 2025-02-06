import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutCard() {
  return (
    <div className="max-w-sm mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Generate quiz on the fly</CardTitle>
          <CardDescription>Start streaming UI Components!</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground/90 leading-normal prose">
          <p className="mb-3">
            A simple prompt based way to enter into streaming components./
          </p>
          <p className="mb-3">
            Start by asking for a quiz in any topic with any number of
            questions.
          </p>
          <p className="mb-3">
            Notice when the component returns you can interact with it!{' '}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

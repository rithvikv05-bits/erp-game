import WelcomeForm from "@/components/WelcomeForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center pt-8 pb-16 md:pt-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline text-primary">
          ERP
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A nostalgic journey back to the 'good old days' of university course registration.
        </p>
      </div>
      <WelcomeForm />
    </div>
  );
}

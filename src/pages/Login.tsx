
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Mail } from "lucide-react";

const Login = () => {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
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
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="text-xs text-primary underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Sign In</Button>
              </CardFooter>
            </TabsContent>
            <TabsContent value="oauth">
              <CardContent className="space-y-4 pt-4">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" /> Login with GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" /> Login with Google
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>
          <CardFooter className="flex flex-col items-center justify-center space-y-2 border-t p-4">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;

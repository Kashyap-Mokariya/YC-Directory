'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Mail, Lock } from "lucide-react"
import { signIn } from "next-auth/react"

export function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSignInGithub = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await signIn("github", { redirectTo: "/" })
    setIsLoading(false)
  }

  const handleSignInGoogle = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await signIn("google", { redirectTo: "/" })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-950 via-pink-900 to-pink-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome to YCDirectory</h1>
          <p className="text-gray-300">Connect with entrepreneurs and pitch your startup</p>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pt-6 pb-2"
                    placeholder=" "
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <label
                    htmlFor="email"
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pt-6 pb-2"
                    placeholder=" "
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <label
                    htmlFor="password"
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none"
                  >
                    Password
                  </label>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="register" className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    id="register-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pt-6 pb-2"
                    placeholder=" "
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <label
                    htmlFor="register-email"
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pt-6 pb-2"
                    placeholder=" "
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <label
                    htmlFor="register-password"
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pt-6 pb-2"
                    placeholder=" "
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <label
                    htmlFor="confirm-password"
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none"
                  >
                    Confirm Password
                  </label>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Register"}
                </Button>
              </div>
            </TabsContent>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <form onSubmit={handleSignInGoogle}>
                <Button variant="outline" className="w-full" type="submit" disabled={isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  {isLoading ? "Loading..." : "Google"}
                </Button>
              </form>
              <form onSubmit={handleSignInGithub}>
                <Button variant="outline" className="w-full" type="submit" disabled={isLoading}>
                  <Github className="mr-2 h-4 w-4" />
                  {isLoading ? "Loading..." : "GitHub"}
                </Button>
              </form>
            </div>
          </Tabs>
        </div>
      </div>
      <style jsx global>{`
        input:not(:placeholder-shown) + label,
        input:focus + label {
          transform: translate(-0.25rem, -1.5rem) scale(0.8);
          color: #d53f8c;
        }
      `}</style>
    </div>
  )
}
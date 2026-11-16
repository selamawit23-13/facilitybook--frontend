
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Building2,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  Presentation,
  CarFront,
  GraduationCap,
  Monitor,
  CalendarCheck,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

import api from "@/services/api";
import { useAppDispatch } from "@/lib/hooks";
import {
  loginSuccess,
  type AuthUser,
} from "@/features/auth/authSlice";

const resources = [
  { name: "Meeting Rooms", icon: Users },
  { name: "Projectors & Equipment", icon: Presentation },
  { name: "Company Vehicles", icon: CarFront },
  { name: "Training Rooms", icon: GraduationCap },
  { name: "Office Equipment", icon: Monitor },
];

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
  user: AuthUser;
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setIsLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email: email.trim(),
        password,
      });

      const { accessToken, user } = response.data;

      // Save the authentication session
      localStorage.setItem("facilitybook_token", accessToken);
      localStorage.setItem("facilitybook_user", JSON.stringify(user));

      // Update Redux authentication state
      dispatch(
        loginSuccess({
          user,
          token: accessToken,
        })
      );

      // Navigate to dashboard
      router.replace("/");
    } catch (error: unknown) {
      let errorMessage =
        "Login failed. Please check your email and password.";

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as
          | { message?: string; error?: string }
          | undefined;

        if (error.response?.status === 401) {
          errorMessage = "Invalid email or password.";
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else if (!error.response) {
          errorMessage =
            "Cannot connect to the server. Please check that the backend is running.";
        }
      }

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#edf5f0] p-3 sm:p-6 lg:p-10">
      <div className="grid w-full max-w-[1450px] overflow-hidden rounded-[28px] border border-white shadow-[0_25px_80px_rgba(3,48,31,0.16)] lg:min-h-[760px] lg:grid-cols-[1.08fr_0.92fr]">

        {/* LEFT: FacilityBook branding and resources */}
        <section
          className="relative isolate flex min-h-[650px] flex-col justify-between overflow-hidden bg-[#032b20] px-7 py-8 text-white sm:px-10 sm:py-10 lg:px-12 lg:py-11"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(2,31,23,0.98) 0%, rgba(2,42,30,0.88) 52%, rgba(2,42,30,0.54) 100%),
              linear-gradient(0deg, rgba(0,25,18,0.96) 0%, transparent 68%),
              url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=90")
            `,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="pointer-events-none absolute -right-32 top-16 -z-10 h-80 w-80 rounded-full border border-emerald-300/20" />
          <div className="pointer-events-none absolute -right-20 top-28 -z-10 h-64 w-64 rounded-full border border-emerald-300/15" />

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-950/30">
                <Building2 size={32} strokeWidth={2.1} />
              </div>

              <div>
                <div className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Facility<span className="text-emerald-400">Book</span>
                </div>
                <p className="mt-1 text-[10px] font-semibold tracking-[2.5px] text-emerald-100/80 sm:text-xs">
                  FACILITY MANAGEMENT SYSTEM
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-[590px] sm:mt-20">
              <div className="mb-5 h-1 w-20 rounded-full bg-emerald-400" />

              <p className="text-xs font-bold uppercase tracking-[3px] text-emerald-300 sm:text-sm">
                One platform. Smarter facilities.
              </p>

              <h1 className="mt-5 text-4xl font-extrabold leading-[1.13] tracking-tight sm:text-5xl">
                Manage your facilities.
                <br />
                <span className="text-emerald-400">
                  Simplify your bookings.
                </span>
              </h1>

              <p className="mt-6 max-w-[480px] text-sm leading-7 text-emerald-50/85 sm:text-base">
                A centralized platform for managing resources, reservations,
                approvals, and facility operations.
              </p>
            </div>

            <div className="mt-10">
              <p className="mb-4 text-xs font-bold uppercase tracking-[2px] text-emerald-300">
                Explore our facilities & resources
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                {resources.map((resource) => {
                  const Icon = resource.icon;

                  return (
                    <div
                      key={resource.name}
                      className="group flex min-h-[112px] flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-400/30 bg-[#003c2d]/75 px-2 py-4 text-center backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-800/80"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 transition group-hover:bg-emerald-400 group-hover:text-[#032b20]">
                        <Icon size={25} strokeWidth={2} />
                      </div>

                      <span className="text-xs font-semibold leading-5 text-white">
                        {resource.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/20 pt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3">
              <div className="flex items-center gap-3">
                <CalendarCheck size={25} className="shrink-0 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-50">
                  Book Easily
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={25} className="shrink-0 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-50">
                  Manage Efficiently
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ChartNoAxesCombined size={25} className="shrink-0 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-50">
                  Optimize Resources
                </span>
              </div>
            </div>

            <p className="mt-7 text-xs tracking-wide text-emerald-100/65">
              FacilityBook · Book · Manage · Optimize
            </p>
          </div>
        </section>

        {/* RIGHT: Login form */}
        <section className="flex flex-col justify-center bg-white px-7 py-12 sm:px-12 lg:px-14 xl:px-16">
          <div className="mx-auto w-full max-w-[470px]">

            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#08784d] text-white">
                <Building2 size={27} />
              </div>

              <span className="text-2xl font-extrabold text-[#10271b]">
                Facility<span className="text-[#08784d]">Book</span>
              </span>
            </div>

            <div className="mb-9">
              <div className="mb-4 h-1 w-14 rounded-full bg-[#0a9660]" />

              <p className="text-sm font-bold uppercase tracking-[2px] text-[#078052]">
                Welcome back
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#14251b] sm:text-[38px]">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                Enter your account details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#25352c]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setMessage("");
                    }}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                    className="h-14 w-full rounded-xl border border-gray-200 bg-[#f8faf9] pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#078052] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#25352c]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="h-14 w-full rounded-xl border border-gray-200 bg-[#f8faf9] pl-12 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#078052] focus:bg-white focus:ring-4 focus:ring-emerald-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#078052]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#08784d] to-[#079765] font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-[#065f3c] hover:to-[#08784d] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Sign in"}
                {!isLoading && <ArrowRight size={20} />}
              </button>

              {message && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  {message}
                </div>
              )}
            </form>

            <div className="mt-12 border-t border-gray-100 pt-6 text-center">
              <p className="text-xs text-gray-400">
                © 2026 FacilityBook. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

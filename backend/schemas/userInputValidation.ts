import { z } from "zod";

// Signup Schema
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

// Signin Schema
export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});


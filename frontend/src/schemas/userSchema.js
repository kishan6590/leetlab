import { z } from "zod";

const signupSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be atleast of 6 characters"),
    name: z.string().min(3, "Name must be atleast 3 characters"),
  })
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Password do not match",
  //   path: ["confirmPassword"],
  // });  

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

export { signupSchema, loginSchema };

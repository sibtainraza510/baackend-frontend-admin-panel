const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "userName must be at least of 3 characters" })
    .max(255, { message: "userName must not be more than 255 characters" }),
  fullname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),  
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(10, { message: "Phone must not be more than 10 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(10, { message: "Password must be at least of 10 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});


const signinSchema = z.object({
   
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  
  password: z
    .string({ required_error: "Password is required" })
    .min(10, { message: "Password must be at least of 10 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});


module.exports = {signupSchema, signinSchema};
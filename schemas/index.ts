import * as z from "zod";
import { IngredientCategory, OrderStatus, UserRole } from "@prisma/client";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be more than six characters long!" }),
  code: z.optional(z.string()),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const StockSchema = z.object({
  base: z.optional(
    z.number().min(1, {
      message: "Stock Quantity required",
    })
  ),
  sauce: z.optional(
    z.number().min(1, {
      message: "Stock Quantity required",
    })
  ),
  cheese: z.optional(
    z.number().min(1, {
      message: "Stock Quantity required",
    })
  ),
  veggies: z.optional(
    z.number().min(1, {
      message: "Stock Quantity required",
    })
  ),
  meat: z.optional(
    z.number().min(1, {
      message: "Stock Quantity required",
    })
  ),
});

export const StatusSchema = z.object({
  status: z.enum([OrderStatus.PROCESSING, OrderStatus.SHIPPED]),
});

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );
export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be more than six characters long!" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be more than six characters long!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
  });

export const SignUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be more than six characters long!" }),
});

export const OrderSchema = z.object({
  pizzaId: z.number().min(1, {
    message: "Pizza Id is required",
  }),
  base: z.string().min(1, {
    message: "Select a base",
  }),
  sauce: z.string().min(1, {
    message: "Select a sauce ",
  }),
  cheese: z.string().min(1, {
    message: "Select a cheese",
  }),
  veggies: z.optional(z.string()),
  reference: z.optional(z.string()),
});

export const InventorySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
  stock: z.string().min(1, {
    message: "Stock is required",
  }),
  category: z.enum([
    IngredientCategory.BASE,
    IngredientCategory.CHEESE,
    IngredientCategory.MEAT,
    IngredientCategory.VEGGIES,
    IngredientCategory.SAUCE,
  ]),
});
export const UpdateInventorySchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Name is  required",
    })
  ),
  price: z.optional(
    z.string().min(1, {
      message: "Price is required",
    })
  ),
  stock: z.optional(
    z.string().min(1, {
      message: "Stock Quantity required",
    })
  ),
  category: z.enum([
    IngredientCategory.BASE,
    IngredientCategory.CHEESE,
    IngredientCategory.MEAT,
    IngredientCategory.VEGGIES,
    IngredientCategory.SAUCE,
  ]),
});

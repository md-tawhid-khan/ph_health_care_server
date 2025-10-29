

import { z } from "zod";

export const createAdminValidation = z.object({
  body: z.object({
    password: z.string({
      error: "password is required",
    }),

    admin: z.object({
      name: z.string({
        error: "name is required",
      }),
      email: z
        .string({
         error: "email is required",
        })
        ,
      contactNumber: z.string({
        error: "contactNumber is required",
      }),
    }),
  }),
});


export const userValidation={
    createAdminValidation
}
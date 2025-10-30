
import {  z } from "zod";

const genderEnum = z.enum(["MALE", "FEMALE",]);

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

const createDoctorValidation=z.object({
  body:z.object({
       password:z.string(),
       doctor:z.object({
        name: z.string().min(1, "name is required"),
        email: z.string(),
        profilePhoto: z.string().optional(),
       contactNo: z.string().min(6).max(20),
       address: z.string().optional(),
       registrationNumber: z.string(),
       experience: z.number().int().nonnegative().default(0),
       gender: genderEnum,
      appiontentfree: z.number().int().nonnegative(),
      qualification: z.string(),
     currentWorkingPlace: z.string(),
     designation: z.string(),
    isDelete: z.boolean().default(false),
    averageRating: z.number().min(0).max(5),
  
     })
  })
})

const createPatienceValidation=z.object({
  body:z.object({
    password:z.string(),
    patience:z.object({
      name:z.string(),
      email:z.string(),
      profilePhoto: z.string().optional(),
       contactNumber: z.string().min(6).max(20),
        address: z.string().optional(),
        isDelete: z.boolean().default(false),
    })
  })
})

export const userValidation={
    createAdminValidation,
    createDoctorValidation,
    createPatienceValidation
}
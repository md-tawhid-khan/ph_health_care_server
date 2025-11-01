import z from "zod";

const createSpecilitiesValidation=z.object({
    body:z.object({
       title:z.string()
    })
})

export const specialitiesValidation={
    createSpecilitiesValidation
}
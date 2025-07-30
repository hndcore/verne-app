import * as yup from "yup";

export const bookSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required("Title is required").min(1, "Title cannot be empty"),
  authorId: yup.string().required("Author is required"),
  genreId: yup.string().required("Genre is required"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["reading", "completed", "not_started", "dropped", "on_hold", "unknown"]),
  rating: yup
    .number()
    .nullable()
    .when("status", {
      is: "completed",
      then: schema =>
        schema
          .required("Rating is required for completed books")
          .min(1, "Rating must be at least 1")
          .max(5, "Rating must be at most 5"),
      otherwise: schema =>
        schema
          .nullable()
          .optional()
          .min(0, "Rating must be at least 0")
          .max(5, "Rating must be at most 5"),
    }),
  dateAdded: yup.string().required("Date is required"),
});

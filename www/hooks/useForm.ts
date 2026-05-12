"use client";

import { useState } from "react";
import { z } from "zod";

export function useForm<TSchema extends z.ZodTypeAny>(schema: TSchema) {
  type FormData = z.infer<TSchema>;
  type FieldName = Extract<keyof FormData, string>;

  const [data, setData] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (field: FieldName, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const applyZodErrors = (error: z.ZodError) => {
    const nextErrors: Partial<Record<FieldName, string>> = {};

    for (const issue of error.issues) {
      const fieldKey = issue.path?.[0];
      if (typeof fieldKey !== "string") continue;
      const field = fieldKey as FieldName;
      if (!nextErrors[field]) nextErrors[field] = issue.message;
    }

    setErrors(nextErrors);
  };

  const safeParse = () => schema.safeParse(data);

  const validate = (): boolean => {
    const result = safeParse();
    if (result.success) {
      setErrors({});
      return true;
    }

    applyZodErrors(result.error);
    return false;
  };

  const handleSubmit = async (onSubmit: (data: FormData) => Promise<void> | void) => {
    const result = safeParse();
    if (!result.success) {
      applyZodErrors(result.error);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit(result.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data,
    errors,
    isSubmitting,
    setValue,
    validate,
    handleSubmit,
  };
}

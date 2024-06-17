"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type RadioOption = {
  value: string;
  label: string;
};

interface RadioGroupFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  options: RadioOption[];
}

export function RadioGroupFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ options, control, name }: RadioGroupFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {/* <FormLabel>Notify me about...</FormLabel> */}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((o) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={o.value}
                >
                  <RadioGroupItem value={o.value} />
                  <FormLabel className="font-normal">{o.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

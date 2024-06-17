"use client";
import React, { useCallback } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "./multi-select";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type NewType<TFieldValues extends FieldValues> = FieldPath<TFieldValues>;

interface MultiSelectFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends NewType<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
}

function MultiSelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  placeholder,
  options,
  name,
  control,
  className,
}: MultiSelectFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="text-gray-500 dark:text-gray-500 text-xs">
              {label}
            </FormLabel>
          )}
          <MultiSelector
            values={field.value}
            onValuesChange={field.onChange}
            loop={false}
            options={options}
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder={placeholder ?? label} />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {options.map((option, i) => (
                  <MultiSelectorItem key={i} value={option.value}>
                    {option.label}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default MultiSelectFormField;

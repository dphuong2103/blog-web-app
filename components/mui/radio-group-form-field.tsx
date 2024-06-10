"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerProps, FieldPath, FieldValues, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type RadioOption<T> = {
    value: string,
    label: string
}

interface RadioGroupFormFieldProps<
    T,
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render">, Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
    options: RadioOption<T>[]
}

export function RadioGroupFormField<T>({ options, control, name }: RadioGroupFormFieldProps<T>) {


    return (
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem className="space-y-3">
                    {/* <FormLabel>Notify me about...</FormLabel> */}
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                        >
                            {options.map(o => <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={o.value} />
                                </FormControl>
                                <FormLabel className="font-normal">{o.label}</FormLabel>
                            </FormItem>)}


                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

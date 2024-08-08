import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'
import { z } from 'zod'

const formSchema = authFormSchema('sign-up')


interface CustomInputsProps {
    control: Control<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
    type: string,
    name: FieldPath<z.infer<typeof formSchema>>,
}

const CustomInput = ({ control, type, placeholder, label, name}: CustomInputsProps) => {
  return (

        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <div className="form-item">
                <FormLabel className="form-label">{label}</FormLabel>
                <div className="flex w-full flex-col">
                   <FormControl>
                    <Input className="input-class" type={type} placeholder={placeholder}  {...field}/>
                    </FormControl> 
                    <FormMessage className="form-message pt-2" />
                </div>

            </div>
          )}
        />

  )
}

export default CustomInput
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
export const Password: React.FC<
    TextField & {
        errors: Partial<FieldErrorsImpl>
        register: UseFormRegister<FieldValues>
    }
> = ({ name, defaultValue, errors, label, register, required, width }) => {


    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    return (
        <Width width={width}>
            <Label htmlFor={name}>
                {label}

                {required && (
                    <span className="required">
                        * <span className="sr-only">(required)</span>
                    </span>
                )}
            </Label>
            <div className="relative w-fit">
                <Input
                    defaultValue={defaultValue}
                    id={name}
                    type={showPassword ? "text" : "password"}
                    {...register(name, { required })}
                />
                <Button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={togglePasswordVisibility}>
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
            </div>
            {errors[name] && <Error name={name} />}
        </Width>
    )
}

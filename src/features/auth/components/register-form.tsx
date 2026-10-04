import React, { useState } from 'react'
import { createRegisterSchema } from '../utils/register-schema'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { RegisterSchema } from '../utils/register-schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import facebookIcon from '@/assets/icons/fb-vector.svg'
import googleIcon from '@/assets/icons/Google-vector.svg'
import appleIcon from '@/assets/icons/apple-vector.svg'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'


export default function RegisterForm() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    //states
    const [isLoading, setIsLoading] = useState(false)
    // Show/hide toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        step0: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
        },
        step1: {
            age: 0,
        },
        step2: {
            weight: 0,
        },
        step3: {
            height: 0,
        },
        step4: {
            goal: '',
        },
        step5: {
            activityLevel: ''
        },
    })

    const handleSubmit = (data: RegisterSchema) => {
        console.log(data)
    }
    const schema = createRegisterSchema(t)
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            gender: '',
            height: 0,
            weight: 0,
            age: 0,
            goal: '',
            activityLevel: '',
        },
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldFocusError: true,
        shouldUnregister: false,
        shouldUseNativeValidation: false,
        shouldValidate: true,
        shouldValidateOnBlur: true,
    })
    const handleNext = async () => {
        const validInputs = await form.trigger([
            'firstName',
            'lastName',
            'email',
            'password',
            'rePassword',
        ])
        if (validInputs) {
            setStep((prev) => (prev + 1))
        }
        else {
            toast.error(t('auth.errors.invalidInputs'))
        }
    }
    const handlePrevious = () => {
        setStep(step - 1)
    }
    return (
        <form className="w-full max-w-lg" onSubmit={form.handleSubmit(handleSubmit)}>
            {step === 0 && (
                <div className="mt-4 space-y-4 border border-muted-foreground rounded-auth p-10">
                    <p className="text-center font-heading text-2xl font-extrabold">
                        Register
                    </p>
                    <FieldGroup>
                        <Field data-invalid={!!form.formState.errors.firstName}>
                            <div className="relative">
                                <User className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
                                <Input id="firstName" 
                                type="text" 
                                placeholder={t('auth.firstName')} 
                                className="ps-11" 
                                {...form.register('firstName')} 
                                />
                            </div>
                            <FieldError errors={[form.formState.errors.firstName]} className='text-start'/>
                        </Field>
                        <Field data-invalid={!!form.formState.errors.lastName}>
                            <div className="relative">
                                <User className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
                                <Input id="lastName" 
                                type="text" 
                                placeholder={t('auth.lastName')} 
                                className="ps-11" 
                                {...form.register('lastName')} 
                                />
                            </div>
                            <FieldError errors={[form.formState.errors.lastName]} className='text-start'/>
                        </Field>
                        <Field data-invalid={!!form.formState.errors.email}>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
                                <Input id="email" 
                                type="email" 
                                placeholder={t('auth.email')} 
                                className="ps-11" 
                                {...form.register('email')} 
                                />
                            </div>
                            <FieldError errors={[form.formState.errors.email]} className='text-start'/>
                        </Field>
                        <Field data-invalid={!!form.formState.errors.password}>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t('auth.password')}
                                    className="ps-11 pe-11"
                                    {...form.register('password')}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-font-2"
                                    onClick={() => setShowPassword((current) => !current)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                            <FieldError errors={[form.formState.errors.password]} className='text-start'/>
                        </Field>
                        <Field data-invalid={!!form.formState.errors.rePassword}>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-font-2" />
                                <Input
                                    id="rePassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder={t('auth.confirmPassword')}
                                    className="ps-11 pe-11"
                                    {...form.register('rePassword')}
                                   
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 -translate-y-1/2 text-font-2"
                                    onClick={() => setShowConfirmPassword((current) => !current)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                            <FieldError errors={[form.formState.errors.rePassword]} className='text-start'/>
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-end mb-6">
                        <Button className="text-base leading-140 cursor-pointer font-bold" 
                        variant="link" onClick={() => navigate('/auth/reset-password')}>{t('auth.forgetPassword')}</Button>
                    </div>
                    <div className='flex justify-center  items-center'>
                        <Separator orientation="horizontal" className='bg-muted-foreground max-w-1/3' />
                        <p className="text-center font-heading text-base leading-140 mx-1">{t('auth.or')}</p>
                        <Separator orientation="horizontal" className='bg-muted-foreground max-w-1/3' />
                    </div>
                    <div className='flex justify-center gap-2'>
                        <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
                            <img src={facebookIcon} alt="facebook" className="size-5" />
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
                            <img src={googleIcon} alt="google" className="size-5" />
                        </div>
                        <div className="flex items-center justify-center rounded-full bg-background p-3 hover:bg-muted transition-colors duration-300">
                            <img src={appleIcon} alt="apple" className="size-5" />
                        </div>

                    </div>
                    <Button
                        variant="cta"
                        type="button"
                        className="w-full mt-4"
                        onClick={handleNext}
                    >
                        {t('auth.register')}
                    </Button>
                    <p className="text-center font-heading text-base leading-140">
                        {t('auth.alreadyHaveAccount')}{" "}
                        <Button className="text-base leading-140 cursor-pointer" variant="link-accent" onClick={() => navigate('/login')}>{t('auth.login')}</Button>
                    </p>

                </div>
            )}
            {/* {step === 1 && (
                <div>
                    <Input type="number" placeholder="Age" {...form.register('age')} />
                    <Button type="submit" onClick={handleNext}>Next</Button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <Input type="number" placeholder="Weight" {...form.register('weight')} />

                    <Button type="submit" onClick={handleNext}>Next</Button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <Input type="number" placeholder="Height" {...form.register('height')} />

                    <Button type="submit" onClick={handleNext}>Next</Button>
                </div>
            )}
            {step === 4 && (
                <div>
                    <Input type="text" placeholder="Goal" {...form.register('goal')} />

                    <Button type="submit" onClick={handleNext}>Submit</Button>
                </div>
            )}
            {step === 5 && (
                <div>

                    <Input type="text" placeholder="Activity Level" {...form.register('activityLevel')} />
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            )} */}
        </form>
    );
}

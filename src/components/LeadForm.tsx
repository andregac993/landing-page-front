"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { leadFormSchema, type LeadFormData } from "@/lib/validation"
import { formatPhoneNumber } from "@/lib/phone"
import { captureUTMParams } from "@/lib/utm"
import { postLead } from "@/lib/api"
import { trackLead } from "@/lib/gtm"
import { cn } from "@/lib/utils"

export function LeadForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [utmParams, setUtmParams] = useState({
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        utmTerm: "",
        utmContent: "",
        gclid: "",
        fbclid: "",
    })

    const form = useForm<LeadFormData>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            position: "",
            message: "",
        },
    })

    useEffect(() => {
        setUtmParams(captureUTMParams())
    }, [])

    async function onSubmit(data: LeadFormData) {
        setIsSubmitting(true)

        try {
            const result = await postLead({
                ...data,
                ...utmParams,
            })

            if (result.success) {
                trackLead({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    position: data.position,
                    message: data.message,
                    value: 100,
                })

                toast.success("Lead enviado com sucesso! Entraremos em contato em breve.")
                form.reset()
            } else {
                toast.error(result.error || "Erro ao enviar lead. Tente novamente.")
            }
        } catch (error) {
            toast.error("Erro inesperado ao enviar lead. Tente novamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">Nome completo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="João Silva"
                                        autoComplete="name"
                                        className="h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="joao@empresa.com"
                                        autoComplete="email"
                                        className="h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">Telefone</FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="(11) 99999-9999"
                                        autoComplete="tel"
                                        className="h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
                                        {...field}
                                        onChange={(e) => {
                                            const formatted = formatPhoneNumber(e.target.value)
                                            field.onChange(formatted)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold">Cargo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Gerente de Marketing"
                                        autoComplete="organization-title"
                                        className="h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-base font-semibold">Data de Nascimento</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "h-12 text-base rounded-xl border-2 hover:border-primary transition-colors pl-4 text-left font-normal",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                            <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                                    <Calendar
                                        mode="single"
                                        captionLayout="dropdown"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date >= new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-semibold">Mensagem</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Conte-nos como podemos ajudar seu negócio a crescer..."
                                    className="min-h-[140px] text-base rounded-xl border-2 focus:border-primary transition-colors resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5 mr-2" />
                            Enviar mensagem
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}

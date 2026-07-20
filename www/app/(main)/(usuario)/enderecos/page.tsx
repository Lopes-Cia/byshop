"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAddressesStore } from "@/stores/addresses-store"

const AddressFormSchema = z.object({
  label: z.string().trim().min(1, "Informe um nome para este endereço."),
  recipientName: z.string().trim().min(1, "Informe o destinatário."),
  phone: z.string().trim().min(8, "Informe um telefone válido."),
  cep: z.string().trim().min(8, "Informe um CEP válido."),
  street: z.string().trim().min(1, "Informe a rua."),
  number: z.string().trim().min(1, "Informe o número."),
  neighborhood: z.string().trim().min(1, "Informe o bairro."),
  city: z.string().trim().min(1, "Informe a cidade."),
  state: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .refine((value) => /^[A-Z]{2}$/.test(value), "Informe o UF (ex.: SP)."),
  complement: z.string().trim().optional(),
})

type AddressFormValues = z.infer<typeof AddressFormSchema>

export default function EnderecosPage() {
  const store = useAddressesStore((s) => ({
    addresses: s.addresses,
    defaultAddressId: s.defaultAddressId,
    addAddress: s.addAddress,
    removeAddress: s.removeAddress,
    setDefaultAddress: s.setDefaultAddress,
  }))

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      label: "",
      recipientName: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      complement: "",
    },
    mode: "onTouched",
  })

  const onSubmit = (values: AddressFormValues) => {
    store.addAddress({
      label: values.label,
      recipientName: values.recipientName,
      phone: values.phone,
      cep: values.cep,
      street: values.street,
      number: values.number,
      neighborhood: values.neighborhood,
      city: values.city,
      state: values.state,
      complement: values.complement,
    })
    form.reset()
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Endereços</h1>
            <p className="mt-1 text-sm text-neutral-600">Gerencie seus endereços de entrega (mock).</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/minha-conta">Minha conta</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="space-y-4">
            {store.addresses.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nenhum endereço cadastrado</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-neutral-600">
                  Adicione um endereço no formulário ao lado.
                </CardContent>
              </Card>
            ) : (
              store.addresses.map((address) => (
                <Card key={address.id}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      {address.label}
                      {address.id === store.defaultAddressId ? " (Padrão)" : ""}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm text-neutral-600">
                      <p className="font-semibold text-neutral-900">{address.recipientName}</p>
                      <p>{address.phone}</p>
                      <p>
                        {address.street}, {address.number}
                        {address.complement ? ` — ${address.complement}` : ""}
                      </p>
                      <p>
                        {address.neighborhood} • {address.city}/{address.state} • {address.cep}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => store.setDefaultAddress(address.id)}
                        disabled={address.id === store.defaultAddressId}
                      >
                        Tornar padrão
                      </Button>
                      <Button type="button" size="sm" variant="destructive" onClick={() => store.removeAddress(address.id)}>
                        Remover
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Adicionar endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="label"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Casa, Trabalho..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destinatário</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" inputMode="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" inputMode="numeric" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UF</FormLabel>
                            <FormControl>
                              <Input placeholder="SP" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rua</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua Exemplo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Centro" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="São Paulo" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Complemento</FormLabel>
                            <FormControl>
                              <Input placeholder="Apto, bloco..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                      Adicionar
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}

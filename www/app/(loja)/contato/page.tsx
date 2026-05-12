"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@/hooks/useForm";
import { ContactSchema, type ContactForm } from "@/lib/schemas";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data, errors, isSubmitting, setValue, handleSubmit } = useForm(ContactSchema);

  const onSubmit = async (formData: ContactForm) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-green-800">Mensagem enviada com sucesso!</h2>
          <p className="mb-4 text-green-700">
            Obrigado por entrar em contato. Vamos responder em até 24 horas.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-transparent">
            Enviar outra mensagem
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contato</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Queremos te ouvir. Envie uma mensagem e responderemos o quanto antes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="h-full rounded-xl border p-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Fale com a gente</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Endereço</h3>
                  <p className="text-muted-foreground">
                    123 Commerce Street
                    <br />
                    Business City, BC 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Telefone</h3>
                  <p className="text-muted-foreground">
                    Main: 1-800-STORE-01
                    <br />
                    Support: 1-800-STORE-02
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">E-mail</h3>
                  <p className="text-muted-foreground">
                    General: info@store.com
                    <br />
                    Support: support@store.com
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="mb-4 font-semibold text-gray-900">Dúvidas rápidas</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Status do pedido</h4>
                  <p className="text-muted-foreground text-sm">
                    Acompanhe o pedido na área de pedidos
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Trocas e devoluções</h4>
                  <p className="text-muted-foreground text-sm">Consulte prazos e condições</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Entrega</h4>
                  <p className="text-muted-foreground text-sm">Frete grátis acima de $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">Envie uma mensagem</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit);
              }}
              className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    Nome *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={data.firstName || ""}
                    onChange={(e) => setValue("firstName", e.target.value)}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    Sobrenome *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={data.lastName || ""}
                    onChange={(e) => setValue("lastName", e.target.value)}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={data.email || ""}
                    onChange={(e) => setValue("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={data.phone || ""}
                    onChange={(e) => setValue("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    value={data.subject || ""}
                    onChange={(e) => setValue("subject", e.target.value)}
                    className={`focus:ring-primary w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}>
                    <option value="">Selecione um assunto</option>
                    <option value="general">Dúvida geral</option>
                    <option value="order">Pedido</option>
                    <option value="returns">Trocas e devoluções</option>
                    <option value="technical">Suporte técnico</option>
                    <option value="billing">Cobrança</option>
                    <option value="partnership">Parcerias</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div>
                  <label
                    htmlFor="orderNumber"
                    className="mb-2 block text-sm font-medium text-gray-700">
                    Número do pedido (se houver)
                  </label>
                  <Input
                    id="orderNumber"
                    type="text"
                    placeholder="#12345"
                    value={data.orderNumber || ""}
                    onChange={(e) => setValue("orderNumber", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Descreva sua solicitação com detalhes..."
                  value={data.message || ""}
                  onChange={(e) => setValue("message", e.target.value)}
                  className={`focus:ring-primary w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                  Quero receber novidades sobre produtos e promoções
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">Visite a loja</h2>
        <div className="relative h-96 overflow-hidden rounded-xl bg-gray-100">
          {/* Placeholder for map - in a real app, you'd use Google Maps, Mapbox, etc. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="text-muted-foreground mb-2 text-lg font-semibold">Mapa interativo</h3>
              <p className="text-gray-500">123 Commerce Street, Business City, BC 12345</p>
              <Button
                variant="outline"
                className="mt-4 bg-white"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=123+Commerce+Street+Business+City+BC+12345",
                    "_blank"
                  )
                }>
                Abrir no Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Phone className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Ligue</h3>
          <p className="text-muted-foreground text-balance">
            Fale diretamente com a equipe para atendimento rápido.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Suporte por e-mail</h3>
          <p className="text-muted-foreground text-balance">
            Envie um e-mail e responderemos em até 24 horas em dias úteis.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
            <MapPin className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Visite</h3>
          <p className="text-muted-foreground text-balance">
            Visite nossa loja física para ver os produtos de perto.
          </p>
        </div>
      </div>
    </div>
  );
}

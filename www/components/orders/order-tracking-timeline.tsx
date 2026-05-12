import { Check, Circle, X } from "lucide-react";
import type { OrderStatus } from "@/stores/ordersStore";
import { cn } from "@/lib/utils";

type TimelineStep = {
  key: string;
  title: string;
  description?: string;
  state: "done" | "current" | "todo";
};

const baseSteps: Array<Omit<TimelineStep, "state"> & { status: Exclude<OrderStatus, "canceled"> }> =
  [
    {
      status: "processing",
      key: "processing",
      title: "Processando",
      description: "Recebemos seu pedido e estamos preparando a separação.",
    },
    { status: "paid", key: "paid", title: "Pago", description: "Pagamento confirmado." },
    { status: "shipped", key: "shipped", title: "Enviado", description: "Pedido em transporte." },
    { status: "delivered", key: "delivered", title: "Entregue", description: "Pedido entregue no destino." },
  ];

function buildTimeline(status: OrderStatus): { steps: TimelineStep[]; banner?: string } {
  if (status === "canceled") {
    const steps: TimelineStep[] = [
      {
        key: "processing",
        title: "Processando",
        description: "O pedido iniciou processamento antes do cancelamento.",
        state: "done",
      },
      {
        key: "canceled",
        title: "Cancelado",
        description: "Este pedido foi cancelado.",
        state: "current",
      },
    ];
    return { steps, banner: "Pedido cancelado" };
  }

  const currentIndex = baseSteps.findIndex((step) => step.status === status);
  const steps = baseSteps.map((step, index) => {
    const state: TimelineStep["state"] =
      index < currentIndex ? "done" : index === currentIndex ? "current" : "todo";
    return {
      key: step.key,
      title: step.title,
      description: step.description,
      state,
    };
  });

  return { steps };
}

export function OrderTrackingTimeline({ status }: { status: OrderStatus }) {
  const { steps, banner } = buildTimeline(status);

  return (
    <div className="space-y-4">
      {banner ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
          {banner}
        </div>
      ) : null}
      <ol className="space-y-4">
        {steps.map((step, index) => {
          const isDone = step.state === "done";
          const isCurrent = step.state === "current";
          const Icon = banner && step.key === "canceled" ? X : isDone ? Check : Circle;

          return (
            <li key={step.key} className="relative flex gap-3">
              <div className="relative flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border bg-white",
                    isDone && "border-emerald-200 text-emerald-700",
                    isCurrent && !banner && "border-primary text-primary",
                    !isDone && !isCurrent && "border-gray-200 text-gray-400",
                    banner && step.key === "canceled" && "border-red-200 text-red-700",
                  )}>
                  <Icon className="h-4 w-4" />
                </span>
                {index < steps.length - 1 ? (
                  <span className="mt-1 h-full min-h-6 w-px bg-gray-200" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={cn(
                      "font-medium",
                      isCurrent && !banner ? "text-gray-900" : "text-gray-800",
                      step.key === "canceled" ? "text-red-800" : null,
                    )}>
                    {step.title}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      isDone ? "text-emerald-700" : isCurrent ? "text-primary" : "text-gray-400",
                      banner && step.key === "canceled" ? "text-red-700" : null,
                    )}>
                    {isDone ? "Concluído" : isCurrent ? "Atual" : "Pendente"}
                  </div>
                </div>
                {step.description ? (
                  <p className="text-muted-foreground mt-1 text-sm">{step.description}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

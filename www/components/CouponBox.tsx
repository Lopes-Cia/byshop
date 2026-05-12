"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/stores/cartStore"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  compact?: boolean
}

export default function CouponBox({ className, compact }: Props) {
  const coupon = useCartStore((state) => state.coupon)
  const applyCoupon = useCartStore((state) => state.applyCoupon)
  const removeCoupon = useCartStore((state) => state.removeCoupon)

  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const couponLabel = useMemo(() => {
    if (!coupon) return null
    if (coupon.code === "FREESHIP") return "Frete grátis"
    if (coupon.code === "SAVE20") return "20% de desconto"
    return "10% de desconto"
  }, [coupon])

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white",
        compact ? "p-3" : "p-4",
        className,
      )}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">Cupom</div>
        {coupon ? (
          <Badge variant="secondary" className="font-mono tracking-tight">
            {coupon.code}
          </Badge>
        ) : null}
      </div>

      {coupon ? (
        <div className={cn("mt-3 flex items-start justify-between gap-3", compact ? "flex-col" : "sm:flex-row")}>
          <div>
            <div className="text-sm text-muted-foreground">{couponLabel}</div>
          </div>
          <Button
            type="button"
            variant="outline"
            className={cn("bg-transparent", compact ? "w-full" : "")}
            onClick={() => {
              removeCoupon()
              setError(null)
            }}>
            Remover
          </Button>
        </div>
      ) : (
        <form
          className={cn("mt-3 flex gap-2", compact ? "flex-col" : "sm:flex-row")}
          onSubmit={(e) => {
            e.preventDefault()
            const result = applyCoupon(code)
            if (!result.ok) {
              setError(result.error)
              return
            }
            setError(null)
            setCode("")
          }}>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ex.: SAVE10, SAVE20, FREESHIP"
            autoCapitalize="characters"
            className={cn(compact ? "w-full" : "flex-1")}
          />
          <Button type="submit" className={cn(compact ? "w-full" : "shrink-0")}>
            Aplicar
          </Button>
        </form>
      )}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Gauge,
  Info,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  TriangleAlert,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { Input } from "@/components/ui/input";
import {
  AIR_MAX_WEIGHT,
  ORIGIN_LABEL,
  WEIGHT_LIMITS,
  formatPrice,
  getDestination,
  isValidZip,
  quoteShipment,
  type ServiceId,
} from "@/lib/shipping-rates";

const serviceIcons: Record<ServiceId, LucideIcon> = {
  overnight: Zap,
  preferred: ShieldCheck,
  fastlane: Gauge,
  standard: Mail,
  ground: Truck,
};

// Matches the field sizing used by the contact form.
const fieldClass = "h-12 px-3.5 text-base md:text-sm";

export function ShippingCalculator() {
  const [zip, setZip] = useState("");
  const [weight, setWeight] = useState("");
  const [touched, setTouched] = useState({ zip: false, weight: false });

  const destination = useMemo(() => getDestination(zip), [zip]);
  const weightValue = Number.parseFloat(weight);
  const weightValid = Number.isFinite(weightValue) && weightValue > 0;

  const result = useMemo(
    () => (destination && weightValid ? quoteShipment(destination, weightValue) : null),
    [destination, weightValid, weightValue],
  );

  // Report completed quotes, not keystrokes — and never the raw ZIP, only the
  // zone it resolves to.
  useEffect(() => {
    if (!result || result.status !== "ok") return;
    const timer = setTimeout(() => {
      trackEvent("shipping_quote", {
        destination: result.destination.label,
        weight_lbs: weightValue,
        services_quoted: result.quotes.length,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [result, weightValue]);

  const zipError =
    touched.zip && zip.length > 0 && !isValidZip(zip)
      ? "Enter a valid 5-digit ZIP code."
      : null;

  const weightError =
    touched.weight && weight.trim().length > 0 && !weightValid
      ? "Enter a weight greater than 0."
      : null;

  const limit = destination?.kind === "territory"
    ? WEIGHT_LIMITS.territory
    : WEIGHT_LIMITS.domestic;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Inputs */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-2">
        <h3 className="text-lg font-semibold">Shipment details</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Rates ship from our IAD fulfillment center to any US address.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="ship-from"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Ship from
            </label>
            <Input
              id="ship-from"
              value={ORIGIN_LABEL}
              readOnly
              tabIndex={-1}
              aria-readonly="true"
              className={cn(fieldClass, "bg-muted/60 text-muted-foreground")}
            />
          </div>

          <div>
            <label
              htmlFor="ship-to"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Ship to
            </label>
            <Input
              id="ship-to"
              value="United States"
              readOnly
              tabIndex={-1}
              aria-readonly="true"
              className={cn(fieldClass, "bg-muted/60 text-muted-foreground")}
            />
          </div>

          <div>
            <label
              htmlFor="destination-zip"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Destination ZIP code
            </label>
            <Input
              id="destination-zip"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="e.g. 30303"
              value={zip}
              maxLength={5}
              aria-invalid={zipError ? true : undefined}
              aria-describedby={zipError ? "zip-error" : undefined}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              onBlur={() => setTouched((t) => ({ ...t, zip: true }))}
              className={fieldClass}
            />
            {zipError && (
              <p id="zip-error" className="mt-2 text-sm text-destructive">
                {zipError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="package-weight"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Package weight (lbs)
            </label>
            <Input
              id="package-weight"
              type="number"
              min={0.01}
              step={0.01}
              placeholder="0.00"
              value={weight}
              aria-invalid={weightError ? true : undefined}
              aria-describedby={weightError ? "weight-error" : undefined}
              onChange={(e) => setWeight(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, weight: true }))}
              className={fieldClass}
            />
            {weightError && (
              <p id="weight-error" className="mt-2 text-sm text-destructive">
                {weightError}
              </p>
            )}
          </div>
        </div>

        {/* Destination readout */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="text-sm">
            {destination ? (
              <>
                <span className="font-medium text-foreground">
                  {destination.label}
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  · max {limit} lb per parcel
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">
                Enter a ZIP code and weight to see live rates.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">Available services</h3>
          {result?.status === "ok" && (
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {result.destination.label} · {weightValue} lb
            </span>
          )}
        </div>

        {!result && (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <Package className="h-8 w-8 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium">No rates yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Add a destination ZIP code and package weight and we&apos;ll price
              every service we can run.
            </p>
          </div>
        )}

        {result?.status === "over-limit" && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                Over the {result.limit} lb online limit
                {result.destination.kind === "territory"
                  ? ` for ${result.destination.label}`
                  : ""}
                .
              </p>
              <p className="mt-1 text-muted-foreground">
                Heavier shipments move as freight and we price them by hand —
                talk to us and we&apos;ll quote it the same day.
              </p>
            </div>
          </div>
        )}

        {result?.status === "ok" && (
          <>
            <ul className="mt-6 space-y-3">
              {result.quotes.map(({ service, price, listPrice }) => {
                const Icon = serviceIcons[service.id];
                return (
                  <li
                    key={service.id}
                    className={cn(
                      "flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors sm:p-5",
                      service.recommended
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-background",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                          service.recommended
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-semibold leading-tight">
                            {service.name}
                          </h4>
                          {service.recommended && (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {service.transit}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-xl font-bold tracking-tight">
                        {formatPrice(price)}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        <s>{formatPrice(listPrice)}</s> · save {service.discount}%
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {result.notices.map((notice) => (
              <div
                key={notice}
                className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-secondary/40 p-4 text-sm text-muted-foreground"
              >
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{notice}</span>
              </div>
            ))}

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Prices are per parcel and include our negotiated carrier discount.
              Dimensional weight, residential surcharges, and fuel adjustments
              are quoted on your account. Parcels over {AIR_MAX_WEIGHT} lb move
              by ground only.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

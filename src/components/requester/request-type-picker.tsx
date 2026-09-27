import { ArrowUpRightIcon, BugIcon, PlusIcon, WrenchIcon } from "lucide-react";
import { useState } from "react";

import type { RequestInput } from "@/lib/domain/tickets";

type RequestTypePickerProps = {
  onSelect: (type: RequestInput["type"]) => void;
};

const requestTypes = [
  {
    type: "new-system" as const,
    label: "Request Sistem Baru",
    description: "Sampaikan kebutuhan baru yang belum memiliki sistem pendukung.",
    icon: PlusIcon,
    marker: "01",
  },
  {
    type: "enhancement" as const,
    label: "Pengembangan Sistem",
    description: "Tambahkan atau ubah fungsi pada sistem yang sudah digunakan.",
    icon: WrenchIcon,
    marker: "02",
  },
  {
    type: "bug" as const,
    label: "Error / Bug / Debugging",
    description: "Laporkan kendala sistem dengan bahasa sederhana.",
    icon: BugIcon,
    marker: "03",
  },
];

export function RequestTypePicker({ onSelect }: RequestTypePickerProps) {
  const [selectedType, setSelectedType] = useState<RequestInput["type"]>();

  const selectRequestType = (type: RequestInput["type"]) => {
    setSelectedType(type);
    window.setTimeout(() => onSelect(type), 180);
  };

  return (
    <section aria-labelledby="request-type-title" className="mx-auto w-full max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="max-w-xl lg:col-span-5 lg:pt-4">
          <p className="text-sm font-medium text-primary">Pengajuan baru</p>
          <h1 id="request-type-title" className="mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Satu request, jalur yang jelas.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Pilih kebutuhan Anda. Form berikutnya hanya menampilkan informasi yang benar-benar diperlukan.
          </p>
          <p className="mt-8 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
            Tidak perlu istilah teknis. Tim engineer akan melakukan klasifikasi setelah request diterima.
          </p>
        </div>

        <div className="border-y border-border lg:col-span-7 lg:border-t">
        {requestTypes.map(({ type, label, description, icon: Icon, marker }) => {
          const isSelected = selectedType === type;

          return <button
            key={type}
            type="button"
            onClick={() => selectRequestType(type)}
            aria-pressed={isSelected}
            disabled={Boolean(selectedType)}
            className={`group relative grid w-full grid-cols-[auto_auto_1fr_auto] items-start gap-3 border-b border-border px-1 py-5 text-left transition-colors duration-200 last:border-b-0 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none sm:gap-5 sm:px-4 sm:py-6 ${isSelected ? "bg-secondary/80" : "hover:bg-secondary/55"}`}
          >
            <span aria-hidden="true" className={`absolute inset-y-4 left-0 w-px bg-primary transition-transform duration-200 ${isSelected ? "scale-y-100" : "scale-y-0"}`} />
            <span className="pt-1 font-mono text-xs font-medium tabular-nums text-muted-foreground">{marker}</span>
            <span className={`flex size-11 items-center justify-center rounded-xl transition-colors ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground"}`}>
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div className="min-w-0 pt-0.5">
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{label}</h2>
              <p className="mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            <span className={`mt-1.5 flex size-9 items-center justify-center rounded-full border transition-all ${isSelected ? "translate-x-0.5 border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"}`}>
              <ArrowUpRightIcon aria-hidden="true" className="size-4" />
            </span>
          </button>
        })}
        </div>
      </div>
    </section>
  );
}

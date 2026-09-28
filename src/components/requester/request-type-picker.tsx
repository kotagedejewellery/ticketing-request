"use client";

import { ArrowRightIcon, BugIcon, FilePlus2Icon, WrenchIcon } from "lucide-react";
import { useState } from "react";

import type { RequestInput } from "@/lib/domain/tickets";

type RequestTypePickerProps = {
  onSelect: (type: RequestInput["type"]) => void;
};

const requestTypes = [
  { type: "new-system" as const, label: "Sistem Baru", description: "Ajukan pembuatan sistem baru untuk mendukung kebutuhan kerja Anda.", icon: FilePlus2Icon },
  { type: "enhancement" as const, label: "Pengembangan Sistem", description: "Ajukan peningkatan atau penyesuaian pada sistem yang sudah digunakan.", icon: WrenchIcon },
  { type: "bug" as const, label: "Lapor Bug", description: "Laporkan kendala atau bug agar dapat segera ditindaklanjuti.", icon: BugIcon },
];

export function RequestTypePicker({ onSelect }: RequestTypePickerProps) {
  const [selectedType, setSelectedType] = useState<RequestInput["type"]>();

  const selectRequestType = (type: RequestInput["type"]) => {
    setSelectedType(type);
    window.setTimeout(() => onSelect(type), 180);
  };

  return (
    <section aria-labelledby="request-type-title" className="relative isolate overflow-hidden border-y document-rule py-7 sm:py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(32rem,1.06fr)] lg:gap-0">
        <div className="px-5 pb-8 sm:px-8 lg:border-r document-rule lg:px-10 lg:pb-0">
          <div className="max-w-xl pt-2 sm:pt-7">
            <h1 id="request-type-title" className="document-title max-w-lg text-balance text-[clamp(3.15rem,6.4vw,6rem)] leading-[0.91] text-foreground">Bagaimana kami dapat membantu?</h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-muted-foreground">Pilih kebutuhan Anda. Form berikutnya hanya meminta informasi yang benar-benar diperlukan oleh tim kami.</p>
          </div>
        </div>

        <div className="px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4 border-b document-rule py-5 sm:py-7">
            <p className="document-kicker">Pilih jenis permintaan</p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div>
            {requestTypes.map(({ type, label, description, icon: Icon }) => {
              const isSelected = selectedType === type;
              return (
                <button key={type} type="button" onClick={() => selectRequestType(type)} aria-pressed={isSelected} disabled={Boolean(selectedType)} className={`group grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 border-b document-rule py-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:pointer-events-none sm:gap-6 sm:py-9 ${isSelected ? "bg-secondary/55" : "hover:bg-secondary/35"}`}>
                  <span className="flex size-12 items-center justify-center rounded-full bg-accent/85 text-primary transition-colors sm:size-14"><Icon aria-hidden="true" className="size-5 sm:size-6" /></span>
                  <span className="min-w-0"><span className="document-title block text-[1.7rem] leading-none sm:text-[2.15rem]">{label}</span><span className="mt-2 block max-w-md text-sm leading-6 text-muted-foreground sm:text-base">{description}</span></span>
                  <span className={`flex size-10 items-center justify-center rounded-full border border-border text-primary transition-all ${isSelected ? "translate-x-1 bg-primary text-primary-foreground" : "group-hover:translate-x-1 group-hover:border-primary"}`}><ArrowRightIcon aria-hidden="true" className="size-4" /></span>
                </button>
              );
            })}
          </div>
          <p className="pb-6 pt-5 text-sm leading-6 text-muted-foreground">Tidak perlu menggunakan istilah teknis. Tim engineer akan melakukan klasifikasi setelah request diterima.</p>
        </div>
      </div>
    </section>
  );
}

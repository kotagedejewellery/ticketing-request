"use client";

import { ArrowLeftIcon, SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { NativeSelectField, TextAreaField, TextField } from "@/components/requester/form-fields";
import { Button } from "@/components/ui/button";
import {
  bugRequestSchema,
  enhancementRequestSchema,
  newSystemRequestSchema,
  URGENCY_LEVELS,
  WORK_IMPACTS,
  type RequestInput,
} from "@/lib/domain/tickets";

type RequestFormProps = {
  type: RequestInput["type"];
  onBack: () => void;
  onSubmit: (request: RequestInput) => Promise<void>;
};

const formDetails = {
  "new-system": {
    title: "Request Sistem Baru",
    description: "Ceritakan kebutuhan Anda dengan bahasa sehari-hari. Tim engineer akan membantu menerjemahkannya ke detail teknis.",
    initialValues: {
      type: "new-system",
      requesterName: "",
      division: "",
      needName: "",
      currentProblem: "",
      expectedOutcome: "",
      users: "",
      urgency: "",
      deadline: "",
      attachmentUrl: "",
    },
    schema: newSystemRequestSchema,
  },
  enhancement: {
    title: "Pengembangan Sistem",
    description: "Jelaskan perubahan yang Anda butuhkan pada sistem yang sudah digunakan.",
    initialValues: {
      type: "enhancement",
      requesterName: "",
      division: "",
      systemName: "",
      requestedChange: "",
      reason: "",
      urgency: "",
      attachmentUrl: "",
    },
    schema: enhancementRequestSchema,
  },
  bug: {
    title: "Error / Bug / Debugging",
    description: "Tidak perlu memahami istilah teknis. Ceritakan apa yang Anda lihat dan dampaknya pada pekerjaan.",
    initialValues: {
      type: "bug",
      reporterName: "",
      division: "",
      affectedSystem: "",
      incident: "",
      since: "",
      workImpact: "",
      attachmentUrl: "",
      additionalNotes: "",
    },
    schema: bugRequestSchema,
  },
} as const;

export function RequestForm({ type, onBack, onSubmit }: RequestFormProps) {
  const details = formDetails[type];
  const [values, setValues] = useState<Record<string, string>>(details.initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [systems, setSystems] = useState<string[]>([]);
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "new-system") return;
    fetch("/api/systems")
      .then(async (response) => response.ok ? response.json() as Promise<{ systems: { name: string }[] }> : { systems: [] })
      .then(({ systems: availableSystems }) => setSystems(availableSystems.map((system) => system.name)))
      .catch(() => setSystems([]));
  }, [type]);

  const updateValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = details.schema.safeParse(values);

    if (!parsed.success) {
      const nextErrors = Object.fromEntries(
        parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]),
      );
      setErrors(nextErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmissionError("");
    setIsSubmitting(true);
    try {
      await onSubmit(parsed.data);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : "Request belum dapat dikirim. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl">
      <Button type="button" variant="ghost" onClick={onBack} className="-ml-2 h-11 rounded-sm px-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
        <ArrowLeftIcon aria-hidden="true" /> Kembali memilih jenis request
      </Button>

      <div className="mt-5 grid gap-5 border-b document-rule pb-7 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="document-kicker">Jenis request</p>
          <h1 className="document-title mt-3 text-balance text-4xl sm:text-5xl">{details.title}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{details.description}</p>
        </div>
        <p className="max-w-52 border-l border-accent bg-muted/60 px-3 py-2 text-sm leading-5 text-muted-foreground sm:text-right">
          Kolom bertanda <span className="font-semibold text-destructive">*</span> wajib diisi
        </p>
      </div>

      <form noValidate onSubmit={submit} className="document-panel mt-7 grid gap-7 rounded-lg p-5 sm:p-8">
        {Object.values(errors).some(Boolean) ? (
          <div ref={errorSummaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 outline-none">
            <p className="font-medium text-destructive">Periksa kembali informasi yang diperlukan.</p>
            <p className="mt-1 text-sm text-destructive/90">Setiap field yang perlu diperbaiki memiliki pesan di bawahnya.</p>
          </div>
        ) : null}
        {submissionError ? <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{submissionError}</div> : null}

        {type === "new-system" ? (
          <NewSystemFields values={values} errors={errors} onChange={updateValue} />
        ) : null}
        {type === "enhancement" ? (
          <EnhancementFields values={values} errors={errors} onChange={updateValue} systems={systems} />
        ) : null}
        {type === "bug" ? <BugFields values={values} errors={errors} onChange={updateValue} systems={systems} /> : null}

        <div className="flex flex-col-reverse gap-3 border-t document-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted-foreground">Pastikan informasi dapat dipahami tanpa detail teknis.</p>
          <Button type="submit" size="lg" className="h-12 w-full px-5 sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim request..." : "Kirim request"} <SendIcon aria-hidden="true" />
          </Button>
        </div>
      </form>
    </section>
  );
}

type FieldsProps = {
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
};

function NewSystemFields({ values, errors, onChange }: FieldsProps) {
  return <>
    <CommonFields values={values} errors={errors} onChange={onChange} nameLabel="Nama" nameKey="requesterName" />
    <TextField id="needName" label="Nama kebutuhan" required value={values.needName} onChange={(value) => onChange("needName", value)} error={errors.needName} placeholder="Contoh: Portal pengajuan cuti" />
    <TextAreaField id="currentProblem" label="Masalah yang sedang terjadi" required value={values.currentProblem} onChange={(value) => onChange("currentProblem", value)} error={errors.currentProblem} placeholder="Ceritakan proses atau kendala yang dialami saat ini." />
    <TextAreaField id="expectedOutcome" label="Apa yang diharapkan" required value={values.expectedOutcome} onChange={(value) => onChange("expectedOutcome", value)} error={errors.expectedOutcome} placeholder="Hasil seperti apa yang Anda harapkan?" />
    <TextField id="users" label="Siapa yang akan menggunakan" required value={values.users} onChange={(value) => onChange("users", value)} error={errors.users} placeholder="Contoh: Seluruh staf operasional" />
    <UrgencyField values={values} errors={errors} onChange={onChange} />
    <TextField id="deadline" label="Deadline" type="date" value={values.deadline} onChange={(value) => onChange("deadline", value)} error={errors.deadline} helper="Opsional, isi bila ada tenggat yang perlu diketahui." />
    <TextField id="attachmentUrl" label="Tautan lampiran" type="url" value={values.attachmentUrl} onChange={(value) => onChange("attachmentUrl", value)} error={errors.attachmentUrl} helper="Opsional. Gunakan tautan file pendukung bila tersedia." placeholder="https://..." />
  </>;
}

function EnhancementFields({ values, errors, onChange, systems }: FieldsProps & { systems: string[] }) {
  return <>
    <CommonFields values={values} errors={errors} onChange={onChange} nameLabel="Nama" nameKey="requesterName" />
    <TextField id="systemName" label="Pilih sistem" required value={values.systemName} onChange={(value) => onChange("systemName", value)} error={errors.systemName} list="existing-systems" placeholder="Pilih atau ketik nama sistem" />
    <datalist id="existing-systems">{systems.map((system) => <option key={system} value={system} />)}</datalist>
    <TextAreaField id="requestedChange" label="Apa yang ingin ditambahkan atau diubah" required value={values.requestedChange} onChange={(value) => onChange("requestedChange", value)} error={errors.requestedChange} placeholder="Jelaskan perubahan yang Anda butuhkan." />
    <TextAreaField id="reason" label="Alasan perubahan" required value={values.reason} onChange={(value) => onChange("reason", value)} error={errors.reason} placeholder="Mengapa perubahan ini diperlukan?" />
    <UrgencyField values={values} errors={errors} onChange={onChange} />
    <TextField id="attachmentUrl" label="Tautan lampiran" type="url" value={values.attachmentUrl} onChange={(value) => onChange("attachmentUrl", value)} error={errors.attachmentUrl} helper="Opsional. Gunakan tautan file pendukung bila tersedia." placeholder="https://..." />
  </>;
}

function BugFields({ values, errors, onChange, systems }: FieldsProps & { systems: string[] }) {
  return <>
    <CommonFields values={values} errors={errors} onChange={onChange} nameLabel="Nama pelapor" nameKey="reporterName" />
    <TextField id="affectedSystem" label="Sistem yang bermasalah" required value={values.affectedSystem} onChange={(value) => onChange("affectedSystem", value)} error={errors.affectedSystem} list="existing-systems" placeholder="Pilih atau ketik nama sistem" />
    <datalist id="existing-systems">{systems.map((system) => <option key={system} value={system} />)}</datalist>
    <TextAreaField id="incident" label="Apa yang terjadi?" required value={values.incident} onChange={(value) => onChange("incident", value)} error={errors.incident} placeholder="Ceritakan apa yang Anda lihat atau alami." />
    <TextField id="since" label="Sejak kapan?" required value={values.since} onChange={(value) => onChange("since", value)} error={errors.since} placeholder="Contoh: Sejak pagi ini, sekitar pukul 08.30" />
    <NativeSelectField id="workImpact" label="Apakah pekerjaan terhenti?" required options={WORK_IMPACTS} value={values.workImpact} onChange={(value) => onChange("workImpact", value)} error={errors.workImpact} />
    <TextField id="attachmentUrl" label="Tautan screenshot / video error" type="url" value={values.attachmentUrl} onChange={(value) => onChange("attachmentUrl", value)} error={errors.attachmentUrl} helper="Opsional, namun sangat membantu bila tersedia." placeholder="https://..." />
    <TextAreaField id="additionalNotes" label="Keterangan tambahan" value={values.additionalNotes} onChange={(value) => onChange("additionalNotes", value)} error={errors.additionalNotes} placeholder="Informasi lain yang mungkin membantu." />
  </>;
}

function CommonFields({ values, errors, onChange, nameLabel, nameKey }: FieldsProps & { nameLabel: string; nameKey: string }) {
  return <div className="grid gap-6 md:grid-cols-2">
    <TextField id={nameKey} label={nameLabel} required value={values[nameKey]} onChange={(value) => onChange(nameKey, value)} error={errors[nameKey]} placeholder="Nama lengkap" />
    <TextField id="division" label="Divisi" required value={values.division} onChange={(value) => onChange("division", value)} error={errors.division} placeholder="Contoh: Keuangan" />
  </div>;
}

function UrgencyField({ values, errors, onChange }: FieldsProps) {
  return <NativeSelectField id="urgency" label="Tingkat urgensi" required options={URGENCY_LEVELS} value={values.urgency} onChange={(value) => onChange("urgency", value)} error={errors.urgency} helper="Pilih berdasarkan dampak dan kebutuhan waktu dari sisi Anda." />;
}

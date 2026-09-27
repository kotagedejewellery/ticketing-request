import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helper?: string;
  required?: boolean;
  type?: "date" | "text" | "url";
  placeholder?: string;
  list?: string;
};

function FieldNote({ id, error, helper }: Pick<FieldProps, "id" | "error" | "helper">) {
  if (error) {
    return (
      <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
        {error}
      </p>
    );
  }

  return helper ? <p className="text-sm text-muted-foreground">{helper}</p> : null;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  required,
  type = "text",
  placeholder,
  list,
}: FieldProps) {
  return (
    <div className="grid gap-2.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <Input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        list={list}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
        className="h-12 rounded-xl bg-background px-3 text-base shadow-none"
      />
      <FieldNote error={error} helper={helper} id={id} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  required,
  placeholder,
}: Omit<FieldProps, "type" | "list">) {
  return (
    <div className="grid gap-2.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <Textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
        className="min-h-32 resize-y rounded-xl bg-background px-3 py-3 text-base shadow-none"
      />
      <FieldNote error={error} helper={helper} id={id} />
    </div>
  );
}

type SelectFieldProps = Omit<FieldProps, "type" | "list"> & {
  options: readonly string[];
};

export function NativeSelectField({
  id,
  label,
  value,
  onChange,
  error,
  helper,
  required,
  options,
}: SelectFieldProps) {
  return (
    <div className="grid gap-2.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <select
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className="h-12 rounded-xl border border-input bg-background px-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">Pilih salah satu</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldNote error={error} helper={helper} id={id} />
    </div>
  );
}

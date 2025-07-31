import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { DataTableColumnConfig } from "@/types/data-table";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "../utils/books";
import Badge from "@/lib/Badge/Badge";
import InputRate from "@/lib/InputRate/InputRate";
import InputText from "@/lib/InputText/InputText";
import InputLov from "@/lib/InputLov/InputLov";
import type { BookFormFields } from "../hooks/useBookForm";
import { formatDate } from "@/utils/date";

interface CreateBookColumnsParams {
  control: Control<BookFormFields>;
  authors?: { id: string; name: string }[];
  genres?: { id: string; name: string }[];
  setAuthorSearch: (search: string) => void;
  setGenresSearch: (search: string) => void;
  addAuthor: (name: string) => Promise<void>;
  addGenre: (name: string) => Promise<void>;
}

export const createBookColumns = ({
  control,
  authors,
  genres,
  setAuthorSearch,
  setGenresSearch,
  addAuthor,
  addGenre,
}: CreateBookColumnsParams): DataTableColumnConfig[] => [
  {
    key: "title",
    header: "Title",
    width: "w-64",
    className: "font-medium",
    renderDisplay: (value: string) => value,
    renderInput: () => (
      <Controller
        name="title"
        control={control as Control<BookFormFields>}
        render={({ field, fieldState }) => (
          <InputText
            value={field.value || ""}
            onChange={field.onChange}
            size="sm"
            placeholder="Enter title"
            className={fieldState.error ? "border-red-300" : ""}
          />
        )}
      />
    ),
  },
  {
    key: "authorId",
    header: "Author",
    width: "w-40",
    renderDisplay: (_value: string, item: any) => item.author?.name || "Unknown",
    renderInput: (_value: string, _error?: string, item?: any) => (
      <Controller
        name="authorId"
        control={control as Control<BookFormFields>}
        render={({ field }) => {
          let currentAuthor = field.value ? authors?.find(a => a.id === field.value) : null;
          if (!currentAuthor && item?.author && item.author.id === field.value) {
            currentAuthor = item.author;
          }

          return (
            <InputLov
              value={currentAuthor ? { label: currentAuthor.name, value: currentAuthor.id } : null}
              onChange={option => field.onChange(option?.value || "")}
              loadOptions={async inputValue => {
                setAuthorSearch(inputValue);
                return (authors ?? []).map((a: { name: string; id: string }) => ({
                  label: a.name,
                  value: a.id,
                }));
              }}
              onCreateOption={async (name: string) => {
                await addAuthor(name);
                field.onChange(name);
              }}
              placeholder="Select author"
            />
          );
        }}
      />
    ),
  },
  {
    key: "genreId",
    header: "Genre",
    width: "w-32",
    renderDisplay: (_value: string, item: any) => item.genre?.name || "Unknown",
    renderInput: (_value: string, _error?: string, item?: any) => (
      <Controller
        name="genreId"
        control={control as Control<BookFormFields>}
        render={({ field }) => {
          let currentGenre = field.value ? genres?.find(g => g.id === field.value) : null;
          if (!currentGenre && item?.genre && item.genre.id === field.value) {
            currentGenre = item.genre;
          }

          return (
            <InputLov
              value={currentGenre ? { label: currentGenre.name, value: currentGenre.id } : null}
              onChange={option => field.onChange(option?.value || "")}
              loadOptions={async inputValue => {
                setGenresSearch(inputValue);
                return (genres ?? []).map((g: { name: string; id: string }) => ({
                  label: g.name,
                  value: g.id,
                }));
              }}
              onCreateOption={async (name: string) => {
                await addGenre(name);
                field.onChange(name);
              }}
              placeholder="Select genre"
            />
          );
        }}
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "w-32",
    renderDisplay: (value: string) => (
      <Badge variant={getBadgeVariantByStatus(value)}>{getBadgeTextByStatus(value)}</Badge>
    ),
    renderInput: () => (
      <Controller
        name="status"
        control={control as Control<BookFormFields>}
        render={({ field, fieldState }) => {
          const statusOptions = ["completed", "reading", "not_started", "dropped", "on_hold"];
          return (
            <select
              value={field.value || ""}
              onChange={field.onChange}
              className={`w-full border ${fieldState.error ? "border-red-300" : "border-amber-300"} rounded-lg h-11 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors duration-200 bg-white`}
              style={{ minHeight: 44 }}
            >
              <option value="">Select status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {getBadgeTextByStatus(status)}
                </option>
              ))}
            </select>
          );
        }}
      />
    ),
  },
  {
    key: "rating",
    header: "Rating",
    width: "w-40 p-2",
    editingStyle: "mt-[20px] mb-[30px]",
    renderDisplay: (value: number) =>
      value && <InputRate value={value} editable={false} size="xs" />,
    renderInput: () => (
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <InputRate
            value={field.value || 0}
            onChange={field.onChange}
            editable={true}
            className="mt-[-10px]"
            size="xs"
          />
        )}
      />
    ),
  },
  {
    key: "dateAdded",
    header: "Date Added",
    width: "w-24",
    renderDisplay: (value: string) => formatDate(value),
    renderInput: () => (
      <Controller
        name="dateAdded"
        control={control as Control<BookFormFields>}
        render={({ field }) => (
          <InputText value={formatDate(field.value) || ""} size="sm" disabled />
        )}
      />
    ),
  },
];

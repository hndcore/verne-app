import useBooks from "@/hooks/api/useBooks";
import Button from "@/lib/Button/Button";
import InputRate from "@/lib/InputRate/InputRate";
import Badge from "@/lib/Badge/Badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { getBadgeTextByStatus, getBadgeVariantByStatus } from "@/utils/books";

const BookTable: React.FC = () => {
  const { data: books, isLoading, isError } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <section className="border border-[#e0dad1] shadow-sm rounded-lg bg-[#f7f6f2]">
      <ToastContainer />
      <header className="flex flex-col space-y-1.5 p-6 flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Your Literary Collection</h1>
        <Button
          loading={isLoading}
          variant="primary"
          size="md"
          onClick={() => toast.success("Add Book button clicked!", { theme: "colored" })}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Book
        </Button>
      </header>

      <div className="p-6 pt-0">
        <div className="border border-[#e0dad1]">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b border-[#e0dad1] bg-[#f2f0eb]">
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Title
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Author
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Genre
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Rating
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold">
                    Date Added
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-slate-500 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {(books ?? []).length === 0 ? (
                  <tr className="border-b border-[#e0dad1]">
                    <td colSpan={7} className="p-4 align-middle text-center py-8 text-stone-500">
                      No books in your collection yet. Add your first book to get started!
                    </td>
                  </tr>
                ) : (
                  (books ?? []).map((book: any) => (
                    <tr key={book.id} className="border-b border-[#e0dad1]">
                      <td className="p-4 align-middle font-medium">{book.title}</td>
                      <td className="p-4 align-middle">{book.author.name}</td>
                      <td className="p-4 align-middle">{book.genre.name}</td>
                      <td className="p-4 align-middle">
                        {
                          <Badge variant={getBadgeVariantByStatus(book.status)}>
                            {getBadgeTextByStatus(book.status)}
                          </Badge>
                        }
                      </td>
                      <td className="p-4 align-middle">
                        {book.rating && (
                          <InputRate value={book.rating} editable={false} size="sm" />
                        )}
                      </td>
                      <td className="p-4 align-middle">{book.dateAdded}</td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            className="hover:bg-stone-300 text-stone-800"
                            size="sm"
                            onClick={() => {}}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="hover:bg-red-100 text-red-800"
                            size="sm"
                            onClick={() => {}}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookTable;

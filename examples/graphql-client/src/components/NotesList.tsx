// Hooks
import { useNotesQuery } from "../hooks/useNotesQuery";

// Components
import { Label } from "../components/Label";

export function NotesList({
  selectedCategory,
}: {
  selectedCategory: string | undefined;
}) {
  const { notes, loading } = useNotesQuery(
    selectedCategory === "ALL_CATEGORIES" ? undefined : selectedCategory
  );

  return (
    <div className="flex flex-col max-w-xl">
      <span className="uppercase tracking-wide text-gray-700 text-lg font-bold mb-2">
        Notes
      </span>

      {loading ? (
        <span className="text-md">Loading...</span>
      ) : (
        <ul>
          {notes?.map((note) => (
            <li key={note.id}>
              <div className="flex flex-col px-2 py-2 border border-gray-500 bg-gray-50 hover:bg-gray-100 rounded">
                <span className="text-lg">{note.content}</span>
                <span className="text-gray-600">
                  <b>Categories: </b>
                  {note.categories.map((category) => category.name).join(", ")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Libraries
import { useState } from "react";

// Components
import { Header } from "./components/Header";
import { NotesList } from "./components/NotesList";
import { NoteCreationModal } from "./components/NoteCreation";

function App() {
  const [showCreationModal, setShowCreationModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "ALL_CATEGORIES"
  );

  return (
    <>
      <div className="px-4 pt-2">
        <header>
          <h1 className="text-xl font-bold">Notes App</h1>
        </header>

        <main className="flex flex-col space-y-5">
          <Header
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            openCreationModal={() => setShowCreationModal(true)}
          />
          <NotesList selectedCategory={selectedCategory} />
        </main>
      </div>

      <NoteCreationModal
        isOpen={showCreationModal}
        onClose={() => setShowCreationModal(false)}
        onSubmit={() => setShowCreationModal(false)}
      />
    </>
  );
}

export default App;

// Hooks
import { useCategoriesQuery } from "../hooks/useCategoriesQuery";

// Components
import { Button } from "baseui/button";
import { Select } from "baseui/select";

export function Header({
  selectedCategory,
  setSelectedCategory,
  openCreationModal,
}: {
  selectedCategory: string | undefined;
  setSelectedCategory: (val: string | undefined) => void;
  openCreationModal: () => void;
}) {
  const { categories } = useCategoriesQuery();
  const options = [
    { id: "ALL_CATEGORIES", name: "All Categories" },
    ...(categories ?? []),
  ];
  const value = options.filter((option) => option.id === selectedCategory);

  return (
    <div className="flex max-w-lg mt-5">
      <div className="mr-4 flex-1">
        <Select
          options={options}
          value={value}
          placeholder="Select Category"
          onChange={(params) =>
            setSelectedCategory(params.option?.id as string | undefined)
          }
          valueKey="id"
          labelKey="name"
          clearable={false}
        />
      </div>

      <Button onClick={openCreationModal}>Add a Note</Button>
    </div>
  );
}

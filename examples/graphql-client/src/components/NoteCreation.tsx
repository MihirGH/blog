// Libraries
import React, { useState } from "react";

// Hooks
import { Category, useCategoriesQuery } from "../hooks/useCategoriesQuery";

// Components
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Select } from "baseui/select";
import { FormControl } from "baseui/form-control";
import { Modal, ModalBody, ModalFooter } from "baseui/modal";

const NoteCreation = () => {
  const [content, setContent] = useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    Category[] | undefined
  >();

  const { categories, loading } = useCategoriesQuery();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <FormControl label={() => "Content"}>
          <Input
            value={content}
            placeholder="Add Content"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setContent(event.target.value)
            }
          />
        </FormControl>
      </div>

      <div className="flex flex-col">
        <FormControl label={() => "Categories"}>
          <Select
            value={selectedCategory}
            onChange={(params) =>
              setSelectedCategory(params.value as Category[] | undefined)
            }
            multi
            options={categories ?? []}
            valueKey="id"
            labelKey="name"
            isLoading={loading}
            filterOutSelected={false}
            closeOnSelect={false}
          />
        </FormControl>
      </div>
    </div>
  );
};

export const NoteCreationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => (
  <Modal isOpen={isOpen} size="default" onClose={onClose}>
    <ModalBody>
      <NoteCreation />
    </ModalBody>

    <ModalFooter>
      <div className="self-end space-x-3">
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </ModalFooter>
  </Modal>
);

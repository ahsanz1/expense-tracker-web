"use client";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";

interface Category {
  name: string;
}

interface CategorySearchInputProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  required?: boolean;
}

function CategorySearchInput({
  categories,
  value,
  onChange,
  id,
  required = false,
}: CategorySearchInputProps) {
  const [query, setQuery] = useState("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox
      value={value}
      onChange={(selectedValue) => {
        onChange(selectedValue);
        setQuery("");
      }}
    >
      <div className="relative">
        <div className="relative w-full">
          <Combobox.Input
            id={id}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
            displayValue={(category: string) => category || ""}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder="Search or select category"
            required={required}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {filteredCategories.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                No category found.
              </div>
            ) : (
              filteredCategories.map((category) => (
                <Combobox.Option
                  key={category.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-100 text-black" : "text-gray-900"
                    }`
                  }
                  value={category.name}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-black" : "text-black"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default CategorySearchInput;


"use client";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";

interface Category {
  name: string;
}

export default function CategoryMultiSelect({
  categories,
  value,
  onChange,
  id,
  placeholder = "Search and select categories",
  inputClassName = "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black",
}: {
  categories: Category[];
  value: string[];
  onChange: (next: string[]) => void;
  id?: string;
  placeholder?: string;
  inputClassName?: string;
}) {
  const [query, setQuery] = useState("");
  const selected = new Set(value);

  const filtered =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const removeCategory = (name: string) => {
    onChange(value.filter((item) => item !== name));
  };

  return (
    <div className="space-y-2">
      <Combobox multiple value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full">
            <Combobox.Input
              id={id}
              name="search-category-multi"
              className={inputClassName}
              displayValue={() => ""}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                value.length > 0
                  ? `${value.length} selected — search to add more`
                  : placeholder
              }
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              data-1p-ignore
              data-lpignore="true"
              data-form-type="other"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              static={false}
              className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {filtered.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  No category found.
                </div>
              ) : (
                filtered.map((category) => (
                  <Combobox.Option
                    key={category.name}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray-100 text-black" : "text-gray-900"
                      }`
                    }
                    value={category.name}
                  >
                    {({ selected: isSelected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            isSelected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category.name}
                        </span>
                        {isSelected || selected.has(category.name) ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
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

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-black"
            >
              {name}
              <button
                type="button"
                onClick={() => removeCategory(name)}
                className="rounded-full p-0.5 text-gray-500 hover:bg-gray-100 hover:text-black"
                aria-label={`Remove ${name}`}
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

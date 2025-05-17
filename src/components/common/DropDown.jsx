import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropDown({ value, options, onChange }) {
  // get current selected name
  const selectedName = options.find((opt) => opt.id === value)?.name || "";

  return (
    <Menu as="div" className="relative text-center w-70">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
          {selectedName}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 size-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="relative z-10 mt-2 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
      >
        <div className="py-1">
          {options.map((option) => (
            <MenuItem key={option.id}>
              {({ active }) => (
                <button
                  onClick={() => onChange(option.id)}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    ${active ? "bg-gray-100 text-blue-500" : "text-gray-700"}
                    ${option.id === value ? "font-bold" : ""}

                  `}
                >
                  {option.name}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}

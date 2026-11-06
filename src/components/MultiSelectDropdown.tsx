import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search, Plus } from 'lucide-react';

interface MultiSelectDropdownProps {
  label: string;
  hint?: string;
  options: string[];
  selected: string[];
  onChange: (nextSelected: string[]) => void;
  maxSelections?: number; // e.g. 3 for Country, Ancestry, Major on Profile; undefined for unlimited in Matchmaking
  placeholder?: string;
  maxReachedText?: string;
  renderBadgePrefix?: (option: string) => React.ReactNode;
  onAddCustomOption?: (newOption: string) => void;
  addCustomLabel?: string;
  addCustomPlaceholder?: string;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  hint,
  options,
  selected,
  onChange,
  maxSelections,
  placeholder = 'Select options...',
  maxReachedText = 'Max 3 selected',
  renderBadgePrefix,
  onAddCustomOption,
  addCustomLabel = '+ Add Custom',
  addCustomPlaceholder = 'Type custom option...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.trim().toLowerCase())
  );

  const isMaxReached = maxSelections !== undefined && selected.length >= maxSelections;

  const toggleOption = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(item => item !== opt));
    } else {
      if (isMaxReached) return;
      onChange([...selected, opt]);
    }
  };

  const handleRemovePill = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== opt));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customValue.trim();
    if (!trimmed) return;
    if (onAddCustomOption) {
      onAddCustomOption(trimmed);
    }
    if (!selected.includes(trimmed) && (!maxSelections || selected.length < maxSelections)) {
      onChange([...selected, trimmed]);
    }
    setCustomValue('');
    setShowCustomInput(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-semibold text-[#1E2A24] flex items-center gap-2">
          <span>{label}</span>
          {maxSelections ? (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isMaxReached
                  ? 'bg-[#D96B43]/15 text-[#D96B43]'
                  : 'bg-[#006747]/10 text-[#006747]'
              }`}
            >
              {selected.length}/{maxSelections}
            </span>
          ) : (
            selected.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#006747]/10 text-[#006747]">
                {selected.length}
              </span>
            )
          )}
        </label>
        {onAddCustomOption && (
          <button
            type="button"
            onClick={() => setShowCustomInput(prev => !prev)}
            className="text-xs font-semibold text-[#006747] hover:text-[#004E36] bg-[#E6F2EE] hover:bg-[#d2e9e1] px-2.5 py-1 rounded-full transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            {addCustomLabel.replace(/^\+\s*/, '')}
          </button>
        )}
      </div>

      {hint && <p className="text-xs text-[#5A6B62] mb-2">{hint}</p>}

      {showCustomInput && (
        <form onSubmit={handleAddCustom} className="mb-2 flex gap-2">
          <input
            type="text"
            value={customValue}
            onChange={e => setCustomValue(e.target.value)}
            placeholder={addCustomPlaceholder}
            className="flex-1 text-sm px-3 py-1.5 rounded-xl border border-[#006747]/30 bg-white text-[#1E2A24] focus:outline-none focus:ring-2 focus:ring-[#006747]/30"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-[#006747] text-white text-xs font-semibold hover:bg-[#004E36] transition"
          >
            +
          </button>
        </form>
      )}

      {/* Trigger box */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(prev => !prev)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(prev => !prev);
          }
        }}
        className={`min-h-[46px] w-full px-3.5 py-2 rounded-2xl border bg-white text-left transition flex items-center justify-between gap-2 cursor-pointer ${
          isOpen
            ? 'border-[#006747] ring-2 ring-[#006747]/15 shadow-sm'
            : 'border-[#E2DDD2] hover:border-[#006747]/50'
        }`}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {selected.length === 0 ? (
            <span className="text-sm text-[#5A6B62]/80">{placeholder}</span>
          ) : (
            selected.map(item => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#E6F2EE] text-[#006747] border border-[#006747]/15"
              >
                {renderBadgePrefix && <span>{renderBadgePrefix(item)}</span>}
                <span>{item}</span>
                <button
                  type="button"
                  onClick={e => handleRemovePill(item, e)}
                  className="hover:bg-[#006747]/15 rounded-full p-0.5 transition"
                  aria-label={`Remove ${item}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#5A6B62] shrink-0 transition-transform ${
            isOpen ? 'rotate-180 text-[#006747]' : ''
          }`}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-40 mt-2 w-full rounded-2xl bg-white border border-[#E2DDD2] shadow-xl overflow-hidden animate-in fade-in duration-150">
          <div className="p-2.5 border-b border-[#F2ECE1] bg-[#FAF7F2] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#5A6B62]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search options..."
              className="w-full bg-transparent text-sm text-[#1E2A24] placeholder-[#5A6B62]/70 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-xs text-[#5A6B62] hover:text-[#1E2A24]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isMaxReached && (
            <div className="px-3 py-1.5 bg-[#FCEEE9] text-[#D96B43] text-xs font-medium flex items-center justify-between">
              <span>{maxReachedText}</span>
              <span>({selected.length}/{maxSelections})</span>
            </div>
          )}

          <div className="max-h-60 overflow-y-auto divide-y divide-[#FAF7F2]">
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#5A6B62]">
                No matching option found.
              </div>
            ) : (
              filteredOptions.map(option => {
                const isSelected = selected.includes(option);
                const disabled = !isSelected && isMaxReached;
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleOption(option)}
                    className={`w-full px-3.5 py-2.5 text-left text-sm flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-[#E6F2EE]/70 text-[#006747] font-semibold'
                        : disabled
                        ? 'opacity-45 cursor-not-allowed text-[#5A6B62]'
                        : 'hover:bg-[#FAF7F2] text-[#1E2A24]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {renderBadgePrefix && <span>{renderBadgePrefix(option)}</span>}
                      <span>{option}</span>
                    </span>
                    <span
                      className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                        isSelected
                          ? 'bg-[#006747] border-[#006747] text-white'
                          : 'border-[#CFC493]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import './CustomMultiSelect.css';

/**
 * Componente de Select com múltiplas seleções e checkboxes.
 * @param {Array} options - Array de objetos, cada um com 'value' e 'label'.
 * @param {Array} selectedValues - Array dos valores ('value') atualmente selecionados.
 * @param {Function} onChange - Função chamada quando a seleção muda.
 * @param {String} placeholder - Texto a ser exibido quando nada está selecionado.
 * @param {Number} limit - Número máximo de seleções permitidas.
 */
function CustomMultiSelect({ options, selectedValues, onChange, placeholder = "Selecione...", limit = 3 }) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleOptionClick = (value) => {
        const newSelectedValues = [...selectedValues];
        const currentIndex = newSelectedValues.indexOf(value);

        if (currentIndex > -1) {
            newSelectedValues.splice(currentIndex, 1);
        } else {
            if (newSelectedValues.length < limit) {
                newSelectedValues.push(value);
            }
        }
        onChange(newSelectedValues);
    };

    const isChecked = (value) => selectedValues.includes(value);
    const isDisabled = (value) => !isChecked(value) && selectedValues.length >= limit;

    return (
        <div className="custom-multiselect" ref={wrapperRef}>
            <div className={`select-display ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {selectedValues.length > 0 ? (
                    <span className="selected-items-text">{selectedValues.join(', ')}</span>
                ) : (
                    <span className="placeholder-text">{placeholder}</span>
                )}
            </div>
            {isOpen && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li 
                            key={option.value} 
                            className={`option-item ${isDisabled(option.value) ? 'disabled' : ''}`}
                            onClick={() => !isDisabled(option.value) && handleOptionClick(option.value)}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked(option.value)}
                                disabled={isDisabled(option.value)}
                                readOnly
                            />
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomMultiSelect;
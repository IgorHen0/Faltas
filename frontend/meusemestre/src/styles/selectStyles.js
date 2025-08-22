export const customSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderColor: state.isFocused ? '#eb8729ff' : '#ccc',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(74, 144, 226, 0.2)' : 'none',
        borderRadius: '8px',
        padding: '2px 4px',
        minHeight: '38px',
        '&:hover': { borderColor: '#eb8729ff' },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#888',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#f0f8ff' : 'white',
        color: '#333',
        cursor: 'pointer',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#333',
    }),
};
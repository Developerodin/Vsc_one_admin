"use client"
import Link from 'next/link'
import React from 'react'

interface TableHeader {
    key: string;
    label: string;
    className?: string;
}

interface TableAction {
    icon: string;
    className: string;
    onClick?: () => void;
    href?: string;
}

interface TableRow {
    [key: string]: any;
    actions?: TableAction[];
}

interface DataTableProps {
    headers: TableHeader[];
    data: TableRow[];
    className?: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    onItemsPerPageChange?: (size: number) => void;
    onSearch?: (query: string) => void;
    searchQuery?: string;
    onSelectionChange?: (selectedIds: string[]) => void;
    selectedIds?: string[];
    idField?: string;
    showCheckbox?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ 
    headers, 
    data, 
    className = '',
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    onItemsPerPageChange,
    onSearch,
    searchQuery = '',
    onSelectionChange,
    selectedIds = [],
    idField = 'id',
    showCheckbox = false
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        if (onItemsPerPageChange) {
            onItemsPerPageChange(newSize);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onSelectionChange) {
            if (e.target.checked) {
                onSelectionChange(data.map(item => item[idField]));
            } else {
                onSelectionChange([]);
            }
        }
    };

    const handleSelectRow = (id: string) => {
        if (onSelectionChange) {
            if (selectedIds.includes(id)) {
                onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
            } else {
                onSelectionChange([...selectedIds, id]);
            }
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        items.push(
            <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
            </li>
        );

        // First page
        if (startPage > 1) {
            items.push(
                <li key="1" className="page-item">
                    <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
                </li>
            );
            if (startPage > 2) {
                items.push(
                    <li key="start-ellipsis" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button 
                        className={`page-link ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <li key="end-ellipsis" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
            items.push(
                <li key={totalPages} className="page-item">
                    <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                </li>
            );
        }

        // Next button
        items.push(
            <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                    className="page-link" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </li>
        );

        return items;
    };

    const startItem = ((currentPage - 1) * itemsPerPage) + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="box">
            <div className="box-header justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm">Show</span>
                    <select
                        className="ti-form-select form-select-sm w-auto"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-sm">entries</span>
                </div>
                <div className="flex flex-wrap">
                    <div className="me-3 my-1">
                        <input
                            className="ti-form-control form-control-sm" 
                            type="text"
                            placeholder="Search Here" 
                            value={searchQuery}
                            onChange={handleSearch}
                            aria-label="Search"
                        />
                    </div>
                </div>
            </div>
            <div className="box-body">
                <div className="table-responsive">
                    <table className="table table-hover whitespace-nowrap table-bordered min-w-full">
                        <thead>
                            <tr>
                                {showCheckbox && (
                                    <th scope="col" className="text-start">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            checked={selectedIds.length === data.length}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                )}
                                {headers.map((header) => (
                                    <th key={header.key} scope="col" className={`text-start ${header.className || ''}`}>
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className="border-t border-inherit border-solid hover:bg-gray-100 dark:hover:bg-light dark:border-defaultborder/10">
                                    {showCheckbox && (
                                        <td className="text-start">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={selectedIds.includes(row[idField])}
                                                onChange={() => handleSelectRow(row[idField])}
                                            />
                                        </td>
                                    )}
                                    {headers.map((header) => (
                                        <td key={header.key} className={`text-start ${header.className || ''}`}>
                                            {header.key === 'actions' && row.actions ? (
                                                <div className="hstack flex gap-3 text-[.9375rem]">
                                                    {row.actions.map((action, actionIndex) => (
                                                        action.href ? (
                                                            <Link
                                                                key={actionIndex}
                                                                aria-label="anchor"
                                                                href={action.href}
                                                                className={`ti-btn ti-btn-sm ${action.className} !rounded-full`}
                                                                onClick={action.onClick}
                                                            >
                                                                <i className={action.icon}></i>
                                                            </Link>
                                                        ) : (
                                                            <button
                                                                key={actionIndex}
                                                                className={`ti-btn ti-btn-sm ${action.className} !rounded-full`}
                                                                onClick={action.onClick}
                                                            >
                                                                <i className={action.icon}></i>
                                                            </button>
                                                        )
                                                    ))}
                                                </div>
                                            ) : (
                                                row[header.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="box-footer">
                <div className="sm:flex items-center">
                    <div className="dark:text-defaulttextcolor/70">
                        Showing {startItem} to {endItem} of {totalItems} Entries
                    </div>
                    <div className="ms-auto">
                        <nav aria-label="Page navigation" className="pagination-style-4">
                            <ul className="ti-pagination mb-0">
                                {renderPaginationItems()}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataTable 
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
}

const DataTable: React.FC<DataTableProps> = ({ headers, data, className = '' }) => {
    return (
        <div className="table-responsive">
            <table className={`table whitespace-nowrap min-w-full ${className}`}>
                <thead className="bg-primary/10">
                    <tr className="border-b border-primary/10">
                        {headers.map((header, index) => (
                            <th 
                                key={index} 
                                scope="col" 
                                className={`text-start ${header.className || ''}`}
                            >
                                {header.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-primary/10">
                            {headers.map((header, colIndex) => (
                                <td key={colIndex} className={`text-start ${header.className || ''}`}>
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
    )
}

export default DataTable 
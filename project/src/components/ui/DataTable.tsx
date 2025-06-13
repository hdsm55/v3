import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Input } from './Input';

export interface Column<T> {
  /**
   * Unique identifier for the column
   */
  id: string;
  
  /**
   * Header text for the column
   */
  header: React.ReactNode;
  
  /**
   * Function to access the cell value
   */
  accessor: (row: T) => React.ReactNode;
  
  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
  
  /**
   * Whether the column is filterable
   */
  filterable?: boolean;
  
  /**
   * Custom cell renderer
   */
  cell?: (value: any, row: T) => React.ReactNode;
  
  /**
   * Custom header renderer
   */
  headerCell?: (column: Column<T>) => React.ReactNode;
  
  /**
   * CSS class for the column
   */
  className?: string;
  
  /**
   * Width of the column
   */
  width?: string;
}

export interface DataTableProps<T> {
  /**
   * Data to display in the table
   */
  data: T[];
  
  /**
   * Column definitions
   */
  columns: Column<T>[];
  
  /**
   * Whether to show the search input
   */
  searchable?: boolean;
  
  /**
   * Function to filter rows based on search input
   */
  searchFunction?: (row: T, searchTerm: string) => boolean;
  
  /**
   * Whether to show pagination
   */
  pagination?: boolean;
  
  /**
   * Number of rows per page
   */
  pageSize?: number;
  
  /**
   * Whether to show the page size selector
   */
  pageSizeOptions?: number[];
  
  /**
   * Whether to show the table header
   */
  showHeader?: boolean;
  
  /**
   * Whether to show borders
   */
  bordered?: boolean;
  
  /**
   * Whether to show striped rows
   */
  striped?: boolean;
  
  /**
   * Whether to highlight rows on hover
   */
  hover?: boolean;
  
  /**
   * Whether the table is loading
   */
  isLoading?: boolean;
  
  /**
   * Loading text
   */
  loadingText?: string;
  
  /**
   * Text to display when there is no data
   */
  noDataText?: string;
  
  /**
   * CSS class for the table
   */
  className?: string;
  
  /**
   * CSS class for the table container
   */
  containerClassName?: string;
  
  /**
   * Whether the table is compact
   */
  compact?: boolean;
  
  /**
   * Function to handle row click
   */
  onRowClick?: (row: T) => void;
  
  /**
   * Function to get a unique key for each row
   */
  getRowKey?: (row: T) => string | number;
}

/**
 * DataTable component for displaying tabular data
 */
export function DataTable<T>({
  data,
  columns,
  searchable = false,
  searchFunction,
  pagination = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  showHeader = true,
  bordered = true,
  striped = true,
  hover = true,
  isLoading = false,
  loadingText = 'Loading...',
  noDataText = 'No data available',
  className,
  containerClassName,
  compact = false,
  onRowClick,
  getRowKey,
}: DataTableProps<T>) {
  // State for sorting
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for searching
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  // Default search function if not provided
  const defaultSearchFunction = (row: T, term: string) => {
    return Object.values(row as Record<string, any>).some(
      value => String(value).toLowerCase().includes(term.toLowerCase())
    );
  };

  // Filter data based on search term
  const filteredData = searchTerm
    ? data.filter(row => (searchFunction || defaultSearchFunction)(row, searchTerm))
    : data;

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[sortColumn];
      const bValue = (b as any)[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    : sortedData;

  // Total pages
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  // Handle sort
  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Get sort icon
  const getSortIcon = (columnId: string) => {
    if (sortColumn !== columnId) return <ChevronsUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
  };

  // Get row key
  const getRowKeyValue = (row: T, index: number) => {
    if (getRowKey) return getRowKey(row);
    return index;
  };

  return (
    <div className={cn('w-full', containerClassName)}>
      {/* Search and pagination controls */}
      {(searchable || pagination) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          {searchable && (
            <div className="w-full sm:w-auto">
              <Input
                leftIcon={<Search className="w-4 h-4" />}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="max-w-xs"
                aria-label="Search"
              />
            </div>
          )}
          
          {pagination && (
            <div className="flex items-center gap-2 text-sm">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="border border-gray-300 rounded-md p-1"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className={cn(
          'w-full border-collapse',
          bordered ? 'border border-gray-200' : '',
          compact ? 'text-sm' : 'text-base',
          className
        )}>
          {showHeader && (
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={cn(
                      'px-4 py-3 text-left font-semibold text-gray-700',
                      bordered ? 'border-b border-gray-200' : '',
                      column.width ? column.width : '',
                      column.className
                    )}
                    style={{ width: column.width }}
                  >
                    {column.headerCell ? (
                      column.headerCell(column)
                    ) : column.sortable ? (
                      <button
                        className="flex items-center focus:outline-none"
                        onClick={() => handleSort(column.id)}
                        aria-label={`Sort by ${column.header}`}
                      >
                        {column.header}
                        {getSortIcon(column.id)}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {loadingText}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {noDataText}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={getRowKeyValue(row, rowIndex)}
                  className={cn(
                    striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white',
                    hover ? 'hover:bg-gray-100 transition-colors' : '',
                    onRowClick ? 'cursor-pointer' : ''
                  )}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <td
                      key={`${getRowKeyValue(row, rowIndex)}-${column.id}`}
                      className={cn(
                        'px-4 py-3',
                        bordered ? 'border-b border-gray-200' : '',
                        column.className
                      )}
                    >
                      {column.cell
                        ? column.cell(column.accessor(row), row)
                        : column.accessor(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Prev
            </button>
            
            {/* Page numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={cn(
                      'px-3 py-1 rounded border',
                      currentPage === pageNum
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300'
                    )}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
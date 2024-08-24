import Link from 'next/link';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    category?: string;
    search?: string;
}

export default function Pagination({ currentPage, totalPages, category, search }: PaginationProps) {
    const getPageUrl = (pageNumber: number) => {
        let url = `?page=${pageNumber}`;
        if (category) url += `&category=${category}`;
        if (search) url += `&search=${search}`;
        return url;
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            {currentPage > 1 && (
                <Link href={getPageUrl(currentPage - 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Previous
                </Link>
            )}
            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link href={getPageUrl(currentPage + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Next
                </Link>
            )}
        </div>
    );
}
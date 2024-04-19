import React, { useState } from 'react';
import { Table } from 'antd';
import { IMovie } from '../../interfaces/Movie';
import { fetchWinnersByYearSearchRepository } from '../../repositories/WinnersByYearSearchRepository';
import { SearchOutlined } from '@ant-design/icons';

interface TablePaginationConfig {
    current: number;
    pageSize: number;
    total: number;
}

const WinnersByYearSearch: React.FC = () => {
    const [year, setYear] = useState<string>('');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchMovies = async () => {
        try {
            setMovies([]);

            if (year.length !== 4 || !/^\d{4}$/.test(year)) return;

            setLoading(true);

            const { current, pageSize } = pagination;

            const { content, totalElements } =
                await fetchWinnersByYearSearchRepository({
                    page: current,
                    pageSize,
                    year,
                    winner: true,
                });

            setMovies(content);
            setPagination((prev) => ({
                ...prev,
                total: totalElements,
            }));
        } catch (error) {
            console.error('Error fetching winners by year:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a: IMovie, b: IMovie) => Number(a.id) - Number(b.id),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a: IMovie, b: IMovie) => a.year - b.year,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title),
        },
    ];

    const searchByYear = (year: string) => {
        setPagination({
            current: 1,
            pageSize: 5,
            total: 0,
        });
        setYear(year);
    };

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">
                List movie winners by year
            </h2>
            {error ? (
                <p
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    role="alert"
                >
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </p>
            ) : (
                <>
                    <div className="mb-4 flex">
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => searchByYear(e.target.value)}
                            placeholder="Search by year"
                            className="border p-2 rounded flex-1 text-[#fff] bg-[#3b3b3b]"
                            style={{ minWidth: '20px' }}
                        />
                        <button
                            onClick={() => fetchMovies()}
                            className="p-2 bg-blue-500 text-white rounded ml-2"
                        >
                            <SearchOutlined color="#fff" /> Search
                        </button>
                    </div>
                    <Table
                        columns={columns}
                        rowKey={(record) => record.id}
                        dataSource={movies}
                        pagination={pagination}
                        loading={loading}
                        onChange={(param: TablePaginationConfig) => {
                            setPagination(param);
                            fetchMovies();
                        }}
                        scroll={{ x: 768 }}
                    />
                </>
            )}
        </div>
    );
};

export default WinnersByYearSearch;

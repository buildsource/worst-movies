import React, { useEffect, useState } from 'react';
import { Input, Select, Table } from 'antd';
import { IMovie } from '../../interfaces/Movie';
import { fetchWinnersByYearSearchRepository } from '../../repositories/WinnersByYearSearchRepository';

const { Option } = Select;

interface TablePaginationConfig {
    current: number;
    pageSize: number;
    total: number;
}

const initialPagination: TablePaginationConfig = {
    current: 1,
    pageSize: 5,
    total: 0,
};

const WinnersList: React.FC = () => {
    const [yearFilter, setYearFilter] = useState('');
    const [winnerFilter, setWinnerFilter] = useState('');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [pagination, setPagination] = useState(initialPagination);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovies = async (
        year: string,
        winner: string,
        pagination: TablePaginationConfig,
    ) => {
        setLoading(true);
        try {
            const { current, pageSize } = pagination;
            const response = await fetchWinnersByYearSearchRepository({
                page: current,
                pageSize,
                year,
                winner:
                    winner === 'Yes'
                        ? true
                        : winner === 'No'
                          ? false
                          : undefined,
            });
            setMovies(response.content);
            setPagination((prev) => ({
                ...prev,
                total: response.totalElements,
            }));
        } catch (error) {
            console.error('Error fetching winners by year:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newYear = e.target.value;
        setYearFilter(newYear);
        if (
            newYear.length === 0 ||
            (newYear.length === 4 && /^\d{4}$/.test(newYear))
        ) {
            setPagination(initialPagination);
            fetchMovies(newYear, winnerFilter, initialPagination);
        }
    };

    const handleWinnerChange = (value: string) => {
        setWinnerFilter(value);
        setPagination(initialPagination);
        fetchMovies(yearFilter, value, initialPagination);
    };

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        setPagination(newPagination);
        fetchMovies(yearFilter, winnerFilter, newPagination);
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
        {
            title: 'Winner',
            dataIndex: 'winner',
            key: 'winner',
            render: (winner: boolean) => (winner ? 'Yes' : 'No'),
            sorter: (a: IMovie, b: IMovie) =>
                Number(a.winner) - Number(b.winner),
        },
    ];

    useEffect(() => {
        fetchMovies(yearFilter, winnerFilter, initialPagination);
    }, []);

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">List movies</h2>
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
                    <div className="flex gap-4 items-center mb-4">
                        <h4 className="text-[100%] font-bold text-white">
                            Filter by Year:
                        </h4>
                        <Input
                            placeholder="Filter by Year"
                            value={yearFilter}
                            onChange={handleYearChange}
                            className="w-48"
                        />
                        <h4 className="text-[100%] font-bold text-white">
                            Filter by Winner:
                        </h4>
                        <Select
                            placeholder="Filter by Winner"
                            value={winnerFilter}
                            onChange={handleWinnerChange}
                            className="w-48"
                        >
                            <Option value="">Yes/No</Option>
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                        </Select>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={movies}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        loading={loading}
                        onChange={handleTableChange}
                        scroll={{ x: 768 }}
                    />
                </>
            )}
        </div>
    );
};

export default WinnersList;

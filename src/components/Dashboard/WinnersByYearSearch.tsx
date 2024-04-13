import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { IMovie } from '../../interfaces/Movie';
import { fetchWinnersByYearSearchRepository } from '../../repositories/WinnersByYearSearchRepository';

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
        total: 0
    });
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        try {
            setLoading(true);

            const { current, pageSize } = pagination;

            const {content, totalElements} = await fetchWinnersByYearSearchRepository({
                page: current,
                pageSize,
                year,
            });

            setMovies(content);
            setPagination(prev => ({
                ...prev,
                total: totalElements,
            }));
        } catch (error) {
            console.error('Error fetching winners by year:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: IMovie, b: IMovie) => a.title.localeCompare(b.title),
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a: IMovie, b: IMovie) => a.year - b.year,
        },
        {
            title: 'Studios',
            dataIndex: 'studios',
            key: 'studios',
            render: (studios: string[]) => studios.join(', '),
            sorter: (a: IMovie, b: IMovie) => {
                const studioA = a.studios.sort().join(', ');
                const studioB = b.studios.sort().join(', ');
                return studioA.localeCompare(studioB);
            },
        },
        {
            title: 'Producers',
            dataIndex: 'producers',
            key: 'producers',
            render: (producers: string[]) => producers.join(', '),
            sorter: (a: IMovie, b: IMovie) => {
                const producerA = a.producers.sort().join(', ');
                const producerB = b.producers.sort().join(', ');
                return producerA.localeCompare(producerB);
            },
        },
        {
            title: 'Winner',
            dataIndex: 'winner',
            key: 'winner',
            render: (winner: string) => winner ? 'Yes' : 'No',
            sorter: (a: IMovie, b: IMovie) => {
                return Number(a.winner) - Number(b.winner);
            },
        }
    ];

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">List movie winners by year</h2>
            <div className="mb-4 flex">
                <input
                    type="text"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    placeholder="Search by year"
                    className="border p-2 rounded flex-1 text-[#fff]"
                />
                <button
                    onClick={() => fetchMovies()}
                    className="p-2 bg-blue-500 text-white rounded ml-2"
                >
                    Search
                </button>
            </div>
            <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={movies}
                pagination={pagination}
                loading={loading}
                onChange={(param: TablePaginationConfig) => {
                    setPagination(param);
                    fetchMovies()
                }}
            />
        </div>
    );
};

export default WinnersByYearSearch;

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

const WinnersList: React.FC = () => {
    const [yearFilter, setYearFilter] = useState<string>('');
    const [winnerFilter, setWinnerFilter] = useState<string>('');
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0
    });
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // if (!yearFilter || yearFilter.length === 4 || winnerFilter)
            fetchMovies();

    }, [yearFilter, winnerFilter]);

    const fetchMovies = async () => {
        try {
            setLoading(true);

            const { current, pageSize } = pagination;
            const winnerParam = winnerFilter === 'Yes' ? true : winnerFilter === 'No' ? false : true;

            const { content, totalElements } = await fetchWinnersByYearSearchRepository({
                page: current,
                pageSize,
                year: yearFilter,
                winner: winnerParam,
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

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => setYearFilter(e.target.value);

    const handleWinnerChange = (value: string) => setWinnerFilter(value);

    const handleTableChange = (newPagination: TablePaginationConfig, filters: IMovie) => {
        if (!filters.year) 
            setYearFilter('');
        
        if (!filters.winner) 
            setWinnerFilter('');
        
        setPagination(newPagination);
        fetchMovies();
    };

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
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search year"
                        value={yearFilter}
                        onChange={handleYearChange}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                </div>
            ),
        },
        {
            title: 'Studios',
            dataIndex: 'studios',
            key: 'studios',
            render: (studios: string[]) => studios.join(', '),
            sorter: (a: IMovie, b: IMovie) => a.studios.sort().join(', ').localeCompare(b.studios.sort().join(', ')),
        },
        {
            title: 'Producers',
            dataIndex: 'producers',
            key: 'producers',
            render: (producers: string[]) => producers.join(', '),
            sorter: (a: IMovie, b: IMovie) => a.producers.sort().join(', ').localeCompare(b.producers.sort().join(', ')),
        },
        {
            title: 'Winner',
            dataIndex: 'winner',
            key: 'winner',
            render: (winner: boolean) => (winner ? 'Yes' : 'No'),
            sorter: (a: IMovie, b: IMovie) => Number(a.winner) - Number(b.winner),
            filterDropdown: () => (
                <div style={{ padding: 8 }}>
                    <Select
                        placeholder="Select winner"
                        value={winnerFilter}
                        onChange={handleWinnerChange}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                    </Select>
                </div>
            ),
        }
    ];

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">List movies</h2>
            <Table
                columns={columns}
                dataSource={movies}
                rowKey={record => record.id}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default WinnersList;

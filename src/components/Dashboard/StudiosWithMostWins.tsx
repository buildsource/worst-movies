import React, { useEffect, useState } from 'react';
import { Checkbox, Table, TablePaginationConfig } from 'antd';
import { IStudio } from '../../interfaces/Studio';
import { fetchStudiosWithMostWinsRepository } from '../../repositories/StudiosWithMostWinsRepository';

const StudiosWithMostWins: React.FC = () => {
    const [studios, setStudios] = useState<IStudio[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [limitResults, setLimitResults] = useState(true);
    const [error, setError] = useState<string>('');


    const fetchStudios = async () => {
        try {
            setLoading(true);

            const { totalElements, studios } = await fetchStudiosWithMostWinsRepository();

            if (limitResults) {
                setStudios(studios.slice(0, 3));
                setPagination(prev => ({
                    ...prev,
                    total: 3,
                }));
            }
            else {
                setStudios(studios);
                setPagination(prev => ({
                    ...prev,
                    total: totalElements,
                }));
            }


        } catch (error) {
            console.error('Error fetching studios with most wins:', error);
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudios();
    }, [, limitResults]);


    const columns = [
        {
            title: 'Studio Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: IStudio, b: IStudio) => a.name.localeCompare(b.name),
        },
        {
            title: 'Win Count',
            dataIndex: 'winCount',
            key: 'winCount',
            sorter: (a: IStudio, b: IStudio) => a.winCount - b.winCount,
        },
    ];

    const handleCheckboxChange = () => {
        setLimitResults(!limitResults);
    };

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">Top 3 Studios with Winners</h2>
            <Checkbox checked={limitResults} onChange={handleCheckboxChange} className='mb-4'>
                Limit to 3 records
            </Checkbox>
            {
                error
                    ? <p className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </p>
                    : <Table
                        columns={columns}
                        dataSource={studios}
                        rowKey="name"
                        pagination={pagination}
                        loading={loading}
                        onChange={(param: TablePaginationConfig) => {
                            setPagination(param);
                            fetchStudios()
                        }}
                        scroll={{ x: 768 }}
                    />
            }
        </div>
    );
}

export default StudiosWithMostWins;

import React, { useEffect, useState } from 'react';
import { Table, TablePaginationConfig } from 'antd';
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


    const fetchStudios = async () => {
        setLoading(true);

        try {
            const { totalElements, studios } = await fetchStudiosWithMostWinsRepository();

            setStudios(studios);
            setPagination(prev => ({
                ...prev,
                total: totalElements,
            }));
        } catch (error) {
            console.error('Error fetching studios with most wins:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudios();
    }, []);


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

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">Top 3 Studios with Winners</h2>
            <Table
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
        </div>
    );
}

export default StudiosWithMostWins;

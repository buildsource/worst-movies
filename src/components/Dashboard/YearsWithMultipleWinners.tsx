import React, { useEffect, useState } from 'react';
import { Table, TablePaginationConfig } from 'antd';
import { IYearData } from '../../interfaces/YearData';
import { fetchYearsWithMultipleWinners } from '../../repositories/YearsWithMultipleWinnersRepository';

const YearsWithMultipleWinners: React.FC = () => {
    const [years, setYears] = useState<IYearData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    const fetchYears = async () => {
        try {
            setLoading(true);

            const { years, totalElements } = await fetchYearsWithMultipleWinners();

            setYears(years);
            setPagination(prev => ({
                ...prev,
                total: totalElements,
            }));
        } catch (error) {
            console.error('Error fetching years with multiple winners:', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchYears();
    }, []);


    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a: IYearData, b: IYearData) => a.year - b.year,
        },
        {
            title: 'Winner Count',
            dataIndex: 'winnerCount',
            key: 'winnerCount',
            sorter: (a: IYearData, b: IYearData) => a.winnerCount - b.winnerCount,
        },
    ];

    return (
        <div className="p-4 bg-[#3b3b3b] shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-[#fff]">List years with multiple Winners</h2>
            <Table
                columns={columns}
                rowKey={record => record.year}
                dataSource={years}
                pagination={pagination}
                loading={loading}
                onChange={(param: TablePaginationConfig) => {
                    setPagination(param);
                    fetchYears()
                }}
                scroll={{ x: 768 }}
            />
        </div>
    );
};

export default YearsWithMultipleWinners;

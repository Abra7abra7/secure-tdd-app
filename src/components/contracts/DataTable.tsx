import React, { useState, useMemo } from 'react';
import { useContracts } from '../../api/useContracts';
import './DataTable.css';

export const DataTable: React.FC = () => {
    const { data: contractsData, isLoading, isError, error } = useContracts();
    const data = contractsData || [];

    const [filterText, setFilterText] = useState('');

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [data, filterText]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('sk-SK', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="pt-datatable-container">
            <div className="pt-datatable-toolbar">
                <h2 className="pt-datatable-title">Register Zmlúv</h2>
                <div className="pt-datatable-search">
                    <input
                        type="text"
                        placeholder="Filtrovať zmluvy (napr. Cesty, IT, ...)"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="pt-input"
                    />
                </div>
            </div>

            {isLoading && (
                <div className="pt-table-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <span style={{ color: '#00ff00', fontFamily: 'monospace' }}>LOADING_SECURE_DATA...</span>
                </div>
            )}

            {isError && (
                <div className="pt-table-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', padding: '1rem' }}>
                    <span style={{ color: '#ff0000', fontFamily: 'monospace' }}>
                        [ERROR] Failed to fetch data: {error?.message}
                    </span>
                </div>
            )}

            {!isLoading && !isError && (
                <div className="pt-table-wrapper">
                    <table className="pt-table">
                        <thead>
                            <tr>
                                <th>ID Zmluvy</th>
                                <th>Názov</th>
                                <th>Objednávateľ</th>
                                <th>Dodávateľ</th>
                                <th className="text-right">Suma (€)</th>
                                <th>Dátum Podpisu</th>
                                <th>Rezort</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map(contract => (
                                    <tr key={contract.id}>
                                        <td className="font-mono">{contract.id}</td>
                                        <td className="font-medium text-accent">{contract.title}</td>
                                        <td>{contract.category}</td>
                                        <td>{contract.supplier}</td>
                                        <td className="text-right font-mono">{formatCurrency(contract.sum)}</td>
                                        <td>{new Date(contract.date).toLocaleDateString('sk-SK')}</td>
                                        <td>
                                            <span className="pt-tag">{contract.category}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="pt-table-empty">
                                        Nenašli sa žiadne zmluvy vyhovujúce filtru "{filterText}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="pt-datatable-footer">
                Zobrazených {filteredData.length} z {data.length} záznamov
            </div>
        </div>
    );
};

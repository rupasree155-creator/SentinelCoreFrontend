import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [assets, setAssets] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8080/assets')
            .then((response) => {
                setAssets(response.data)
            })
            .catch((error) => {
                console.error('Error fetching assets:', error)
            })
    }, [])

    const totalAssets = assets.length

    const activeAssets = assets.filter(
        (asset) => asset.status === 'Active'
    ).length

    const offlineAssets = assets.filter(
        (asset) => asset.status === 'Offline'
    ).length

    return (
        <div className="app">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">

                    <div>
                        <h1>SentinelCore Security Platform</h1>

                    </div>
                </div>




            </aside>

            {/* Main Content */}
            <main className="main-content">

                {/* Top Header */}
                <header className="topbar">
                    <div>
                        <h2>Dashboard Assets Monitoring Alerts and Reports</h2>
                        <p>Monitor and manage your infrastructure assets</p>
                    </div>


                </header>

                {/* Summary Cards */}
                <section className="asset-section">

                    <div className="section-header">
                        <div>
                            <h2>Asset Health</h2>
                            <p>Current infrastructure status</p>
                        </div>
                    </div>
                </section>

                <section className="summary-cards">


                    <div className="stat-card">
                        <div className="stat-icon">◈</div>
                        <div>
                            <span>Total Assets</span>
                            <strong>{totalAssets}</strong>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">✓</div>
                        <div>
                            <span>Active Assets</span>
                            <strong>{activeAssets}</strong>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon">!</div>
                        <div>
                            <span>Offline Assets</span>
                            <strong>{offlineAssets}</strong>
                        </div>
                    </div>

                </section>

                {/* Asset Table */}
                <section className="asset-section">

                    <div className="section-header">


                        <button className="view-button">
                            View All Assets →
                        </button>
                    </div>

                    <div className="table-container">
                        <table>

                            <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Type</th>
                                <th>IP Address</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>CPU</th>
                                <th>Memory</th>
                                <th>Disk</th>
                                <th>Network</th>
                            </tr>
                            </thead>

                            <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id}>

                                    <td>
                                        <strong>{asset.assetName}</strong>
                                    </td>

                                    <td>{asset.assetType}</td>

                                    <td className="ip-address">
                                        {asset.ipAddress}
                                    </td>

                                    <td>{asset.location}</td>

                                    <td>
                                        <span
                                            className={
                                                asset.status === 'Active'
                                                    ? 'status active-status'
                                                    : 'status offline-status'
                                            }
                                        >
                                            <span className="status-dot"></span>
                                            {asset.status}
                                        </span>
                                    </td>

                                    <td>{asset.cpuUsage}%</td>
                                    <td>{asset.memoryUsage}%</td>
                                    <td>{asset.diskUsage}%</td>
                                    <td>{asset.networkUsage}%</td>

                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>

                </section>

            </main>

        </div>
    )


}
export default App
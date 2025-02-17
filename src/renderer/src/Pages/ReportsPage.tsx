import React, { useEffect, useState } from 'react'
import { Container, Typography, Button, Paper } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'
import jsPDF from 'jspdf'
import moment from 'moment'
import autoTable from 'jspdf-autotable'

const ReportsPage: React.FC = () => {
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await (window as any).api.getSystemStats()
        setHistory((prev) => [...prev.slice(-49), { timestamp: new Date().toISOString(), ...data }])
      } catch (error) {
        console.error('Error fetching system stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatTimestamp = (isoString: string) => {
    return isoString ? moment(isoString).format('MM-DD-YYYY HH:mm') : 'N/A'
  }

  // Define columns for the MUI DataGrid
  const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'cpuLoad', headerName: 'CPU Load (%)', width: 130 },
    { field: 'memoryUsed', headerName: 'Memory Used (MB)', width: 160 },
    { field: 'diskUsage', headerName: 'Disk Used (%)', width: 130 },
    { field: 'networkSpeed', headerName: 'Network Speed (MB/s)', width: 180 }
  ]

  // Format history data for the table
  const rows = history.map((entry, index) => ({
    id: index,
    timestamp: formatTimestamp(entry.timestamp),
    cpuLoad: entry.cpu?.currentLoad ? entry.cpu.currentLoad.toFixed(2) : 'N/A',
    memoryUsed: entry.memory?.used || 'N/A',
    diskUsage: entry.disk?.[0]?.used
      ? ((entry.disk[0].used / entry.disk[0].size) * 100).toFixed(2)
      : 'N/A',
    networkSpeed: entry.network?.[0]?.rx_bytes
      ? (entry.network[0].rx_bytes / 1024 / 1024).toFixed(2)
      : 'N/A'
  }))

  // Export data as CSV
  const exportCSV = () => {
    const csv = Papa.unparse(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'system_stats_report.csv')
  }

  const exportPDF = () => {
    const doc = new jsPDF()
    doc.text('System Performance Report', 14, 10)

    // Convert rows to an array for the PDF
    const tableData = rows.map((row) => [
      formatTimestamp(row.timestamp),
      row.cpuLoad || 'N/A',
      row.memoryUsed || 'N/A',
      row.diskUsage || 'N/A',
      row.networkSpeed || 'N/A'
    ])

    autoTable(doc, {
      head: [
        ['Timestamp', 'CPU Load (%)', 'Memory Used (MB)', 'Disk Used (%)', 'Network Speed (MB/s)']
      ],
      body: tableData,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 2 }
    })

    doc.save('system_stats_report.pdf')
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom>
        System Performance Reports
      </Typography>

      {/* Explanation Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          About This Page
        </Typography>
        <Typography variant="body1">
          This page displays **real-time system performance data** in a structured table. The table
          updates automatically every **5 seconds** with the latest system stats, including:
        </Typography>
        <Typography component="ul" sx={{ mt: 1, pl: 2 }}>
          <Typography component="li">**CPU Load (%)** – Current processor usage.</Typography>
          <Typography component="li">**Memory Used (MB)** – Total RAM consumption.</Typography>
          <Typography component="li">
            **Disk Usage (%)** – Percentage of disk space used.
          </Typography>
          <Typography component="li">**Network Speed (MB/s)** – Download speed.</Typography>
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          You can **export** this data as a **CSV file** or **download a PDF report** using the
          buttons below.
        </Typography>
      </Paper>

      {/* Data Table */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Historical System Stats
        </Typography>

        <div style={{ height: 500, width: '100%', marginBottom: '16px' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976d2',
                color: 'white',
                fontWeight: 'bold'
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: 'black'
              }
            }}
          />
        </div>

        {/* Export Buttons */}
        <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={exportCSV}>
          Download as CSV
        </Button>
        <Button variant="contained" color="secondary" onClick={exportPDF}>
          Download as PDF
        </Button>
      </Paper>
    </Container>
  )
}

export default ReportsPage

import React from "react";
import MaterialTable from "@material-table/core";
import type { Column } from "@material-table/core";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface RowData {
    eventName: string;
    eventDate: string; // ISO string format (e.g., "2025-05-19")
  }


const columns: Column<RowData>[] = [
    {
        title: "Event Name", 
        field: "eventName"
    },
    {
        title: "Event Date",
        field: "eventDate",
        customFilterAndSearch: (filterDate: string | null, rowData: RowData) => {
            if (!filterDate) return true;
            const rowDate = dayjs(rowData.eventDate).format("YYYY-MM-DD");
            return rowDate === filterDate
        },
        filterComponent: (props) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={(props.columnDef as any).tableData?.filterValue ? dayjs((props.columnDef as any).tableData?.filterValue) : null}
                    onChange={(date: Dayjs | null) =>
                        props.onFilterChanged((props.columnDef as any).tableData.id, date ? date.format("YYYY-MM-DD") : "")
                    }
                    slotProps={{
                        textField: { fullWidth: true }
                    }}
                />
            </LocalizationProvider>
        )
    },
]

const data: RowData[] = [
    { eventName: "React Summit", eventDate: "2025-05-19" },
    { eventName: "NextConf", eventDate: "" },
    { eventName: "VueFest", eventDate: "2025-05-19" },
  ];

export const Table = () => {
    return(
        <MaterialTable 
            columns={columns} 
            data={data} 
            title="My Title" 
            options = {{filtering: true}}
        />
    )
}

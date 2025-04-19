import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Legend } from "@headlessui/react";
import { chartData } from "../assets/data";
const Chart = ({data}) => {
    return (
        <ResponsiveContainer width={"100%"} height={300}>
            <BarChart width={150} height={40} data={data}>
                <XAxis dataKey={"name"} />
                <YAxis dataKey={"total"} />
                <Tooltip/>
                <Legend/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Bar dataKey="total" fill='#8884d8'/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;

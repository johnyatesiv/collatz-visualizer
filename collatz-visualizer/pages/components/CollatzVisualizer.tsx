import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export function CollatzVisualizer(props: { generatedValues: [number, number][] }) {
    const mappedValues = props.generatedValues.map((pair) => {
        return {
            index: pair[0],
            value: pair[1]
        }
    });

    return (
        <LineChart width={600} height={300} data={mappedValues}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="index" />
            <YAxis />
        </LineChart>
    );
}

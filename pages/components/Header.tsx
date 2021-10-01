import React from "react";
import Head from 'next/head'

export default function Header() {
    return (
        <Head>
            <title>Collatz Conjecture Visualizer</title>
            <meta name="description" content="Visualizer of the Collatz conjecture using d3.js" />
            <link rel="icon" href="../../public/favicon.ico" />
        </Head>
    )
}

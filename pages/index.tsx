import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import CollatzVisualizer from "./components/CollatzVisualizer";
import Image from "next/image";
import collatzFunctionImage from "../public/collatz_func.svg";
import Footer from "./components/Footer";
import { CollatzAlgorithm } from "../api/algo";

export default function Home() {
    const [currentValue, setCurrentValue] = useState<number>(5);
    const [generatedValues, setGeneratedValues] = useState<[number, number][]>([[1, 1]]);
    const [maxValue, setMaxValue] = useState<number>(0);

    useEffect(() => {
        try {
            const algo = new CollatzAlgorithm(currentValue);
            const output = algo.run();
            const maxValue = algo.max;

            if (output) {
                setGeneratedValues(output);
                setMaxValue(maxValue);
            }
        } catch (e) {
            // bad input to the algorithm
        }
    }, [currentValue]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Collatz Conjecture Visualizer</title>
                <meta name="description" content="Visualizer of the Collatz conjecture using d3.js" />
                <link rel="icon" href="../public/favicon.ico" />
            </Head>

            <div className={styles.main}>
                <div className={styles.infoContent}>
                    The Collatz conjecture is an unsolved problem in mathematics concerning the convergence of a certain sequence. <br/>
                    Given this function for a positive integer, <br/><br/>
                    <Image alt={'Collatz Algorithm'} src={collatzFunctionImage} />
                    <br/><br/>

                    The Collatz conjecture states that the sequence will eventually converge to 1. <br/>
                    Try plugging in some numbers and observing the outcomes.

                    <div className={styles.inputControl}>
                        <div>
                            <div className={styles.inputForm}>
                                <form>
                                    <label className={styles.inputLabel}>Start: </label>
                                    <input
                                        className={styles.algoInput}
                                        min={1}
                                        type={'number'}
                                        value={currentValue}
                                        onChange={e => setCurrentValue(Number(e.target.value))}
                                    />
                                </form>
                            </div>
                            <QuickStatsContent
                                generatedValues={generatedValues}
                                maxValue={maxValue}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CollatzVisualizer generatedValues={generatedValues} />

            <Footer></Footer>
        </div>
    )
}

function QuickStatsContent(
        props: {
            generatedValues: [number, number][],
            maxValue: number
        }
    ) {
        return (
            <div className={styles.statsTable}>
                <div className={styles.table}>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>Total steps to converge</div>
                        <td className={styles.tableCell}>{props.generatedValues.length}</td>
                    </div>
                    <div className={styles.tableRow}>
                        <div className={styles.tableCell}>Maximum value in sequence</div>
                        <div className={styles.tableCell}>{props.maxValue ? props.maxValue: '?'}</div>
                    </div>
                </div>
            </div>
        )
}

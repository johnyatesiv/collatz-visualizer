import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
import { CollatzVisualizer } from "./components/CollatzVisualizer";
import { CollatzAlgorithm } from "./api/algo";

function flattenArray(input: [number, number][]): string {
    const flat = input.map(pair => {
        return pair.join(',');
    }).join('],[');

    return `[${flat}]`;
}

export default function Home() {
    const [currentValue, setCurrentValue] = useState<number>(5);
    const [generatedValues, setGeneratedValues] = useState<[number, number][]>([[1, 1]]);
    const [maxValue, setMaxValue] = useState<number>(0);
    const [statsExpanded, setStatsExpanded] = useState<boolean>(false);

    function toggleExpandStats() {
        setStatsExpanded(!statsExpanded);
    }

    useEffect(() => {
        try {
            const algo = new CollatzAlgorithm(currentValue)
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
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <CollatzVisualizer generatedValues={generatedValues} />
                <div className={styles.inputForm}>
                    <form>
                        <label className={styles.inputLabel}>Initial value</label>
                        <input
                            className={styles.algoInput}
                            min={1}
                            type={'number'}
                            value={currentValue}
                            onChange={e => setCurrentValue(Number(e.target.value))}
                        />
                    </form>
                </div>
                <div className={styles.flattenedArray}>
                    The Collatz conjecture is an unsolved problem in mathematics concerning the convergence of a certain sequence. <br/>
                    Given this function for a positive integer, <br/><br/>
                    <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/ec22031bdc2a1ab2e4effe47ae75a836e7dea459" />
                    <br/><br/>

                    The Collatz conjecture states that the sequence will eventually converge to 1. <br/>
                    Try plugging in some numbers and observing the outcomes.

                    <div>
                        <h3 onClick={((e) => toggleExpandStats())}>+ Quick Stats</h3>
                        <QuickStatsContent
                            expanded={statsExpanded}
                            generatedValues={generatedValues}
                            maxValue={maxValue}
                        />
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a href={'https://github.com/johnyatesiv/collatz-visualizer'}>Scope the source on Github</a>
            </footer>
        </div>
    )
}

function QuickStatsContent(
    props: {
        expanded: boolean,
        generatedValues: [number, number][],
        maxValue: number
        }
    ) {
        return (
            props.expanded ? <div>
                Total steps to converge: {props.generatedValues.length} <br/>
                Maximum value in sequence: {props.maxValue ? props.maxValue: '?'} <br/>
                Flattened array output of the algorithm: <br/> { flattenArray(props.generatedValues) }
            </div> : <span/>
        )
}
